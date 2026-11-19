import { getSolarLeads, getSolarLeadStats, updateSolarLeadStatus, getSolarLeadById } from '@/lib/solar/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ADMIN_SECRET = process.env.SOLAR_ADMIN_KEY || 'shivashutosh@solar2026';

function isAuthorized(request) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey && adminKey === ADMIN_SECRET) return true;

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    if (token === ADMIN_SECRET) return true;
  }

  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes(`solar_admin_token=${ADMIN_SECRET}`)) {
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
