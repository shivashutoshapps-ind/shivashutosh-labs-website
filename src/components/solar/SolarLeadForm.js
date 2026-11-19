'use client';

import React, { useState, useEffect } from 'react';
import styles from './SolarLeadForm.module.css';
import { trackEvent, getTrackingContext } from '@/lib/solar/tracking';

const DISTRICTS_UP = [
  { value: 'aligarh', label: 'अलीगढ़ (Aligarh)' },
  { value: 'hathras', label: 'हाथरस (Hathras)' },
  { value: 'mathura', label: 'मथुरा (Mathura)' },
  { value: 'agra', label: 'आगरा (Agra)' },
  { value: 'bulandshahr', label: 'बुलंदशहर (Bulandshahr)' },
  { value: 'kasganj', label: 'कासगंज (Kasganj)' },
  { value: 'etah', label: 'एटा (Etah)' },
  { value: 'firozabad', label: 'फिरोजाबाद (Firozabad)' },
  { value: 'noida_gbnagar', label: 'गौतम बुद्ध नगर / नोएडा (G.B. Nagar)' },
  { value: 'ghaziabad', label: 'गाजियाबाद (Ghaziabad)' },
  { value: 'meerut', label: 'मेरठ (Meerut)' },
  { value: 'bareilly', label: 'बरेली (Bareilly)' },
  { value: 'moradabad', label: 'मुरादाबाद (Moradabad)' },
  { value: 'lucknow', label: 'लखनऊ (Lucknow)' },
  { value: 'kanpur', label: 'कानपुर (Kanpur)' },
  { value: 'prayagraj', label: 'प्रयागराज (Prayagraj)' },
  { value: 'varanasi', label: 'वाराणसी (Varanasi)' },
  { value: 'gorakhpur', label: 'गोरखपुर (Gorakhpur)' },
  { value: 'ayodhya', label: 'अयोध्या (Ayodhya)' },
  { value: 'other_up', label: 'अन्य जिला (संपूर्ण उत्तर प्रदेश)' },
];

const BRAND_CHOICES = [
  { id: 'tata', name: 'TATA Power Solar', shortName: 'TATA Solar', icon: '⚡' },
  { id: 'adani', name: 'Adani Solar', shortName: 'Adani Solar', icon: '☀️' },
  { id: 'utl', name: 'UTL Solar', shortName: 'UTL Solar', icon: '🔋' },
  { id: 'general', name: 'अन्य / सामान्य परामर्श', shortName: 'सामान्य परामर्श', icon: '📋' },
];

