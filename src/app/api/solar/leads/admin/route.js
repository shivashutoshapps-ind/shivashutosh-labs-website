import { getSolarLeads, getSolarLeadStats, updateSolarLeadStatus, getSolarLeadById } from '@/lib/solar/db';
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

function isAuthorized(request) {
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
  if (!isAuthorized(request)) {
    return Response.json(
      { error: 'Unauthorized: Valid admin credentials required.' },
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

    const stats = getSolarLeadStats();
    const leads = getSolarLeads({ status, brand, district, limit, offset });

    return Response.json({
      success: true,
      stats,
      leads,
    });
  } catch (err) {
    console.error('Error fetching admin solar leads:', err);
    return Response.json({ error: 'Failed to fetch solar leads' }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: 'Unauthorized: Valid admin credentials required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return Response.json({ error: 'Lead ID and status are required' }, { status: 400 });
    }

    const validStatuses = ['NEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED'];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    updateSolarLeadStatus(id, status, notes);

    return Response.json({
      success: true,
      message: 'Lead updated successfully',
    });
  } catch (err) {
    console.error('Error updating solar lead:', err);
    return Response.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
