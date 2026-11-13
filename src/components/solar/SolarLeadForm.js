'use client';

import React, { useState, useEffect } from 'react';
import styles from './SolarLeadForm.module.css';
import { trackEvent, getTrackingContext } from '@/lib/solar/tracking';

const DISTRICTS_UP = [
  { value: 'aligarh', label: 'अलीगढ़ (Aligarh) — प्राथमिक सेवा क्षेत्र' },
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
  { value: 'other_up', label: 'अन्य जिला (उत्तर प्रदेश)' },
];

export default function SolarLeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    district: 'aligarh',
    cityVillage: '',
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

  // Capture tracking params on mount
  const [trackingParams, setTrackingParams] = useState({});
  useEffect(() => {
    setTrackingParams(getTrackingContext());
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

    if (!formData.cityVillage.trim()) {
      errs.cityVillage = 'कृपया अपना शहर, कस्बा या गाँव दर्ज करें।';
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
        ...formData,
        ...trackingParams,
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
        customer_type: formData.customerType,
        preferred_system: formData.preferredSystem,
        district: formData.district,
        lead_id: data.leadId || '',
      });

      setStatus('success');
      setStatusMessage(data.message || 'आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है।');
      setSubmittedLead({
        name: formData.fullName,
        mobile: formData.mobile,
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

  const fallbackWhatsappText = encodeURIComponent(
    `नमस्ते शिवआशुतोष सोलर सिस्टम्स, मैंने वेबसाइट पर 3 KW सोलर सिस्टम एवं सब्सिडी जानकारी हेतु संपर्क किया है।\nनाम: ${formData.fullName || 'ग्राहक'}\nमोबाइल: ${formData.mobile || 'मोबाइल'}\nजिला: ${formData.district || 'अलीगढ़'}\nसिस्टम: ${formData.preferredSystem}`
  );
  const fallbackWhatsappUrl = `https://wa.me/919719543259?text=${fallbackWhatsappText}`;

  return (
    <section id="enquiry-form" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>मुफ्त साइट सर्वे एवं परामर्श</span>
          <h2 className={styles.heading}>
            सोलर सिस्टम इन्क्वायरी एवं सब्सिडी पात्रता फॉर्म
          </h2>
          <p className={styles.subtext}>
            नीचे दिया गया संक्षिप्त फॉर्म भरें। हमारे सोलर इंजीनियर आपकी आवश्यकता और छत की जांच कर <strong>24 घंटे के भीतर विस्तृत कोटेशन</strong> प्रदान करेंगे।
          </p>
        </div>

        <div className={styles.formCard}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>धन्यवाद, {submittedLead?.name || 'ग्राहक जी'}!</h3>
              <p className={styles.successMsg}>
                आपकी सोलर सिस्टम इन्क्वायरी सुरक्षित रूप से दर्ज कर ली गई है।
              </p>
              {submittedLead?.leadId && (
                <div className={styles.leadIdBadge}>
                  इन्क्वायरी संदर्भ संख्या (Ref ID): <strong>{submittedLead.leadId.slice(0, 8).toUpperCase()}</strong>
                </div>
              )}
              <div className={styles.nextStepsBox}>
                <h4>आगे क्या होगा?</h4>
                <ol>
                  <li>हमारी तकनीकी टीम आपके दिए गए नंबर <strong>{submittedLead?.mobile}</strong> पर संपर्क करेगी।</li>
                  <li>आपकी छत और बिजली बिल के अनुसार सोलर क्षमता और पीएम सूर्य घर सब्सिडी की सटीक गणना समझाई जाएगी।</li>
                  <li>सुविधाजनक समय पर एक मुफ्त ऑन-साइट सर्वे निर्धारित किया जाएगा।</li>
                </ol>
              </div>

              <div className={styles.successActions}>
                <a
                  href={fallbackWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.successWhatsappBtn}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
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
                      placeholder="10 अंकों का नंबर (जैसे: 9719543259)"
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

                {/* 4. City / Village */}
                <div className={styles.formGroup}>
                  <label htmlFor="cityVillage" className={styles.label}>
                    4. शहर / कस्बा / गाँव <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="cityVillage"
                    name="cityVillage"
                    value={formData.cityVillage}
                    onChange={handleChange}
                    placeholder="जैसे: सिविल लाइन्स, अलीगढ़"
                    className={`${styles.input} ${errors.cityVillage ? styles.inputError : ''}`}
                    required
                  />
                  {errors.cityVillage && <span className={styles.errorText}>{errors.cityVillage}</span>}
                </div>
              </div>

              {/* 5. Customer Type */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  5. सोलर स्थापना का प्रकार <span className={styles.required}>*</span>
                </label>
                <div className={styles.radioPills}>
                  <label className={`${styles.radioPill} ${formData.customerType === 'residential' ? styles.radioPillActive : ''}`}>
                    <input
                      type="radio"
                      name="customerType"
                      value="residential"
                      checked={formData.customerType === 'residential'}
                      onChange={handleChange}
                    />
                    <span>🏠 आवासीय (घर/मकान)</span>
                  </label>
                  <label className={`${styles.radioPill} ${formData.customerType === 'commercial' ? styles.radioPillActive : ''}`}>
                    <input
                      type="radio"
                      name="customerType"
                      value="commercial"
                      checked={formData.customerType === 'commercial'}
                      onChange={handleChange}
                    />
                    <span>🏢 व्यावसायिक (दुकान / शोरूम / स्कूल)</span>
                  </label>
                </div>
              </div>

              {/* 6. Monthly Electricity Bill */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  6. आपका औसत मासिक बिजली बिल <span className={styles.required}>*</span>
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

              {/* 7. Rooftop Space Available */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  7. क्या छत पर पर्याप्त धूप वाली जगह उपलब्ध है? <span className={styles.required}>*</span>
                </label>
                <div className={styles.radioPills}>
                  <label className={`${styles.radioPill} ${formData.hasRooftop === 'yes' ? styles.radioPillActive : ''}`}>
                    <input
                      type="radio"
                      name="hasRooftop"
                      value="yes"
                      checked={formData.hasRooftop === 'yes'}
                      onChange={handleChange}
                    />
                    <span>☀️ हाँ, पर्याप्त खुली छत उपलब्ध है</span>
                  </label>
                  <label className={`${styles.radioPill} ${formData.hasRooftop === 'no' ? styles.radioPillActive : ''}`}>
                    <input
                      type="radio"
                      name="hasRooftop"
                      value="no"
                      checked={formData.hasRooftop === 'no'}
                      onChange={handleChange}
                    />
                    <span>☁️ नहीं / सीमित या छायादार स्थान</span>
                  </label>
                </div>
              </div>

              {/* 8. Preferred System */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>
                  8. आपकी पसंदीदा सोलर सिस्टम क्षमता <span className={styles.required}>*</span>
                </label>
                <div className={styles.radioGrid}>
                  {[
                    { id: '1kw', label: '1 KW (छोटे लोड हेतु)' },
                    { id: '2kw', label: '2 KW (मध्यम लोड)' },
                    { id: '3kw', label: '3 KW (सर्वाधिक लोकप्रिय)' },
                    { id: '5kw', label: '5 KW (हेवी लोड / एसी)' },
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
                    मैं शिवआशुतोष सोलर सिस्टम्स से सोलर सिस्टम विवरण, सरकारी सब्सिडी जानकारी एवं मुफ्त साइट सर्वे हेतु कॉल या व्हाट्सएप संदेश प्राप्त करने की सहमति देता हूँ।
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span className={styles.errorText}>{errors.privacyConsent}</span>
                )}
                <p className={styles.privacyNote}>
                  🔒 हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी किसी भी तीसरे पक्ष के साथ साझा नहीं की जाती है।
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
                      <span>मुफ्त जानकारी एवं साइट सर्वे प्राप्त करें</span>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                  💬 919719543259 पर चैट करें
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
