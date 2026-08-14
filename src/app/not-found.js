/**
 * SLabs AI PDF — 404 Not Found Page
 *
 * Custom 404 page with helpful navigation back to tools.
 * Must be named not-found.js in Next.js App Router.
 */
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'पृष्ठ नहीं मिला (404) | Shivashutosh Labs',
  description: 'यह पेज मौजूद नहीं है। हमारे PDF और फॉर्म टूल्स देखें।',
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.code} aria-hidden="true">404</div>
        <h1 className={styles.title} lang="hi">पेज नहीं मिला</h1>
        <p className={styles.subtitle}>Page Not Found</p>
        <p className={styles.desc} lang="hi">
          आप जिस पेज को खोज रहे हैं वह उपलब्ध नहीं है या हटा दिया गया है।
        </p>
        <p className={styles.descEn}>
          The page you are looking for does not exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btn--primary">
            <span lang="hi">होम पर जाएं</span>
          </Link>
          <Link href="/tools" className="btn btn--ghost">
            <span lang="hi">सभी टूल्स देखें (All Tools)</span>
          </Link>
        </div>

        <nav className={styles.quickLinks} aria-label="Quick links">
          <h2 className={styles.quickTitle} lang="hi">यहाँ जाएं:</h2>
          <ul className={styles.quickList} role="list">
            <li><Link href="/merge-pdf" lang="hi">PDF जोड़ें</Link></li>
            <li><Link href="/compress-pdf" lang="hi">PDF साइज़ कम करें</Link></li>
            <li><Link href="/photo-20kb" lang="hi">फोटो 20KB</Link></li>
            <li><Link href="/signature-20kb" lang="hi">हस्ताक्षर 20KB</Link></li>
            <li><Link href="/form-tools" lang="hi">फॉर्म टूल्स</Link></li>
            <li><Link href="/guides" lang="hi">गाइड</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
