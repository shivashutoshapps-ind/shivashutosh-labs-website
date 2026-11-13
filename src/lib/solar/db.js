import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

let solarDbInstance = null;

/**
 * Get or initialize the SQLite database for solar leads.
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

  // Initialize table
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

  const stmt = db.prepare(`
    INSERT INTO solar_leads (
      id, full_name, mobile, district, city_village,
      customer_type, monthly_bill, has_rooftop, preferred_system,
      privacy_consent, ip_address, utm_source, utm_medium,
      utm_campaign, utm_term, utm_content, referrer, user_agent,
      status, created_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?
    )
  `);

  stmt.run(
    id,
    lead.fullName.trim(),
    lead.mobile.trim(),
    lead.district.trim(),
    lead.cityVillage.trim(),
    lead.customerType,
    lead.monthlyBill,
    lead.hasRooftop,
    lead.preferredSystem,
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
    now
  );

  return { id, createdAt: now };
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
