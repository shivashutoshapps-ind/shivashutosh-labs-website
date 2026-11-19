'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SolarHeader.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePhoneClick = () => {
    trackEvent('phone_call_click', { location: 'header' });
  };

  const navLinks = [
    { href: '#hero', label: 'होम' },
    { href: '#solar-brands', label: 'ब्रांड विकल्प' },
    { href: '#coverage', label: 'यूपी सेवा क्षेत्र' },
    { href: '#packages', label: 'सोलर पैकेज' },
    { href: '#subsidy', label: 'सरकारी सब्सिडी' },
    { href: '#why-us', label: 'विशेषताएं' },
    { href: '#faq', label: 'सवाल-जवाब' },
    { href: '#enquiry-form', label: 'मुफ्त साइट सर्वे' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Top Notification Bar with Statewide Service Highlight */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span className={styles.topBarTagline}>
            ☀️ &quot;हर घर सौर ऊर्जा, हर घर खुशहाली&quot; — संपूर्ण उत्तर प्रदेश में अधिकृत सोलर सेवाएँ
          </span>
          <div className={styles.topBarContact}>
            <a href="tel:7906904706" onClick={handlePhoneClick} className={styles.topBarPhone}>
              📞 <strong>7906904706</strong>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/solarsystem" className={styles.brand} aria-label="Shivashutosh Solar Agency Home">
            <div className={styles.logoBadge}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" fill="#F59E0B" stroke="#F59E0B" />
                <line x1="12" y1="1" x2="12" y2="3" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="12" y1="21" x2="12" y2="23" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="1" y1="12" x2="3" y2="12" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="21" y1="12" x2="23" y2="12" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#F59E0B" strokeWidth="2.5" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#F59E0B" strokeWidth="2.5" />
              </svg>
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandTitle}>शिवआशुतोष सोलर एजेंसी</span>
              <span className={styles.brandSub}>SHIVASHUTOSH SOLAR AGENCY</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav} aria-label="Solar Navigation">
            <ul className={styles.navList}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Call Now Button */}
          <div className={styles.headerCtaWrap}>
            <a
              href="tel:7906904706"
              onClick={handlePhoneClick}
              className={styles.callNowBtn}
              aria-label="Call Shivashutosh Solar Agency at 7906904706"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>कॉल करें: 7906904706</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={styles.menuBar}></span>
              <span className={styles.menuBar}></span>
              <span className={styles.menuBar}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileNotice}>
            <span className={styles.mobileNoticeBadge}>उत्तर प्रदेश अधिकृत सेवाएँ</span>
            <p>UPNEDA Empanelled Vendor: Radha Enterprises (Code: AGC2609282705) का अधिकृत चैनल पार्टनर</p>
          </div>
          <ul className={styles.mobileNavList}>
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  className={styles.mobileNavLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileCtaWrap}>
            <a
              href="tel:7906904706"
              onClick={handlePhoneClick}
              className={styles.mobileCallBtn}
            >
              📞 7906904706 पर कॉल करें
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
