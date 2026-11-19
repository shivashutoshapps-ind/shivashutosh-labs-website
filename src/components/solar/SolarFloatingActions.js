'use client';

import React from 'react';
import styles from './SolarFloatingActions.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarFloatingActions() {
  const handlePhoneClick = () => {
    trackEvent('phone_call_click', { location: 'floating_mobile_bar' });
  };

  const handleWhatsappClick = () => {
    trackEvent('whatsapp_click', { location: 'floating_mobile_bar' });
  };

  const prefilledMessage = encodeURIComponent(
    'नमस्ते शिवआशुतोष सोलर सिस्टम्स, मुझे अपने घर/दुकान के लिए सोलर सिस्टम और सरकारी सब्सिडी की जानकारी चाहिए।'
  );
  const whatsappUrl = `https://wa.me/917906904706?text=${prefilledMessage}`;

  return (
    <div className={styles.floatingBar} role="region" aria-label="त्वरित संपर्क बटन">
      <a
        href="tel:7906904706"
        onClick={handlePhoneClick}
        className={styles.callAction}
        aria-label="कॉल करें 7906904706"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>कॉल करें (Call Now)</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsappClick}
        className={styles.whatsappAction}
        aria-label="व्हाट्सएप पर संदेश भेजें"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
        </svg>
        <span>व्हाट्सएप करें</span>
      </a>
    </div>
  );
}

