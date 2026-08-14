import { buildBaseMetadata } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = buildBaseMetadata({
  title: 'Contact - Shivashutosh Labs',
  description: 'Contact Shivashutosh Labs for general inquiries, technical issues, or partnerships.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main id="main-content" className="container section">
      <div className="prose" style={{ margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>
          Have a question or feedback? We'd love to hear from you.
        </p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconContainerPurple}>
              <span className={styles.iconEmoji} role="img" aria-hidden="true">💬</span>
            </div>
            <h3>General Inquiry</h3>
            <p>Questions about Shivashutosh Labs or our tools.</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.iconContainerRed}>
              <span className={styles.iconEmoji} role="img" aria-hidden="true">🔧</span>
            </div>
            <h3>Technical Issue</h3>
            <p>Report a bug or an issue with SLabs AI PDF.</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.iconContainerBlue}>
              <span className={styles.iconEmoji} role="img" aria-hidden="true">💡</span>
            </div>
            <h3>Tool Feedback</h3>
            <p>Suggest new features or improvements.</p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.iconContainerGreen}>
              <span className={styles.iconEmoji} role="img" aria-hidden="true">🤝</span>
            </div>
            <h3>Partnership</h3>
            <p>Business inquiries and partnership opportunities.</p>
          </div>
        </div>

        <div className={styles.emailBlock}>
          <p>Please email us at:</p>
          <a href="mailto:shivashutosh.apps@gmail.com" style={{ textDecoration: 'none' }}>
            <code>shivashutosh.apps@gmail.com</code>
          </a>
        </div>
      </div>
    </main>
  );
}
