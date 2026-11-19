import { insertSolarLead, hasRecentSubmission, getSolarLeads, getSolarLeadStats } from '@/lib/solar/db';
import crypto from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safeCompare(provided, expected) {
  if (typeof provided !== 'string' || typeof expected !== 'string') return false;
  const bufProvided = Buffer.from(provided);
  const bufExpected = Buffer.from(expected);
  if (bufProvided.length !== bufExpected.length) return false;
  return crypto.timingSafeEqual(bufProvided, bufExpected);
}

function verifyAdminAuth(request) {
  const secret = process.env.SOLAR_ADMIN_KEY;
  // Strict requirement: Secret must exist and have at least 32 characters of entropy
  if (!secret || typeof secret !== 'string' || secret.length < 32) {
    return false;
  }

  const adminKey = request.headers.get('x-admin-key');
  if (adminKey && safeCompare(adminKey, secret)) return true;

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    if (safeCompare(token, secret)) return true;
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/solar_admin_token=([^;]+)/);
  if (match && safeCompare(decodeURIComponent(match[1]), secret)) {
    return true;
  }

  return false;
}

export async function GET(request) {
  if (!verifyAdminAuth(request)) {
    return Response.json(
      { error: 'Unauthorized: Admin authentication required to access solar leads.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const brand = searchParams.get('brand') || undefined;
    const district = searchParams.get('district') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset'), 10) : 0;

    const leads = getSolarLeads({ status, brand, district, limit, offset });
    const stats = getSolarLeadStats();

    return Response.json({
      success: true,
      stats,
      leads,
    });
  } catch (err) {
    console.error('Error retrieving solar leads:', err);
    return Response.json(
      { error: 'सर्वर में त्रुटि उत्पन्न हुई।' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Honeypot spam check
    if (body.website_check || body.company_fax) {
      return Response.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    const {
      fullName,
      mobile,
      district,
      cityVillage,
      brand,
      capacity,
      customerType,
      monthlyBill,
      hasRooftop,
      preferredSystem,
      privacyConsent,
      leadSource,
      notes,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
    } = body;

    // 2. Full Name Validation (Required)
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
      return Response.json(
        { error: 'कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।' },
        { status: 400 }
      );
    }

    // 3. Mobile Validation (Required, Indian 10-digit starting with 6, 7, 8, or 9)
    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(cleanMobile)) {
      return Response.json(
        { error: 'कृपया एक मान्य 10 अंकों का मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से)।' },
        { status: 400 }
      );
    }

    // 4. District Handling (Defaults to Uttar Pradesh statewide if not provided in quick enquiry)
    const effectiveDistrict = (district && typeof district === 'string' && district.trim().length > 0)
      ? district.trim()
      : 'उत्तर प्रदेश (संपूर्ण राज्य)';

    // 5. Privacy Consent Handling
    const effectiveConsent = privacyConsent !== undefined ? !!privacyConsent : true;

    // 6. Anti-duplicate check (within 5 minutes)
    if (hasRecentSubmission(cleanMobile, 5)) {
      return Response.json(
        {
          success: true,
          duplicate: true,
          message: 'आपकी इन्क्वायरी पहले ही दर्ज हो चुकी है! हमारी टीम जल्द ही आपसे संपर्क करेगी।'
        },
        { status: 200 }
      );
    }

    // 7. Extract Request Metadata
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 8. Sanitize Brand
    let cleanBrand = 'general';
    if (brand && typeof brand === 'string') {
      const b = brand.trim().toLowerCase();
      if (b.includes('tata')) cleanBrand = 'tata';
      else if (b.includes('adani')) cleanBrand = 'adani';
      else if (b.includes('utl')) cleanBrand = 'utl';
      else cleanBrand = b;
    }

    // 9. Process Lead Source and Notes
    const effectiveSource = leadSource || utmSource || 'website';
    let effectiveNotes = notes || '';
    if (leadSource === 'top_callback_request' && !effectiveNotes.includes('Callback Request')) {
      effectiveNotes = `[Callback Request] ${effectiveNotes}`.trim();
    } else if (leadSource === 'top_quick_enquiry' && !effectiveNotes.includes('Quick Enquiry')) {
      effectiveNotes = `[Quick Enquiry - ${cleanBrand.toUpperCase()}] ${effectiveNotes}`.trim();
    } else if (leadSource === 'middle_brand_quick_enquiry' && !effectiveNotes.includes('Middle Quick Enquiry')) {
      effectiveNotes = `[Middle Quick Enquiry - ${cleanBrand.toUpperCase()}] ${effectiveNotes}`.trim();
    }

    const effectiveCapacity = capacity || preferredSystem || (
      leadSource === 'top_callback_request' ? 'कॉलबैक अनुरोध' :
      leadSource === 'middle_brand_quick_enquiry' ? `${cleanBrand.toUpperCase()} सोलर त्वरित इन्क्वायरी (Middle)` :
      'त्वरित इन्क्वायरी'
    );

    // 10. Insert Lead into SQLite
    const result = insertSolarLead({
      fullName: fullName.trim(),
      mobile: cleanMobile,
      district: effectiveDistrict,
      cityVillage: cityVillage || '',
      brand: cleanBrand,
      capacity: effectiveCapacity,
      customerType: customerType || 'residential',
      monthlyBill: monthlyBill || '',
      hasRooftop: hasRooftop || 'yes',
      preferredSystem: effectiveCapacity,
      privacyConsent: effectiveConsent,
      ipAddress,
      utmSource: effectiveSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
      userAgent,
      notes: effectiveNotes,
    });

    return Response.json(
      {
        success: true,
        leadId: result.id,
        brand: cleanBrand,
        message: 'धन्यवाद! आपकी Solar Enquiry सफलतापूर्वक दर्ज कर ली गई है। हमारी तकनीकी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।'
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error inserting solar lead:', err);
    return Response.json(
      { error: 'सर्वर में समस्या उत्पन्न हुई। कृपया पुनः प्रयास करें या सीधे कॉल करें।' },
      { status: 500 }
    );
  }
}
