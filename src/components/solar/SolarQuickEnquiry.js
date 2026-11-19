'use client';

import React, { useState } from 'react';
import styles from './SolarQuickEnquiry.module.css';
import { trackEvent, getTrackingContext } from '@/lib/solar/tracking';

export default function SolarQuickEnquiry() {
  // Mode: 'tata' | 'adani' | 'callback'
  const [mode, setMode] = useState('tata');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [refId, setRefId] = useState('');

  const handleSelectMode = (newMode) => {
    setMode(newMode);
    setStatus('idle');
    setErrors({});
    trackEvent('quick_enquiry_mode_switch', { mode: newMode });
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)।';
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (शुरुआत 6, 7, 8 या 9 से)।';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    try {
      const isCallback = mode === 'callback';
      const selectedBrand = isCallback ? 'general' : mode;
      const leadSource = isCallback ? 'top_callback_request' : 'top_quick_enquiry';
      const cleanMobile = mobile.replace(/\D/g, '');

      const payload = {
        fullName: fullName.trim(),
        mobile: cleanMobile,
        brand: selectedBrand,
        leadSource,
        district: 'उत्तर प्रदेश (संपूर्ण राज्य)',
        preferredSystem: isCallback
          ? 'कॉलबैक अनुरोध (Callback Request)'
          : mode === 'tata'
          ? 'TATA Solar Quick Enquiry'
          : 'Adani Solar Quick Enquiry',
        notes: isCallback
          ? '[Callback Request] Customer requested a return call'
          : `[Quick Enquiry - ${selectedBrand.toUpperCase()}] Top quick enquiry submitted`,
        privacyConsent: true,
        website_check: honeypot,
        ...getTrackingContext(),
      };

      const res = await fetch('/api/solar/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'अनुरोध विफल रहा। कृपया पुनः प्रयास करें।');
      }

      trackEvent('quick_enquiry_submitted', {
        mode,
        brand: selectedBrand,
        lead_id: data.leadId || '',
      });

      setRefId(data.leadId || '');
      setStatus('success');
      setStatusMessage(
        isCallback
          ? 'कॉलबैक का अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।'
          : 'आपकी इन्क्वायरी सफलतापूर्वक दर्ज कर ली गई है। हमारे सोलर विशेषज्ञ शीघ्र आपसे संपर्क करेंगे।'
      );
    } catch (err) {
      console.error('Quick enquiry error:', err);
      setStatus('error');
      setStatusMessage(err.message || 'सर्वर में समस्या उत्पन्न हुई। कृपया पुनः प्रयास करें या सीधे कॉल करें।');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFullName('');
    setMobile('');
    setErrors({});
    setRefId('');
  };

  return (
    <section id="quick-enquiry" className={styles.section} aria-label="त्वरित सोलर इन्क्वायरी एवं संपर्क">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrowBadge}>⚡ त्वरित सेवा | Quick Brand Enquiry & Direct Call</span>
          <h2 className={styles.heading}>त्वरित सोलर इन्क्वायरी एवं कॉल सेवा</h2>
          <p className={styles.subtitle}>
            TATA Solar या Adani Solar की तत्काल जानकारी प्राप्त करें (अधिकतम ₹1,08,000 तक सरकारी सब्सिडी सहायता उपलब्ध) अथवा हमारे तकनीकी विशेषज्ञ से सीधे फ़ोन पर बात करें।
          </p>
        </div>

        {/* Top 3 Action Cards (TATA Solar, Adani Solar, Call Us) */}
        <div className={styles.cardsGrid}>
          {/* Card 1: TATA Solar */}
          <div className={`${styles.brandCard} ${mode === 'tata' ? styles.cardActive_tata : ''}`}>
            <div>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="15" fill="#005A9C" />
                    <path d="M8 11h16M16 11v12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className={styles.brandLogoTitle}>TATA Solar</span>
                </div>
                <span className={`${styles.brandBadge} ${styles.badgeTata}`}>Tier-1 Brand</span>
              </div>
              <p className={styles.cardDesc}>
                उच्च सेल दक्षता, 25 वर्ष परफॉर्मेंस वारंटी एवं भारतीय मौसम के लिए सर्वाधिक भरोसेमंद सोलर सिस्टम।
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectMode('tata')}
              className={`${styles.enquiryBtn} ${styles.btnTata}`}
              aria-label="TATA Solar Enquiry फॉर्म खोलें"
            >
              <span>TATA Solar Enquiry</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 2: Adani Solar */}
          <div className={`${styles.brandCard} ${mode === 'adani' ? styles.cardActive_adani : ''}`}>
            <div>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="15" fill="#EA580C" />
                    <circle cx="16" cy="16" r="6" fill="#F59E0B" />
                    <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span className={styles.brandLogoTitle}>Adani Solar</span>
                </div>
                <span className={`${styles.brandBadge} ${styles.badgeAdani}`}>TOPCon / Bifacial</span>
              </div>
              <p className={styles.cardDesc}>
                अत्याधुनिक TOPCon टेक्नोलॉजी, उच्च तापमान सहनशीलता एवं कम धूप में भी बेहतर विद्युत उत्पादन।
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectMode('adani')}
              className={`${styles.enquiryBtn} ${styles.btnAdani}`}
              aria-label="Adani Solar Enquiry फॉर्म खोलें"
            >
              <span>Adani Solar Enquiry</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 3: Call Us (Dual Options: Call Now or Request Callback) */}
          <div className={`${styles.brandCard} ${mode === 'callback' ? styles.cardActive_call : ''}`}>
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.brandLogoTitle}>📞 Call Us</span>
                <span className={`${styles.brandBadge} ${styles.badgeCall}`}>फ़ोन सुविधा</span>
              </div>
              <p className={styles.cardDesc}>
                सोलर विशेषज्ञ से सीधे बात करें या अपनी सुविधानुसार कॉलबैक का अनुरोध दर्ज करें।
              </p>
            </div>
            <div className={styles.callActionsWrap}>
              <a
                href="tel:9719543259"
                className={styles.btnCallNow}
                onClick={() => trackEvent('quick_call_now_click')}
                aria-label="Call Now - 9719543259 पर अभी कॉल करें"
              >
                <span>📞 Call Now</span>
              </a>
              <button
                type="button"
                onClick={() => handleSelectMode('callback')}
                className={styles.btnCallback}
                aria-label="Request a Callback फॉर्म खोलें"
              >
                <span>Request a Callback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Quick Enquiry / Callback Form */}
        <div className={styles.formContainer}>
          {status === 'success' ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>धन्यवाद, {fullName || 'ग्राहक जी'}!</h3>
              <p className={styles.successMsg}>{statusMessage}</p>
              {refId && (
                <div className={styles.refIdBadge}>
                  संदर्भ संख्या (Ref ID): <strong>{refId.slice(0, 8).toUpperCase()}</strong>
                </div>
              )}
              <div>
                <button type="button" onClick={handleReset} className={styles.resetBtn}>
                  एक और इन्क्वायरी / कॉलबैक अनुरोध भेजें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Active Selection Banner */}
              <div className={`${styles.formActiveBanner} ${styles[`formActiveBanner_${mode}`]}`}>
                <span>
                  {mode === 'tata' && '⚡ चयनित विकल्प: TATA Solar Quick Enquiry'}
                  {mode === 'adani' && '☀️ चयनित विकल्प: Adani Solar Quick Enquiry'}
                  {mode === 'callback' && '📞 चयनित विकल्प: विशेषज्ञ कॉलबैक अनुरोध (Request a Callback)'}
                </span>
                <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>(त्वरित फॉर्म)</span>
              </div>

              {/* Honeypot field */}
              <input
                type="text"
                name="website_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {status === 'error' && (
                <div className={styles.errorAlert}>
                  <span>⚠️ {statusMessage}</span>
                </div>
              )}

              <div className={styles.formGrid}>
                {/* 1. Customer Name (Required) */}
                <div className={styles.formGroup}>
                  <label htmlFor="quickFullName" className={styles.label}>
                    1. ग्राहक का नाम (Customer Name) <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="quickFullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="जैसे: अमित शर्मा"
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    required
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                {/* 2. Mobile Number (Required) */}
                <div className={styles.formGroup}>
                  <label htmlFor="quickMobile" className={styles.label}>
                    2. मोबाइल नंबर (Mobile Number) <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.mobileInputWrap}>
                    <span className={styles.countryCode}>+91</span>
                    <input
                      type="tel"
                      id="quickMobile"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                      }}
                      placeholder="10 अंकों का मोबाइल नंबर"
                      className={`${styles.input} ${styles.inputMobile} ${errors.mobile ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
                </div>
              </div>

              {/* Short Privacy / Consent Statement */}
              <p className={styles.privacyText}>
                <span>🔒</span>
                <span>
                  आपकी जानकारी 100% सुरक्षित है। हम केवल आपकी सोलर इन्क्वायरी / कॉलबैक अनुरोध हेतु संपर्क करेंगे।
                </span>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={styles.submitBtn}
              >
                {status === 'submitting' ? 'अनुरोध दर्ज हो रहा है...' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
