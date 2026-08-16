'use client';

/**
 * FAQ Accordion Component
 * Interactive accordion that expands/collapses FAQ items.
 * Uses the native HTML <details>/<summary> elements for zero-JS fallback.
 */
import styles from './FAQAccordion.module.css';

/**
 * @param {{
 *   faqs: Array<{ q: string; a: string; qEn?: string; aEn?: string }>;
 * }} props
 */
export default function FAQAccordion({ faqs }) {
  return (
    <div className={styles.accordion}>
      {faqs.map((faq, i) => {
        const qText = faq.q || faq.question;
        const aText = faq.a || faq.answer;
        return (
          <details key={i} className={styles.item} name="faq-group">
            <summary className={styles.summary}>
              <span className={styles.questionHi} lang="hi">{qText}</span>
              {faq.qEn && (
                <span className={styles.questionEn}>{faq.qEn}</span>
              )}
              <span className={styles.icon} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </summary>
            <div className={styles.answer}>
              <p lang="hi">{aText}</p>
              {faq.aEn && <p className={styles.answerEn}>{faq.aEn}</p>}
            </div>
          </details>
        );
      })}
    </div>
  );
}
