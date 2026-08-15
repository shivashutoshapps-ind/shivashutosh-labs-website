import Link from 'next/link';
import { categories } from '@/data/categories';
import styles from './page.module.css';

import { buildBaseMetadata } from '@/lib/metadata';

export const metadata = buildBaseMetadata({
  title: 'सभी टूल्स (All Tools) | Shivashutosh Labs',
  description: 'Shivashutosh Labs के सभी उपयोगी टूल्स — PDF, इमेज, फॉर्म, और छात्र टूल्स। All utility tools in one place.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-12) 0' }}>
      <div className="section-header">
        <h1 className="section-header__title" lang="hi">
          टूल्स की श्रेणियाँ
        </h1>
        <p className="section-header__subtitle">
          Explore all our utility tools designed to make your daily tasks easier.
        </p>
      </div>
      
      <div className="grid-3">
        {categories.map((cat) => (
          <Link key={cat.slug} href={cat.href} className={styles.categoryCard}>
            <div
              className={styles.categoryIcon}
              style={{ background: `${cat.color}18`, border: `1.5px solid ${cat.color}33` }}
              aria-hidden="true"
            >
              <CategoryIcon name={cat.icon} color={cat.color} />
            </div>
            <div className={styles.categoryContent}>
              <h3 className={styles.categoryTitle} lang="hi">{cat.titleHi}</h3>
              <p className={styles.categoryTitleEn}>{cat.titleEn}</p>
              <p className={styles.categoryDesc} lang="hi">{cat.descriptionHi}</p>
            </div>
            <span className={styles.categoryArrow} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoryIcon({ name, color }) {
  const icons = {
    pdf: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke={color} strokeWidth="1.5" fill="transparent"/>
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    image: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill={color}/>
        <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    form: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke={color} strokeWidth="1.5"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M9 12h6M9 16h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    student: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 14l9-5-9-5-9 5 9 5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 14v6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.8 12v5.4a7 7 0 0 0 12.4 0V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    cafe: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
        <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    guide: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
  };
  return icons[name] || null;
}
