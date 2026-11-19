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

  const handleBrandsCta = () => {
    trackEvent('view_brands_click', { location: 'hero_secondary_cta' });
    const target = document.getElementById('solar-brands');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneCta = () => {
    trackEvent('phone_call_click', { location: 'hero_phone_cta' });
  };

  const handleWhatsappCta = () => {
    trackEvent('whatsapp_click', { location: 'hero_whatsapp_cta' });
  };

  const whatsappMessage = encodeURIComponent(
    'नमस्ते शिवआशुतोष सोलर एजेंसी, मुझे उत्तर प्रदेश में अपने घर/दुकान के लिए सोलर सिस्टम, ब्रांड्स (TATA/Adani/UTL) और सरकारी सब्सिडी की जानकारी चाहिए।'
  );
  const whatsappUrl = `https://wa.me/917906904706?text=${whatsappMessage}`;

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column: Headlines, Priority Badges, 3 Benefit Cards, CTAs */}
          <div className={styles.heroContent}>
            {/* Authorized Badges with UPNEDA Vendor Code */}
            <div className={styles.badgeRow}>
              <div className={styles.authBadge}>
                <span className={styles.authDot} aria-hidden="true" />
                <div className={styles.authBadgeContent}>
                  <span>UPNEDA Empanelled Vendor: <strong>Radha Enterprises</strong></span>
                  <span className={styles.badgeDivider}>|</span>
                  <span>Vendor Code: <span className={styles.codeSnippet}>AGC2609282705</span></span>
                </div>
              </div>
              <div className={styles.partnerBadge}>
                <span className={styles.partnerDot} aria-hidden="true">🤝</span>
                <span>Shivashutosh Solar Agency – <strong>Authorized Channel Partner</strong></span>
              </div>
              <span className={styles.statewideBadge}>
                🏛️ संपूर्ण उत्तर प्रदेश में सोलर सेवाएँ
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              अब पूरे उत्तर प्रदेश में लगवाएं <span className={styles.highlightGreen}>अपनी पसंद का</span> सोलर सिस्टम!
            </h1>

            {/* Supporting Text */}
            <p className={styles.subheading}>
              सरकारी सब्सिडी सहायता के साथ <strong>TATA, Adani, UTL</strong> और अन्य प्रमुख ब्रांड्स के सोलर सिस्टम विकल्प।
            </p>

            {/* Three Prominent Benefit Cards */}
            <div className={styles.benefitCards} role="list">
              {/* CARD 1: Statewide Service */}
              <div role="listitem" className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>
                  <span className={styles.benefitIcon}>📍</span>
                </div>
                <div className={styles.benefitText}>
                  <strong className={styles.benefitTitle}>पूरे उत्तर प्रदेश में सेवा</strong>
                  <span className={styles.benefitDesc}>साइट सर्वे, इंस्टॉलेशन और सहायता।</span>
                </div>
              </div>

              {/* CARD 2: Choice of Brands */}
              <div role="listitem" className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>
                  <span className={styles.benefitIcon}>☀️</span>
                </div>
                <div className={styles.benefitText}>
                  <strong className={styles.benefitTitle}>अपनी पसंद का ब्रांड</strong>
                  <span className={styles.benefitDesc}>TATA, Adani, UTL और अन्य उपलब्ध विकल्प।</span>
                </div>
              </div>

              {/* CARD 3: Subsidy Assistance */}
              <div role="listitem" className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>
                  <span className={styles.benefitIcon}>🏛️</span>
                </div>
                <div className={styles.benefitText}>
                  <strong className={styles.benefitTitle}>सरकारी सब्सिडी सहायता</strong>
                  <span className={styles.benefitDesc}>पात्रता और सरकारी नियमों के अनुसार आवेदन सहायता।</span>
                </div>
              </div>
            </div>

            {/* Promotional Subsidy Card with Transparent Effective Cost */}
            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <span className={styles.offerTag}>पीएम सूर्य घर योजना</span>
                <span className={styles.warrantyTag}>🛡️ 25 साल तक सोलर पैनल वारंटी*</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>प्रभावी लागत</span>
                <div className={styles.priceValue}>
                  ₹0 <span className={styles.priceAsterisk}>तक*</span>
                </div>
                <span className={styles.subsidyNote}>₹78,000 तक केंद्रीय सब्सिडी लागू</span>
              </div>

              <p className={styles.offerDisclaimer}>
                * प्रभावी लागत ₹0 तक का अर्थ है कि लागू सरकारी सब्सिडी एवं ग्राहक की पात्रता के बाद अनुमानित प्रभावी लागत न्यूनतम अथवा शून्य तक हो सकती है। वास्तविक लागत व सब्सिडी स्वीकृति योजना की शर्तों एवं ग्राहक की श्रेणी पर निर्भर है।
              </p>
            </div>

            {/* Dual Primary CTAs + Direct Phone */}
            <div className={styles.ctaRow}>
              <button
                type="button"
                onClick={handleSurveyCta}
                className={styles.primaryCta}
              >
                <span>मुफ्त साइट सर्वे बुक करें</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button
                type="button"
                onClick={handleBrandsCta}
                className={styles.secondaryCta}
              >
                <span>ब्रांड और कीमत जानें</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>

            {/* Quick Contact & Trust Bar */}
            <div className={styles.quickContactBar}>
              <a
                href="tel:7906904706"
                onClick={handlePhoneCta}
                className={styles.phoneChip}
              >
                <span className={styles.phoneIcon} aria-hidden="true">📞</span>
                <span>कॉल: <strong>7906904706</strong></span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappCta}
                className={styles.whatsappChip}
              >
                <span className={styles.whatsappIcon} aria-hidden="true">💬</span>
                <span>WhatsApp पर पूछें</span>
              </a>

              <span className={styles.trustTag}>
                ✓ 100% निशुल्क साइट सर्वे
              </span>
            </div>
          </div>

          {/* Right Column: High-Quality Imagery & Live Stats Card */}
          <div className={styles.heroVisual}>
            <div className={styles.imageCard}>
              <div className={styles.imageContainer}>
                <Image
                  src="/solar/rooftop-installation.jpg"
                  alt="Uttar Pradesh Rooftop Solar Installation - TATA, Adani, UTL Systems"
                  width={640}
                  height={440}
                  priority
                  className={styles.heroImage}
                />
                <div className={styles.imageOverlayBadge}>
                  <span className={styles.overlayIcon} aria-hidden="true">☀️</span>
                  <div>
                    <strong>संपूर्ण रूफटॉप सोलर सिस्टम</strong>
                    <p>पैनल + इन्वर्टर + बैटरी बैकअप (पसंद अनुसार)</p>
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid under image */}
              <div className={styles.specsGrid}>
                <div className={styles.specCard}>
                  <span className={styles.specVal}>75</span>
                  <span className={styles.specUnit}>जिले</span>
                  <span className={styles.specDesc}>संपूर्ण उत्तर प्रदेश कवरेज</span>
                </div>
                <div className={styles.specCard}>
                  <span className={styles.specVal}>प्रमुख</span>
                  <span className={styles.specUnit}>ब्रांड्स</span>
                  <span className={styles.specDesc}>TATA, Adani, UTL विकल्प</span>
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
