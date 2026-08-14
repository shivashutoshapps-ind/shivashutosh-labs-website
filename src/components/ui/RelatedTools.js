/**
 * Related Tools Component
 */
import Link from 'next/link';
import { TOOL_STATUS } from '@/data/tools';
import styles from './RelatedTools.module.css';

export default function RelatedTools({ tools }) {
  return (
    <div className={styles.grid}>
      {tools.map((tool) => {
        const isComingSoon = tool.status === TOOL_STATUS.COMING_SOON;
        const Wrapper = isComingSoon ? 'div' : Link;
        const props = isComingSoon
          ? { className: `${styles.item} ${styles.itemDisabled}` }
          : { href: `/${tool.slug}`, className: styles.item };

        return (
          <Wrapper key={tool.slug} {...props}>
            <span className={styles.titleHi} lang="hi">{tool.titleHi}</span>
            <span className={styles.titleEn}>{tool.titleEn}</span>
            {!isComingSoon && <span className={styles.arrow} aria-hidden="true">→</span>}
          </Wrapper>
        );
      })}
    </div>
  );
}
