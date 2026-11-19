import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

let solarDbInstance = null;

/**
 * Get or initialize the SQLite database for solar leads.
 * Automatically runs safe, backward-compatible schema migrations.
 */
export function getSolarDb() {
  if (solarDbInstance) {
    return solarDbInstance;
  }

  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = process.env.SOLAR_DB_PATH || path.join(dbDir, 'solar_leads.db');
  solarDbInstance = new DatabaseSync(dbPath);

  // Performance and integrity pragmas
  solarDbInstance.exec('PRAGMA journal_mode = WAL;');
  solarDbInstance.exec('PRAGMA foreign_keys = ON;');
  solarDbInstance.exec('PRAGMA busy_timeout = 5000;');

  // Initialize table if it does not exist
  solarDbInstance.exec(`
    CREATE TABLE IF NOT EXISTS solar_leads (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      district TEXT NOT NULL,
      city_village TEXT NOT NULL,
      customer_type TEXT NOT NULL,
      monthly_bill TEXT NOT NULL,
      has_rooftop TEXT NOT NULL,
      preferred_system TEXT NOT NULL,
      privacy_consent INTEGER NOT NULL DEFAULT 1,
      ip_address TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_term TEXT,
      utm_content TEXT,
      referrer TEXT,
      user_agent TEXT,
      status TEXT NOT NULL DEFAULT 'NEW',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_solar_leads_mobile ON solar_leads(mobile);
    CREATE INDEX IF NOT EXISTS idx_solar_leads_created ON solar_leads(created_at);
  `);

  // Backward-compatible schema migrations (preserve existing data)
  try {
    const tableInfo = solarDbInstance.prepare("PRAGMA table_info(solar_leads)").all();
    const existingCols = new Set(tableInfo.map((col) => col.name));

    if (!existingCols.has('brand')) {
      solarDbInstance.exec("ALTER TABLE solar_leads ADD COLUMN brand TEXT DEFAULT 'general';");
      solarDbInstance.exec("CREATE INDEX IF NOT EXISTS idx_solar_leads_brand ON solar_leads(brand);");
    }

    if (!existingCols.has('capacity')) {
      solarDbInstance.exec("ALTER TABLE solar_leads ADD COLUMN capacity TEXT;");
    }

    if (!existingCols.has('notes')) {
      solarDbInstance.exec("ALTER TABLE solar_leads ADD COLUMN notes TEXT;");
    }

    solarDbInstance.exec("CREATE INDEX IF NOT EXISTS idx_solar_leads_status ON solar_leads(status);");
  } catch (err) {
    console.error('Error verifying/migrating solar_leads schema:', err);
  }

  return solarDbInstance;
}

/**
 * Insert a new lead into the database.
 * @param {Object} lead
 * @returns {Object} inserted lead summary
 */
