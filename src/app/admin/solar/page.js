'use client';

import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';

/**
 * Format ISO UTC timestamp to Indian Standard Time (Asia/Kolkata) in 24-hour format.
 * Format: DD-MM-YYYY, HH:MM
 * If missing or unrecoverable: returns 'पुराना रिकॉर्ड – समय उपलब्ध नहीं'
 */
function formatIndianDateTime(isoString) {
  if (!isoString) return 'पुराना रिकॉर्ड – समय उपलब्ध नहीं';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'पुराना रिकॉर्ड – समय उपलब्ध नहीं';
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(d);
    let day = '', month = '', year = '', hour = '', minute = '';
    for (const p of parts) {
      if (p.type === 'day') day = p.value;
      if (p.type === 'month') month = p.value;
      if (p.type === 'year') year = p.value;
      if (p.type === 'hour') hour = p.value;
      if (p.type === 'minute') minute = p.value;
    }
    return `${day}-${month}-${year}, ${hour}:${minute}`;
  } catch (e) {
    return 'पुराना रिकॉर्ड – समय उपलब्ध नहीं';
  }
}

export default function SolarAdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    convertedCount: 0,
    brands: { tata: 0, adani: 0, utl: 0, general: 0 },
  });
  const [leads, setLeads] = useState([]);
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadDashboard = async (keyToUse) => {
    if (!keyToUse) return;
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/solar/leads/admin', {
        headers: {
          'x-admin-key': keyToUse,
        },
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setAuthError('अमान्य एडमिन कुंजी (Invalid Admin Key)');
        if (typeof window !== 'undefined') sessionStorage.removeItem('solar_admin_key');
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error('डाटा लोड करने में विफल');
      }

      const data = await res.json();
      setStats(data.stats || { total: 0, newCount: 0, contactedCount: 0, convertedCount: 0, brands: {} });
      setLeads(data.leads || []);
      setAdminKey(keyToUse);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') sessionStorage.setItem('solar_admin_key', keyToUse);
    } catch (err) {
      setAuthError(err.message || 'कनेक्शन त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('solar_admin_key') : null;
    if (!stored) return;

    fetch('/api/solar/leads/admin', {
      headers: { 'x-admin-key': stored },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setStats(data.stats || { total: 0, newCount: 0, contactedCount: 0, convertedCount: 0, brands: {} });
          setLeads(data.leads || []);
          setAdminKey(stored);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsAuthenticated(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    loadDashboard(inputKey.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    setInputKey('');
    if (typeof window !== 'undefined') sessionStorage.removeItem('solar_admin_key');
  };

  const handleExportCsv = () => {
    if (!leads || leads.length === 0) return;
    const headers = [
      'ID (रेफरेंस)',
      'दिनांक व समय (IST)',
      'ब्रांड (Brand)',
      'ग्राहक का नाम (Customer Name)',
      'मोबाइल नंबर (Mobile)',
      'जिला (District)',
      'स्थान / गांव (City/Village)',
      'मांग / सिस्टम (System/Capacity)',
      'मासिक बिल (Monthly Bill)',
      'लीड स्रोत (Lead Source)',
      'स्थिति (Status)',
      'नोट्स (Notes)',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${formatIndianDateTime(l.createdAt || l.created_at)}"`,
      `"${(l.brand || 'general').toUpperCase()}"`,
      `"${(l.fullName || l.full_name || '').replace(/"/g, '""')}"`,
      `"${l.mobile || ''}"`,
      `"${(l.district || '').replace(/"/g, '""')}"`,
      `"${(l.cityVillage || l.city_village || '').replace(/"/g, '""')}"`,
      `"${(l.capacity || l.preferredSystem || l.preferred_system || '').replace(/"/g, '""')}"`,
      `"${(l.monthlyBill || l.monthly_bill || '').replace(/"/g, '""')}"`,
      `"${l.utmSource || l.utm_source || 'website'}"`,
      `"${l.status || 'NEW'}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solar_leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch('/api/solar/leads/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (!res.ok) {
        alert('स्टेटस अपडेट विफल रहा');
        return;
      }

      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      // Refresh stats
      loadDashboard(adminKey);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('अपडेट में त्रुटि हुई');
    }
  };

  // Filter leads in memory
  const filteredLeads = leads.filter((lead) => {
    if (brandFilter !== 'all' && lead.brand !== brandFilter) return false;
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.fullName?.toLowerCase().includes(q);
      const matchMobile = lead.mobile?.includes(q);
      const matchDistrict = lead.district?.toLowerCase().includes(q);
      if (!matchName && !matchMobile && !matchDistrict) return false;
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginIcon}>🔒</div>
          <h1 className={styles.loginTitle}>Solar Leads Admin Portal</h1>
          <p className={styles.loginDesc}>
            शिवआशुतोष सोलर एजेंसी — सुरक्षित एडमिन क्रेडेंशियल दर्ज करें
          </p>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            {authError && <div className={styles.loginError}>{authError}</div>}
            <input
              type="password"
              placeholder="Admin Secret Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className={styles.loginInput}
              autoFocus
              required
            />
            <button type="submit" disabled={isLoading} className={styles.loginBtn}>
              {isLoading ? 'सत्यापित हो रहा है...' : 'डैशबोर्ड में प्रवेश करें'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.inner}>
        {/* Top Header */}
        <div className={styles.topBar}>
          <div className={styles.titleArea}>
            <h1>⚡ Solar Leads Management Dashboard</h1>
            <p>Shivashutosh Solar Agency — Real-time Leads & Brand Analytics</p>
          </div>
          <div className={styles.authBadge}>
            <button onClick={handleExportCsv} className={styles.exportBtn} title="सभी लीड्स का डाटा CSV में डाउनलोड करें">
              📥 CSV डाउनलोड
            </button>
            <button onClick={() => loadDashboard(adminKey)} className={styles.refreshBtn}>
              🔄 {isLoading ? 'रिफ्रेश हो रहा...' : 'रिफ्रेश'}
            </button>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              लॉगआउट
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>कुल सोलर इन्क्वायरी</span>
            <span className={styles.statVal}>{stats.total}</span>
            <span className={styles.statSub}>सभी प्राप्त लीड्स</span>
          </div>
          <div className={styles.statCard} style={{ borderColor: '#1D4ED8' }}>
            <span className={styles.statLabel} style={{ color: '#60A5FA' }}>नई इन्क्वायरी (NEW)</span>
            <span className={styles.statVal} style={{ color: '#60A5FA' }}>{stats.newCount}</span>
            <span className={styles.statSub}>संपर्क बाकी</span>
          </div>
          <div className={styles.statCard} style={{ borderColor: '#D97706' }}>
            <span className={styles.statLabel} style={{ color: '#FBBF24' }}>संपर्क किया गया (CONTACTED)</span>
            <span className={styles.statVal} style={{ color: '#FBBF24' }}>{stats.contactedCount}</span>
            <span className={styles.statSub}>प्रक्रियाधीन</span>
          </div>
          <div className={styles.statCard} style={{ borderColor: '#059669' }}>
            <span className={styles.statLabel} style={{ color: '#34D399' }}>सफल ग्राहक (CONVERTED)</span>
            <span className={styles.statVal} style={{ color: '#34D399' }}>{stats.convertedCount}</span>
            <span className={styles.statSub}>सफलतापूर्वक स्थापित</span>
          </div>
        </div>

        {/* Brand Breakdown Row */}
        <div className={styles.brandBreakdown}>
          <div className={`${styles.brandStatCard} ${styles.brand_tata}`}>
            <div>
              <div className={styles.brandStatName}>⚡ TATA Solar</div>
              <small style={{ color: '#94A3B8' }}>Tata Power Solar</small>
            </div>
            <div className={styles.brandStatCount}>{stats.brands?.tata || 0}</div>
          </div>
          <div className={`${styles.brandStatCard} ${styles.brand_adani}`}>
            <div>
              <div className={styles.brandStatName}>☀️ Adani Solar</div>
              <small style={{ color: '#94A3B8' }}>Adani PV Modules</small>
            </div>
            <div className={styles.brandStatCount}>{stats.brands?.adani || 0}</div>
          </div>
          <div className={`${styles.brandStatCard} ${styles.brand_utl}`}>
            <div>
              <div className={styles.brandStatName}>🔋 UTL Solar</div>
              <small style={{ color: '#94A3B8' }}>UTL Systems</small>
            </div>
            <div className={styles.brandStatCount}>{stats.brands?.utl || 0}</div>
          </div>
          <div className={`${styles.brandStatCard} ${styles.brand_general}`}>
            <div>
              <div className={styles.brandStatName}>📋 सामान्य / अन्य</div>
              <small style={{ color: '#94A3B8' }}>कस्टमाइज्ड परामर्श</small>
            </div>
            <div className={styles.brandStatCount}>{stats.brands?.general || 0}</div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>ब्रांड:</span>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">सभी ब्रांड्स ({stats.total})</option>
              <option value="tata">TATA Solar ({stats.brands?.tata || 0})</option>
              <option value="adani">Adani Solar ({stats.brands?.adani || 0})</option>
              <option value="utl">UTL Solar ({stats.brands?.utl || 0})</option>
              <option value="general">अन्य / सामान्य ({stats.brands?.general || 0})</option>
            </select>

            <span className={styles.filterLabel}>स्थिति:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">सभी स्थिति</option>
              <option value="NEW">नई (NEW)</option>
              <option value="CONTACTED">संपर्क किया (CONTACTED)</option>
              <option value="CONVERTED">सफल (CONVERTED)</option>
              <option value="ARCHIVED">आर्काइव्ड (ARCHIVED)</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="नाम, मोबाइल या जिला खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className={styles.tableWrap}>
          {filteredLeads.length === 0 ? (
            <div className={styles.emptyState}>
              <p>कोई इन्क्वायरी नहीं मिली।</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>दिनांक व समय</th>
                  <th>ब्रांड पसंद</th>
                  <th>ग्राहक विवरण</th>
                  <th>स्थान / जिला</th>
                  <th>मांग / क्षमता</th>
                  <th>स्थिति</th>
                  <th>एक्शन</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const brandKey = (lead.brand || 'general').toLowerCase();
                  const cleanPhone = (lead.mobile || '').replace(/\D/g, '');
                  const customerName = lead.fullName || lead.full_name || 'ग्राहक';
                  const formattedDateTime = formatIndianDateTime(lead.createdAt || lead.created_at);
                  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`नमस्ते ${customerName} जी, शिवआशुतोष सोलर एजेंसी से संपर्क किया जा रहा है। आपने ${lead.brand?.toUpperCase() || 'सोलर'} सिस्टम हेतु इन्क्वायरी दर्ज की थी।`)}`;

                  return (
                    <tr key={lead.id}>
                      <td style={{ whiteSpace: 'nowrap', color: '#F1F5F9', fontSize: '0.85rem', fontWeight: 600 }}>
                        {formattedDateTime}
                      </td>
                      <td>
                        <span className={`${styles.badgeBrand} ${styles[`badgeBrand_${brandKey}`] || styles.badgeBrand_general}`}>
                          {brandKey.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className={styles.leadName}>{customerName}</div>
                        <div className={styles.leadMobile}>
                          <span>+91 {lead.mobile}</span>
                          <a href={`tel:+91${cleanPhone}`} className={styles.actionIcon} title="कॉल करें">
                            📞
                          </a>
                          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={`${styles.actionIcon} ${styles.actionIconWhatsapp}`} title="WhatsApp करें">
                            💬
                          </a>
                        </div>
                      </td>
                      <td>
                        <strong style={{ color: '#F1F5F9' }}>{lead.district || 'उत्तर प्रदेश'}</strong>
                        {(lead.cityVillage || lead.city_village) && (
                          <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{lead.cityVillage || lead.city_village}</div>
                        )}
                      </td>
                      <td>
                        {(lead.utm_source === 'top_callback_request' || (lead.notes && lead.notes.includes('Callback Request'))) ? (
                          <span style={{
                            display: 'inline-block',
                            background: '#FEF3C7',
                            color: '#92400E',
                            border: '1px solid #FDE68A',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            marginBottom: '0.35rem'
                          }}>
                            📞 कॉलबैक अनुरोध
                          </span>
                        ) : (lead.utm_source === 'middle_brand_quick_enquiry' || (lead.notes && lead.notes.includes('Middle Quick Enquiry'))) ? (
                          <span style={{
                            display: 'inline-block',
                            background: '#EDE9FE',
                            color: '#6D28D9',
                            border: '1px solid #DDD6FE',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            marginBottom: '0.35rem'
                          }}>
                            ⚡ मिडिल ब्रांड इन्क्वायरी
                          </span>
                        ) : lead.utm_source === 'top_quick_enquiry' ? (
                          <span style={{
                            display: 'inline-block',
                            background: '#E0F2FE',
                            color: '#0369A1',
                            border: '1px solid #BAE6FD',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            marginBottom: '0.35rem'
                          }}>
                            ⚡ त्वरित इन्क्वायरी
                          </span>
                        ) : null}
                        <div style={{ color: '#38BDF8', fontWeight: 700 }}>
                          {lead.capacity || lead.preferredSystem || lead.preferred_system || 'सलाह चाहिए'}
                        </div>
                        {(lead.monthlyBill || lead.monthly_bill) && (
                          <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                            बिल: {lead.monthlyBill || lead.monthly_bill}
                          </div>
                        )}
                        {lead.notes && (
                          <div style={{ color: '#CBD5E1', fontSize: '0.75rem', marginTop: '0.25rem', fontStyle: 'italic' }}>
                            {lead.notes}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`${styles.badgeStatus} ${styles[`status_${lead.status || 'NEW'}`]}`}>
                          {lead.status || 'NEW'}
                        </span>
                      </td>
                      <td>
                        <select
                          value={lead.status || 'NEW'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={styles.statusSelect}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
