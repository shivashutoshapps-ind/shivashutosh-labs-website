'use client';

/**
 * Shivashutosh Labs — Site Header
 *
 * Sticky top navigation with logo, category links, and mobile menu.
 */
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
  { href: '/tools', labelEn: 'Tools', labelHi: 'टूल्स' },
  { href: '/guides', labelEn: 'Guides', labelHi: 'गाइड' },
  { href: '/about', labelEn: 'About', labelHi: 'हमारे बारे में' },
  { href: '/contact', labelEn: 'Contact', labelHi: 'संपर्क' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Shivashutosh Labs - होम">
          <svg
            className={styles.logoIcon}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="32"
            height="32"
          >
            <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
            <path d="M8 10h10a6 6 0 0 1 0 12H8V10Z" fill="white" fillOpacity="0.9" />
            <path d="M12 14h6a2 2 0 0 1 0 4h-6v-4Z" fill="url(#logoGrad)" />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06B6D4" />
                <stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>Shivashutosh</span>
            <span className={styles.logoSub}>Labs</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  <span className={styles.navHindi} lang="hi">{link.labelHi}</span>
                  <span className={styles.navEnglish}>{link.labelEn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.menuToggleOpen : ''}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? "Menu बंद करें" : "Menu खोलें"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Nav Drawer */}
        <div 
          id="mobile-nav"
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`} 
          aria-label="Mobile navigation"
        >
          <nav>
            <ul className={styles.mobileNavList} role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={styles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span lang="hi">{link.labelHi}</span>
                    <span className={styles.mobileNavEnglish}>{link.labelEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
