/**
 * Shivashutosh Labs — Site Footer
 */
import Link from 'next/link';
import styles from './Footer.module.css';

const footerSections = [
  {
    titleHi: 'उपयोगी लिंक',
    titleEn: 'Useful Links',
    links: [
      { href: '/tools', labelHi: 'सभी टूल्स', labelEn: 'Tools' },
      { href: '/guides', labelHi: 'गाइड', labelEn: 'Guides' },
      { href: '/about', labelHi: 'हमारे बारे में', labelEn: 'About Us' },
      { href: '/contact', labelHi: 'संपर्क', labelEn: 'Contact' },
    ],
  },
  {
    titleHi: 'टूल्स और प्रोडक्ट्स',
    titleEn: 'Tools & Products',
    links: [
      { href: '/pdf-tools', labelHi: 'SLabs AI PDF', labelEn: 'SLabs AI PDF' },
      { href: '/image-tools', labelHi: 'इमेज टूल्स', labelEn: 'Image Tools' },
      { href: '/form-tools', labelHi: 'फॉर्म टूल्स', labelEn: 'Form Tools' },
      { href: '/student-tools', labelHi: 'छात्र टूल्स', labelEn: 'Student Tools' },
    ],
  },
  {
    titleHi: 'कानूनी',
    titleEn: 'Legal',
    links: [
      { href: '/privacy', labelHi: 'गोपनीयता नीति', labelEn: 'Privacy Policy' },
      { href: '/terms', labelHi: 'उपयोग की शर्तें', labelEn: 'Terms of Use' },
    ],
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Brand block */}
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLogo} aria-label="Shivashutosh Labs होम">
            <span className={styles.brandMain}>Shivashutosh Labs</span>
          </Link>
          <p className={styles.brandTagline} lang="hi">
            सभी के लिए मुफ़्त PDF, इमेज और फॉर्म टूल्स
          </p>
          <p className={styles.brandTaglineEn}>
            Free PDF, Image &amp; Form Tools for Everyone
          </p>
          <p className={styles.brandParent}>
            by{' '}
            <strong>Shivashutosh Labs</strong>
          </p>
        </div>

        {/* Link sections */}
        <nav className={styles.links} aria-label="Footer navigation">
          {footerSections.map((section) => (
            <div key={section.titleEn} className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span lang="hi">{section.titleHi}</span>
                <span className={styles.sectionTitleEn}>{section.titleEn}</span>
              </h3>
              <ul className={styles.linkList} role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      <span lang="hi">{link.labelHi}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {currentYear} Shivashutosh Labs. सर्वाधिकार सुरक्षित।
          </p>
          <div className={styles.legal}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
