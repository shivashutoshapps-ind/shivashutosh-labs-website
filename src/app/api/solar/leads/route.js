import { insertSolarLead, hasRecentSubmission } from '@/lib/solar/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_CUSTOMER_TYPES = ['residential', 'commercial'];
const VALID_SYSTEMS = ['1kw', '2kw', '3kw', '5kw', 'consultation'];
const VALID_BILL_RANGES = [
  'below_1000',
  '1000_2000',
  '2000_3000',
  '3000_5000',
  'above_5000'
];

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot spam check
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
      customerType,
      monthlyBill,
      hasRooftop,
      preferredSystem,
      privacyConsent,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
    } = body;

    // 1. Full Name Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
      return Response.json(
        { error: 'कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।' },
        { status: 400 }
      );
    }

    // 2. Mobile Validation (Indian 10-digit starting with 6, 7, 8, or 9)
    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(cleanMobile)) {
      return Response.json(
        { error: 'कृपया एक मान्य 10 अंकों का मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से)।' },
        { status: 400 }
      );
    }

    // 3. District Validation
    if (!district || typeof district !== 'string' || district.trim().length === 0) {
      return Response.json(
        { error: 'कृपया अपना जिला चुनें या दर्ज करें।' },
        { status: 400 }
      );
    }

    // 4. City / Village Validation
    if (!cityVillage || typeof cityVillage !== 'string' || cityVillage.trim().length === 0) {
      return Response.json(
        { error: 'कृपया अपना शहर, कस्बा या गाँव दर्ज करें।' },
        { status: 400 }
      );
    }

    // 5. Customer Type Validation
    if (!customerType || !VALID_CUSTOMER_TYPES.includes(customerType)) {
      return Response.json(
        { error: 'कृपया ग्राहक का प्रकार चुनें (आवासीय या व्यावसायिक)।' },
        { status: 400 }
      );
    }

    // 6. Monthly Bill Validation
    if (!monthlyBill || !VALID_BILL_RANGES.includes(monthlyBill)) {
      return Response.json(
        { error: 'कृपया अपना अनुमानित मासिक बिजली बिल चुनें।' },
        { status: 400 }
      );
    }

    // 7. Rooftop Validation
    if (!hasRooftop || (hasRooftop !== 'yes' && hasRooftop !== 'no')) {
      return Response.json(
        { error: 'कृपया छत की उपलब्धता बताएं।' },
        { status: 400 }
      );
    }

    // 8. Preferred System Validation
    if (!preferredSystem || !VALID_SYSTEMS.includes(preferredSystem)) {
      return Response.json(
        { error: 'कृपया पसंदीदा सोलर सिस्टम क्षमता चुनें।' },
        { status: 400 }
      );
    }

    // 9. Privacy Consent Validation
    if (!privacyConsent) {
      return Response.json(
        { error: 'आगे बढ़ने के लिए कृपया सहमति बॉक्स पर सही का निशान लगाएं।' },
        { status: 400 }
      );
    }

    // Duplicate check within 5 minutes
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

    // Extract IP and User Agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert lead
    const result = await insertSolarLead({
      fullName,
      mobile: cleanMobile,
      district,
      cityVillage,
      customerType,
      monthlyBill,
      hasRooftop,
      preferredSystem,
      privacyConsent: !!privacyConsent,
      ipAddress,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
      userAgent,
    });

    return Response.json(
      {
        success: true,
        leadId: result.id,
        message: 'धन्यवाद! आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है। हमारी तकनीकी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।'
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