export default function SolarLeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    district: 'aligarh',
    cityVillage: '',
    brand: 'tata',
    customerType: 'residential',
    monthlyBill: '2000_3000',
    hasRooftop: 'yes',
    preferredSystem: '3kw',
    privacyConsent: true,
    website_check: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  // Listen for brand selection events dispatched from other sections (e.g. SolarBrands)
  useEffect(() => {
    const handleBrandEvent = (e) => {
      if (e.detail?.brand) {
        setFormData((prev) => ({ ...prev, brand: e.detail.brand }));
      }
    };
    window.addEventListener('solar-select-brand', handleBrandEvent);
    return () => window.removeEventListener('solar-select-brand', handleBrandEvent);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBrandSelect = (brandId) => {
    setFormData((prev) => ({ ...prev, brand: brandId }));
    trackEvent('lead_form_brand_change', { brand: brandId });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से प्रारंभ)।';
    }

    if (!formData.district) {
      errs.district = 'कृपया अपना जिला चुनें।';
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = 'आगे बढ़ने के लिए सहमति देना अनिवार्य है।';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        district: formData.district,
        cityVillage: formData.cityVillage.trim(),
        brand: formData.brand,
        capacity: formData.preferredSystem,
        customerType: formData.customerType,
        monthlyBill: formData.monthlyBill,
        hasRooftop: formData.hasRooftop,
        preferredSystem: formData.preferredSystem,
        privacyConsent: formData.privacyConsent,
        website_check: formData.website_check,
        ...getTrackingContext(),
      };

      const res = await fetch('/api/solar/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'सबमिशन विफल रहा।');
      }

      // Track lead conversion event
      trackEvent('lead_form_submitted', {
        brand: formData.brand,
        preferred_system: formData.preferredSystem,
        district: formData.district,
        lead_id: data.leadId || '',
      });

      setStatus('success');
      setStatusMessage(data.message || 'आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है।');
      setSubmittedLead({
        name: formData.fullName,
        mobile: formData.mobile,
        brand: formData.brand,
        system: formData.preferredSystem,
        district: formData.district,
        leadId: data.leadId,
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setStatusMessage(err.message || 'सर्वर में समस्या उत्पन्न हुई। कृपया पुनः प्रयास करें या सीधे व्हाट्सएप करें।');
    }
  };

  const currentBrandObj = BRAND_CHOICES.find((b) => b.id === formData.brand) || BRAND_CHOICES[0];

  const getSubmitButtonLabel = () => {
    if (formData.brand === 'tata') return 'Tata Solar Enquiry भेजें';
    if (formData.brand === 'adani') return 'Adani Solar Enquiry भेजें';
    if (formData.brand === 'utl') return 'UTL Solar Enquiry भेजें';
    return 'अपनी Solar Enquiry भेजें';
  };

  const fallbackWhatsappText = encodeURIComponent(
    `नमस्ते शिवआशुतोष सोलर एजेंसी, मैंने वेबसाइट पर सोलर सिस्टम इन्क्वायरी दर्ज की है।\nब्रांड पसंद: ${currentBrandObj.name}\nनाम: ${formData.fullName || 'ग्राहक'}\nमोबाइल: ${formData.mobile || ''}\nजिला: ${formData.district || 'उत्तर प्रदेश'}\nक्षमता: ${formData.preferredSystem}`
  );
  const fallbackWhatsappUrl = `https://wa.me/917906904706?text=${fallbackWhatsappText}`;

  return (
    <section id="enquiry-form" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>मुफ्त साइट सर्वे एवं पारदर्शी कोटेशन</span>
          <h2 className={styles.heading}>
            सोलर सिस्टम इन्क्वायरी एवं सब्सिडी फॉर्म
          </h2>
          <p className={styles.subtext}>
            अपनी आवश्यकता दर्ज करें। हमारे सोलर विशेषज्ञ आपकी छत व बिजली बिल अनुसार <strong>24 घंटे के भीतर विस्तृत कोटेशन</strong> प्रदान करेंगे।
          </p>
        </div>

        <div className={styles.formCard}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>धन्यवाद, {submittedLead?.name || 'ग्राहक जी'}!</h3>
              <p className={styles.successMsg}>
                आपकी <strong>{currentBrandObj.name}</strong> सोलर इन्क्वायरी सुरक्षित रूप से दर्ज कर ली गई है।
              </p>
              {submittedLead?.leadId && (
                <div className={styles.leadIdBadge}>
                  इन्क्वायरी संदर्भ संख्या (Ref ID): <strong>{submittedLead.leadId.slice(0, 8).toUpperCase()}</strong>
                </div>
              )}
              <div className={styles.nextStepsBox}>
                <h4>आगे क्या होगा?</h4>
                <ol>
                  <li>हमारी तकनीकी टीम आपके दिए गए नंबर <strong>{submittedLead?.mobile}</strong> पर शीघ्र संपर्क करेगी।</li>
                  <li>चुने गए ब्रांड (<strong>{currentBrandObj.name}</strong>) एवं क्षमता अनुसार कोटेशन व पीएम सूर्य घर सब्सिडी विवरण साझा किया जाएगा।</li>
                  <li>आपकी सुविधा अनुसार ऑन-साइट या डिजिटल सर्वे की व्यवस्था की जाएगी।</li>
                </ol>
              </div>

              <div className={styles.successActions}>
                <a
                  href={fallbackWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.successWhatsappBtn}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                  </svg>
                  <span>व्हाट्सएप पर तुरंत पुष्टि प्राप्त करें</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setSubmittedLead(null);
                  }}
                  className={styles.resetBtn}
                >
                  अन्य इन्क्वायरी दर्ज करें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              {/* Honeypot field (hidden from real users) */}
              <input
                type="text"
                name="website_check"
                value={formData.website_check}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Brand Selector Chips (Phase 2 & 3 Integration) */}
              <div className={styles.brandSelectorBox}>
                <span className={styles.brandSelectorTitle}>
                  <span>🎯</span> अपनी पसंद का सोलर ब्रांड चुनें:
                </span>
                <div className={styles.brandChips} role="group" aria-label="सोलर ब्रांड विकल्प">
                  {BRAND_CHOICES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleBrandSelect(b.id)}
                      className={`${styles.brandChip} ${formData.brand === b.id ? styles[`brandChipActive_${b.id}`] : ''}`}
                    >
                      <span aria-hidden="true">{b.icon}</span>
                      <span>{b.shortName}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.brandActiveNote}>
                  <span>✓</span>
                  <span>
                    चयनित ब्रांड: <strong>{currentBrandObj.name}</strong> (बदलने के लिए ऊपर दिए गए विकल्पों पर टैप करें)
                  </span>
                </div>
              </div>

              {status === 'error' && (
                <div className={styles.errorAlert}>
                  <span>⚠️ {statusMessage}</span>
                  <a
                    href={fallbackWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.errorWhatsappLink}
                  >
                    व्हाट्सएप पर भेजें ↗
                  </a>
                </div>
              )}

              <div className={styles.formGrid}>
                {/* 1. Full Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>
                    1. आपका पूरा नाम <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="जैसे: अमित शर्मा"
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    required
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                {/* 2. Mobile Number */}
                <div className={styles.formGroup}>
                  <label htmlFor="mobile" className={styles.label}>
                    2. मोबाइल नंबर <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.mobileInputWrap}>
                    <span className={styles.countryCode}>+91</span>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10 अंकों का नंबर (जैसे: 7906904706)"
                      className={`${styles.input} ${styles.inputMobile} ${errors.mobile ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
                </div>

                {/* 3. District */}
                <div className={styles.formGroup}>
                  <label htmlFor="district" className={styles.label}>
                    3. आपका जिला <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.district ? styles.inputError : ''}`}
                    required
                  >
                    {DISTRICTS_UP.map((dist) => (
                      <option key={dist.value} value={dist.value}>
                        {dist.label}
                      </option>
                    ))}
                  </select>
                  {errors.district && <span className={styles.errorText}>{errors.district}</span>}
                </div>

                {/* 4. City / Village / Locality (Optional) */}
                <div className={styles.formGroup}>
                  <label htmlFor="cityVillage" className={styles.label}>
                    4. शहर / कस्बा / गाँव या पता <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.825rem' }}>(वैकल्पिक)</span>
                  </label>
                  <input
                    type="text"
                    id="cityVillage"
                    name="cityVillage"
                    value={formData.cityVillage}
                    onChange={handleChange}
                    placeholder="जैसे: सिविल लाइन्स, अलीगढ़"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* 5. Preferred Capacity */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  5. आवश्यक सोलर क्षमता <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.825rem' }}>(वैकल्पिक)</span>
                </label>
                <div className={styles.radioGrid}>
                  {[
                    { id: '1kw', label: '1 KW (छोटे लोड हेतु)' },
                    { id: '2kw', label: '2 KW (मध्यम लोड)' },
                    { id: '3kw', label: '3 KW (सर्वाधिक लोकप्रिय)' },
                    { id: '5kw', label: '5 KW (हेवी लोड / एसी)' },
                    { id: '10kw_plus', label: '10 KW+ (व्यावसायिक)' },
                    { id: 'consultation', label: 'सलाह चाहिए (सर्वोत्तम बताएं)' },
                  ].map((sys) => (
                    <label
                      key={sys.id}
                      className={`${styles.radioPill} ${formData.preferredSystem === sys.id ? styles.radioPillActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="preferredSystem"
                        value={sys.id}
                        checked={formData.preferredSystem === sys.id}
                        onChange={handleChange}
                      />
                      <span>{sys.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Monthly Electricity Bill (Optional) */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  6. औसत मासिक बिजली बिल <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.825rem' }}>(वैकल्पिक)</span>
                </label>
                <div className={styles.radioGrid}>
                  {[
                    { id: 'below_1000', label: '₹1,000 से कम' },
                    { id: '1000_2000', label: '₹1,000 – ₹2,000' },
                    { id: '2000_3000', label: '₹2,000 – ₹3,000' },
                    { id: '3000_5000', label: '₹3,000 – ₹5,000' },
                    { id: 'above_5000', label: '₹5,000 से अधिक' },
                  ].map((tier) => (
                    <label
                      key={tier.id}
                      className={`${styles.radioPill} ${formData.monthlyBill === tier.id ? styles.radioPillActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="monthlyBill"
                        value={tier.id}
                        checked={formData.monthlyBill === tier.id}
                        onChange={handleChange}
                      />
                      <span>{tier.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className={styles.consentWrap}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  <span>
                    मैं शिवआशुतोष सोलर एजेंसी से सोलर सिस्टम विवरण, कोटेशन एवं सब्सिडी सहायता हेतु कॉल या व्हाट्सएप संदेश प्राप्त करने की सहमति देता हूँ।
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span className={styles.errorText}>{errors.privacyConsent}</span>
                )}
                <p className={styles.privacyNote}>
                  🔒 हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी सुरक्षित रखी जाती है और किसी तीसरे पक्ष के साथ साझा नहीं की जाती।
                </p>
              </div>

              {/* Submit Button */}
              <div className={styles.submitWrap}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={styles.submitBtn}
                >
                  {status === 'submitting' ? (
                    <span className={styles.loadingSpinnerWrap}>
                      <span className={styles.spinner}></span>
                      जानकारी दर्ज हो रही है...
                    </span>
                  ) : (
                    <>
                      <span>{getSubmitButtonLabel()}</span>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Fallback Link */}
              <div className={styles.whatsappFallbackWrap}>
                <span>या सीधे व्हाट्सएप पर बात करें:</span>
                <a
                  href={fallbackWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappFallbackLink}
                >
                  💬 917906904706 पर चैट करें
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
