'use client';

import React from 'react';
import styles from './SolarFinalCta.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarFinalCta() {
  const handleSurveyClick = () => {
    trackEvent('site_survey_click', { location: 'final_cta' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = () => {
    trackEvent('phone_call_click', { location: 'final_cta' });
  };

  const handleWhatsappClick = () => {
    trackEvent('whatsapp_click', { location: 'final_cta' });
  };

  const whatsappMessage = encodeURIComponent(
    'नमस्ते शिवआशुतोष सोलर सिस्टम्स, मुझे अपने घर/दुकान के लिए सोलर सिस्टम और सरकारी सब्सिडी की जानकारी चाहिए।'
  );
  const whatsappUrl = `https://wa.me/919719543259?text=${whatsappMessage}`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.badge}>सौर ऊर्जा अपनाएं — पर्यावरण व धन दोनों बचाएं</span>
          <h2 className={styles.headline}>
            आज ही अपने घर को सोलर ऊर्जा से जोड़ें!
          </h2>
          <p className={styles.subtext}>
            बिजली बिल के भारी खर्च से मुक्ति पाएं और ₹78,000 तक की सरकारी सब्सिडी का लाभ उठाएं। आज ही हमारे सोलर इंजीनियर से मुफ्त सलाह लें।
          </p>

          <div className={styles.btnRow}>
            {/* 1. Call Now */}
            <a
              href="tel:9719543259"
              onClick={handlePhoneClick}
              className={styles.callBtn}
              aria-label="Call Now at 9719543259"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call Now – 9719543259</span>
            </a>

            {/* 2. WhatsApp Now */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsappClick}
              className={styles.whatsappBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
              </svg>
              <span>WhatsApp Now</span>
            </a>

            {/* 3. Book Free Site Survey */}
            <button
              type="button"
              onClick={handleSurveyClick}
              className={styles.surveyBtn}
            >
              <span>Book Free Site Survey</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

