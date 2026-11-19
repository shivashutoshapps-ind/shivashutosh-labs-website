'use client';

import React, { useState } from 'react';
import styles from './SolarMiddleQuickEnquiry.module.css';
import { trackEvent, getTrackingContext } from '@/lib/solar/tracking';

export default function SolarMiddleQuickEnquiry() {
  const [selectedBrand, setSelectedBrand] = useState('tata'); // 'tata' | 'adani'
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [refId, setRefId] = useState('');

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setStatus('idle');
    setErrors({});
    trackEvent('middle_quick_enquiry_brand_select', { brand });
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
      const cleanMobile = mobile.replace(/\D/g, '');
      const brandUpper = selectedBrand.toUpperCase();

      const payload = {
        fullName: fullName.trim(),
        mobile: cleanMobile,
        brand: selectedBrand,
        leadSource: 'middle_brand_quick_enquiry',
        district: 'उत्तर प्रदेश (संपूर्ण राज्य)',
        preferredSystem: `${brandUpper} Solar Middle Quick Enquiry`,
        notes: `[Middle Quick Enquiry - ${brandUpper}] Fast 2-field enquiry submitted`,
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
        throw new Error(data.error || 'इन्क्वायरी दर्ज करने में समस्या हुई। कृपया पुनः प्रयास करें।');
      }

      trackEvent('middle_quick_enquiry_submitted', {
        brand: selectedBrand,
        lead_id: data.leadId || '',
      });

      setRefId(data.leadId || '');
      setStatus('success');
      setStatusMessage(
        `आपकी ${brandUpper} Solar इन्क्वायरी सफलतापूर्वक दर्ज कर ली गई है। हमारे सोलर विशेषज्ञ शीघ्र आपसे संपर्क करेंगे।`
      );
    } catch (err) {
      console.error('Middle quick enquiry error:', err);
      setStatus('error');
      setStatusMessage(err.message || 'सर्वर में समस्या उत्पन्न हुई। कृपया पुनः प्रयास करें।');
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
    <section id="middle-quick-enquiry" className={styles.section} aria-label="TATA एवं Adani सोलर त्वरित इन्क्वायरी">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrowBadge}>⚡ ZERO EFFECTIVE COST | महा-अभियान</span>
          <h2 className={styles.heading}>अपने घर पर Solar लगवाएं – प्रभावी लागत ₹0 तक!</h2>
          <p className={styles.subtitle}>
            ZERO DOWN PAYMENT का विकल्प*, केंद्र (₹78,000) + यूपी सरकार (₹30,000) से अधिकतम ₹1,08,000 तक की कुल सब्सिडी और बिजली बिल में भारी बचत के साथ अपनी पसंद का TATA या Adani सोलर सिस्टम चुनें।
          </p>
        </div>

        {/* Two Brand Cards */}
        <div className={styles.cardsGrid}>
          {/* Card 1: TATA Solar */}
          <div
            className={`${styles.brandCard} ${selectedBrand === 'tata' ? styles.cardActive_tata : ''}`}
            onClick={() => handleSelectBrand('tata')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectBrand('tata');
              }
            }}
            aria-label="TATA Solar कार्ड चुनें"
          >
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.brandLogoTitle}>⚡ TATA Solar</span>
                <span className={`${styles.brandBadge} ${styles.badgeTata}`}>Tier-1 Brand</span>
              </div>
              <p className={styles.cardDesc}>
                उच्च गुणवत्ता वाले सेल, 25 वर्ष की परफ़ॉर्मेंस वारंटी एवं भारतीय परिस्थितियों में सर्वाधिक परखा हुआ और भरोसेमंद ब्रांड।
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectBrand('tata');
              }}
              className={`${styles.enquiryBtn} ${styles.btnTata}`}
              aria-label="TATA Solar Enquiry फॉर्म चुनें"
            >
              <span>TATA Solar Enquiry</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 2: Adani Solar */}
          <div
            className={`${styles.brandCard} ${selectedBrand === 'adani' ? styles.cardActive_adani : ''}`}
            onClick={() => handleSelectBrand('adani')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectBrand('adani');
              }
            }}
            aria-label="Adani Solar कार्ड चुनें"
          >
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.brandLogoTitle}>☀️ Adani Solar</span>
                <span className={`${styles.brandBadge} ${styles.badgeAdani}`}>TOPCon / Bifacial</span>
              </div>
              <p className={styles.cardDesc}>
                अत्याधुनिक N-Type TOPCon टेक्नोलॉजी, उच्च तापमान सहनशीलता एवं कम धूप या बादलों में भी निरंतर बेहतर विद्युत उत्पादन।
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectBrand('adani');
              }}
              className={`${styles.enquiryBtn} ${styles.btnAdani}`}
              aria-label="Adani Solar Enquiry फॉर्म चुनें"
            >
              <span>Adani Solar Enquiry</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Minimal 2-Field Form */}
        <div className={styles.formContainer}>
          {status === 'success' ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>धन्यवाद, {fullName || 'ग्राहक'} जी!</h3>
              <p className={styles.successMsg}>{statusMessage}</p>
              {refId && (
                <div className={styles.refIdBadge}>
                  इन्क्वायरी संदर्भ ID: <strong>{refId.slice(0, 8).toUpperCase()}</strong>
                </div>
              )}
              <div>
                <button type="button" onClick={handleReset} className={styles.resetBtn}>
                  एक और इन्क्वायरी भेजें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Active Selection Banner */}
              <div
                className={`${styles.formActiveBanner} ${
                  selectedBrand === 'tata' ? styles.formActiveBanner_tata : styles.formActiveBanner_adani
                }`}
              >
                <span>
                  {selectedBrand === 'tata'
                    ? '⚡ चयनित विकल्प: TATA Solar Quick Enquiry'
                    : '☀️ चयनित विकल्प: Adani Solar Quick Enquiry'}
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
                {/* Field 1: Customer Name (Required) */}
                <div className={styles.formGroup}>
                  <label htmlFor="middleFullName" className={styles.label}>
                    1. आपका नाम <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="middleFullName"
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

                {/* Field 2: Mobile Number (Required) */}
                <div className={styles.formGroup}>
                  <label htmlFor="middleMobile" className={styles.label}>
                    2. मोबाइल नंबर <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.mobileInputWrap}>
                    <span className={styles.countryCode}>+91</span>
                    <input
                      type="tel"
                      id="middleMobile"
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

              {/* Privacy statement */}
              <p className={styles.privacyText}>
                <span>🔒</span>
                <span>
                  आपकी जानकारी 100% सुरक्षित है। कोई अनचाही कॉल या स्पैम नहीं—केवल आपकी सोलर इन्क्वायरी हेतु संपर्क।
                </span>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={styles.submitBtn}
              >
                {status === 'submitting' ? 'इन्क्वायरी दर्ज हो रही है...' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
