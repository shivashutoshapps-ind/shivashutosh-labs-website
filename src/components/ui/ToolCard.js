/**
 * Tool Card Component
 * Used in category pages and homepage to display individual tool summaries.
 */
import Link from 'next/link';
import { TOOL_STATUS } from '@/data/tools';
import styles from './ToolCard.module.css';

const STATUS_LABELS = {
  [TOOL_STATUS.LIVE]: { hi: 'उपलब्ध', en: 'Live', cls: 'badge--live' },
  [TOOL_STATUS.BETA]: { hi: 'बीटा', en: 'Beta', cls: 'badge--beta' },
  [TOOL_STATUS.COMING_SOON]: { hi: 'जल्द आ रहा है', en: 'Coming Soon', cls: 'badge--coming-soon' },
};

/**
 * @param {{ tool: import('@/data/tools').ToolDefinition }} props
 */
export default function ToolCard({ tool }) {
  const statusInfo = STATUS_LABELS[tool.status] || STATUS_LABELS[TOOL_STATUS.COMING_SOON];
  const isComingSoon = tool.status === TOOL_STATUS.COMING_SOON;

  const Wrapper = isComingSoon ? 'div' : Link;
  const wrapperProps = isComingSoon
    ? { className: `${styles.card} ${styles.cardDisabled}` }
    : { href: `/${tool.slug}`, className: styles.card };

  return (
    <Wrapper {...wrapperProps} aria-label={`${tool.titleEn} — ${isComingSoon ? 'Coming soon' : 'Open tool'}`}>
      <div className={styles.header}>
        <ToolIcon slug={tool.slug} />
        <span className={`badge ${statusInfo.cls}`} lang={isComingSoon ? 'hi' : undefined}>
          {statusInfo.hi}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.titleHi} lang="hi">{tool.titleHi}</h3>
        <p className={styles.titleEn}>{tool.titleEn}</p>
        <p className={styles.desc} lang="hi">{tool.descriptionHi}</p>
      </div>
      {!isComingSoon && (
        <div className={styles.action} aria-hidden="true">
          <span className={styles.actionText}>खोलें →</span>
        </div>
      )}
    </Wrapper>
  );
}

/** Simple SVG icon selector based on tool slug pattern */
function ToolIcon({ slug }) {
  let icon = '📄';
  let colorClass = styles.iconContainerPurple;

  if (slug.includes('merge')) { icon = '🔗'; colorClass = styles.iconContainerBlue; }
  else if (slug.includes('split')) { icon = '✂️'; colorClass = styles.iconContainerBlue; }
  else if (slug.includes('compress') || slug.includes('kb') || slug.includes('mb')) { icon = '📦'; colorClass = styles.iconContainerOrange; }
  else if (slug.includes('word')) { icon = '📝'; colorClass = styles.iconContainerPurple; }
  else if (slug.includes('jpg') || slug.includes('image') || slug.includes('photo')) { icon = '🖼️'; colorClass = styles.iconContainerRed; }
  else if (slug.includes('editor')) { icon = '✏️'; colorClass = styles.iconContainerGreen; }
  else if (slug.includes('rotate')) { icon = '🔄'; colorClass = styles.iconContainerGreen; }
  else if (slug.includes('protect')) { icon = '🔒'; colorClass = styles.iconContainerPurple; }
  else if (slug.includes('unlock')) { icon = '🔓'; colorClass = styles.iconContainerPurple; }
  else if (slug.includes('watermark')) { icon = '💧'; colorClass = styles.iconContainerBlue; }
  else if (slug.includes('extract')) { icon = '📤'; colorClass = styles.iconContainerOrange; }
  else if (slug.includes('signature')) { icon = '✍️'; colorClass = styles.iconContainerGreen; }

  return (
    <div className={`${styles.iconContainer} ${colorClass}`} aria-hidden="true" title={slug}>
      <span className={styles.iconEmoji} role="img">{icon}</span>
    </div>
  );
}