export function insertSolarLead(lead) {
  const db = getSolarDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const brand = (lead.brand || 'general').trim().toLowerCase();
  const capacity = lead.capacity || lead.preferredSystem || 'consultation';
  const cityVillage = (lead.cityVillage || '').trim();
  const customerType = lead.customerType || 'residential';
  const monthlyBill = lead.monthlyBill || '';
  const hasRooftop = lead.hasRooftop || 'yes';
  const preferredSystem = lead.preferredSystem || capacity;
  const notes = lead.notes || null;

  const stmt = db.prepare(`
    INSERT INTO solar_leads (
      id, full_name, mobile, district, city_village,
      customer_type, monthly_bill, has_rooftop, preferred_system,
      brand, capacity, privacy_consent, ip_address, utm_source, utm_medium,
      utm_campaign, utm_term, utm_content, referrer, user_agent,
      status, notes, created_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  stmt.run(
    id,
    lead.fullName.trim(),
    lead.mobile.trim(),
    lead.district.trim(),
    cityVillage,
    customerType,
    monthlyBill,
    hasRooftop,
    preferredSystem,
    brand,
    capacity,
    lead.privacyConsent ? 1 : 0,
    lead.ipAddress || null,
    lead.utmSource || null,
    lead.utmMedium || null,
    lead.utmCampaign || null,
    lead.utmTerm || null,
    lead.utmContent || null,
    lead.referrer || null,
    lead.userAgent || null,
    'NEW',
    notes,
    now
  );

  return { id, createdAt: now, brand, fullName: lead.fullName.trim(), mobile: lead.mobile.trim() };
}

/**
 * Check if the same mobile submitted recently (anti-duplicate/spam).
 * @param {string} mobile 
 * @param {number} windowMinutes 
 * @returns {boolean}
 */
export function hasRecentSubmission(mobile, windowMinutes = 5) {
  const db = getSolarDb();
  const cutoff = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  
  const stmt = db.prepare(`
    SELECT id FROM solar_leads 
    WHERE mobile = ? AND created_at >= ? 
    LIMIT 1
  `);
  
  const rows = stmt.all(mobile.trim(), cutoff);
  return rows.length > 0;
}

/**
 * Retrieve solar leads with optional filtering and pagination.
 * @param {Object} options
 * @returns {Array} list of lead records
 */
export function getSolarLeads({ status, brand, district, limit = 100, offset = 0 } = {}) {
  const db = getSolarDb();
  const conditions = [];
  const params = [];

  if (status && status !== 'ALL') {
    conditions.push('status = ?');
    params.push(status);
  }

  if (brand && brand !== 'ALL') {
    conditions.push('LOWER(brand) = LOWER(?)');
    params.push(brand);
  }

  if (district && district !== 'ALL') {
    conditions.push('LOWER(district) = LOWER(?)');
    params.push(district);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `
    SELECT 
      id, full_name, mobile, district, city_village,
      customer_type, monthly_bill, has_rooftop, preferred_system,
      brand, capacity, privacy_consent, ip_address,
      utm_source, utm_medium, utm_campaign, referrer,
      status, notes, created_at
    FROM solar_leads
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  params.push(Number(limit) || 100);
  params.push(Number(offset) || 0);

  const stmt = db.prepare(query);
  return stmt.all(...params);
}

/**
 * Retrieve lead counts and statistics for admin dashboard.
 * @returns {Object} { total, newCount, contactedCount, brandBreakdown }
 */
export function getSolarLeadStats() {
  const db = getSolarDb();

  const totalRow = db.prepare('SELECT count(id) as total FROM solar_leads').get();
  const newRow = db.prepare("SELECT count(id) as cnt FROM solar_leads WHERE status = 'NEW'").get();
  const contactedRow = db.prepare("SELECT count(id) as cnt FROM solar_leads WHERE status = 'CONTACTED'").get();
  const convertedRow = db.prepare("SELECT count(id) as cnt FROM solar_leads WHERE status = 'CONVERTED'").get();
  
  const brandRows = db.prepare(`
    SELECT COALESCE(NULLIF(LOWER(brand), ''), 'general') as brand, count(id) as count 
    FROM solar_leads 
    GROUP BY COALESCE(NULLIF(LOWER(brand), ''), 'general')
  `).all();

  const brandBreakdown = {
    tata: 0,
    adani: 0,
    utl: 0,
    general: 0,
  };

  for (const row of brandRows) {
    const b = (row.brand || '').toLowerCase();
    if (b.includes('tata')) brandBreakdown.tata += row.count;
    else if (b.includes('adani')) brandBreakdown.adani += row.count;
    else if (b.includes('utl')) brandBreakdown.utl += row.count;
    else brandBreakdown.general += row.count;
  }

  return {
    total: totalRow?.total || 0,
    newCount: newRow?.cnt || 0,
    contactedCount: contactedRow?.cnt || 0,
    convertedCount: convertedRow?.cnt || 0,
    brandBreakdown,
    brands: brandBreakdown,
  };
}

/**
 * Update lead status and optional admin notes.
 * @param {string} id 
 * @param {string} status ('NEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED')
 * @param {string|null} notes 
 * @returns {boolean}
 */
export function updateSolarLeadStatus(id, status, notes = null) {
  const db = getSolarDb();
  if (notes !== null) {
    const stmt = db.prepare('UPDATE solar_leads SET status = ?, notes = ? WHERE id = ?');
    stmt.run(status, notes, id);
  } else {
    const stmt = db.prepare('UPDATE solar_leads SET status = ? WHERE id = ?');
    stmt.run(status, id);
  }
  return true;
}
