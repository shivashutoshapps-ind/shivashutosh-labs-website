/**
 * SLabs AI PDF — Breadcrumb Component
 *
 * Renders a semantic, accessible breadcrumb navigation.
 * Pairs with buildBreadcrumbSchema() for JSON-LD structured data.
 */
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

/**
 * @param {{
 *   items: { label: string; href: string }[];
 * }} props
 */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol className={styles.list} itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.href}
              className={styles.item}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className={styles.current}
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={styles.link} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className={styles.separator} aria-hidden="true">›</span>
                </>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
