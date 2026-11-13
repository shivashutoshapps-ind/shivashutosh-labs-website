'use client';

import React from 'react';
import Image from 'next/image';
import styles from './SolarHero.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarHero() {
  const handleSurveyCta = () => {
    trackEvent('site_survey_click', { location: 'hero_primary_cta' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappCta = () => {
    trackEvent('whatsapp_click', { location: 'hero_whatsapp_cta' });
  };

  const whatsappMessage = encodeURIComponent(
    'नमस्ते शिवआशुतोष सोलर सिस्टम्स, मुझे अपने घर/दुकान के लिए 3 KW सोलर सिस्टम और सरकारी सब्सिडी की जानकारी चाहिए।'
  );
  const whatsappUrl = `https://wa.me/919719543259?text=${whatsappMessage}`;

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column: Headlines, Promo Card, CTAs */}
          <div className={styles.heroContent}>
            <div className={styles.badgeRow}>
              <span className={styles.pillBadge}>
                <span className={styles.pulseDot}></span>
                पीएम सूर्य घर योजना सब्सिडी सहायता
              </span>
              <span className={styles.regionBadge}>अलीगढ़ एवं उत्तर प्रदेश</span>
            </div>

            <h1 className={styles.headline}>
              अब अपना बिजली बिल <span className={styles.highlightGreen}>कम करें!</span>
            </h1>

            <p className={styles.subheading}>
              अपने घर और व्यवसाय के लिए लगवाएं <strong>3 KW का संपूर्ण सोलर सिस्टम</strong>।
            </p>

            {/* Complete Package Tri-Pills */}
            <div className={styles.packagePills}>
              <div className={styles.packagePill}>
                <span className={styles.pillIcon}>☀️</span>
                <div className={styles.pillText}>
                  <strong>सोलर पैनल्स</strong>
                  <span>उच्च दक्षता मोनो सेल्स</span>
                </div>
              </div>

              <div className={styles.packagePill}>
                <span className={styles.pillIcon}>⚡</span>
                <div className={styles.pillText}>
                  <strong>सोलर इन्वर्टर</strong>
                  <span>स्मार्ट डिजिटल डिस्प्ले</span>
                </div>
              </div>

              <div className={styles.packagePill}>
                <span className={styles.pillIcon}>🔋</span>
                <div className={styles.pillText}>
                  <strong>बैटरी बैकअप</strong>
                  <span>रात व कट में निर्बाध बिजली</span>
                </div>
              </div>
            </div>

            {/* Promotional Pricing & Warranty Card */}
            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <span className={styles.offerTag}>विशेष सब्सिडी ऑफर</span>
                <span className={styles.warrantyTag}>🛡️ 25 साल तक सोलर पैनल परफॉर्मेंस वारंटी*</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>प्रभावी लागत</span>
                <div className={styles.priceValue}>
                  ₹0 <span className={styles.priceAsterisk}>तक*</span>
                </div>
              </div>

              <p className={styles.offerSupport}>
                लागू सरकारी सब्सिडी एवं ग्राहक की पात्रता के अनुसार।
              </p>

              <p className={styles.offerDisclaimer}>
                * प्रभावी लागत ₹0 तक का अर्थ है कि लागू सरकारी सब्सिडी एवं ग्राहक की पात्रता के बाद अनुमानित प्रभावी लागत शून्य तक हो सकती है। वास्तविक लागत, ग्राहक का भुगतान, सिस्टम कॉन्फिगरेशन और सब्सिडी स्वीकृति योजना की शर्तों एवं ग्राहक की स्थिति पर निर्भर करेंगे।
              </p>
            </div>

            {/* Dual CTAs */}
            <div className={styles.ctaRow}>
              <button
                type="button"
                onClick={handleSurveyCta}
                className={styles.primaryCta}
              >
                <span>मुफ्त साइट सर्वे बुक करें</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappCta}
                className={styles.whatsappCta}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                  <path fill="#ffffff" d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z"/>
                </svg>
                <span>WhatsApp पर बात करें</span>
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span> 100% मुफ्त तकनीकी सर्वे
              </div>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span> सरकारी सब्सिडी सहायता
              </div>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span> लोकल यूपी सपोर्ट
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Imagery & Live Stats Card */}
          <div className={styles.heroVisual}>
            <div className={styles.imageCard}>
              <div className={styles.imageContainer}>
                <Image
                  src="/solar/rooftop-installation.jpg"
                  alt="3 KW Residential Rooftop Solar System Installation in Uttar Pradesh"
                  width={640}
                  height={440}
                  priority
                  className={styles.heroImage}
                />
                <div className={styles.imageOverlayBadge}>
                  <span className={styles.overlayIcon}>☀️</span>
                  <div>
                    <strong>3 KW संपूर्ण रूफटॉप सिस्टम</strong>
                    <p>पैनल + इन्वर्टर + बैटरी बैकअप</p>
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid under image */}
              <div className={styles.specsGrid}>
                <div className={styles.specCard}>
                  <span className={styles.specVal}>12–15</span>
                  <span className={styles.specUnit}>यूनिट/दिन*</span>
                  <span className={styles.specDesc}>अनुमानित बिजली उत्पादन</span>
                </div>
                <div className={styles.specCard}>
                  <span className={styles.specVal}>₹78,000</span>
                  <span className={styles.specUnit}>तक केंद्रीय सब्सिडी</span>
                  <span className={styles.specDesc}>पीएम सूर्य घर योजना</span>
                </div>
                <div className={styles.specCard}>
                  <span className={styles.specVal}>25 वर्ष</span>
                  <span className={styles.specUnit}>वारंटी*</span>
                  <span className={styles.specDesc}>सोलर पैनल परफॉर्मेंस</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
