/**
 * Category Page Template — Reusable for all 6 category pages.
 */
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ToolCard from '@/components/ui/ToolCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';
import styles from './CategoryPage.module.css';

/**
 * @param {{
 *   category: object,
 *   tools: object[],
 *   faqs: object[],
 *   description?: string,
 * }} props
 */
export default function CategoryPageTemplate({ category, tools, faqs, description }) {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: category.titleHi, href: `/${category.slug}` },
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    ...(faqs.length > 0 ? [buildFAQSchema(faqs)] : []),
  ];

  return (
    <>
      <StructuredData data={structuredData} />

      {/* Category Hero */}
      <section
        className={styles.hero}
        style={{ '--cat-color': category.color, '--cat-gradient': category.gradient }}
        aria-labelledby="category-heading"
      >
        <div className={styles.heroInner}>
          <Breadcrumb items={breadcrumbItems} />
          <h1 id="category-heading" className={styles.heroTitle} lang="hi">
            {category.titleHi}
          </h1>
          <p className={styles.heroTitleEn}>{category.titleEn}</p>
          <p className={styles.heroDesc} lang="hi">{category.descriptionHi}</p>
          <p className={styles.heroDescEn}>{category.descriptionEn}</p>
          {description && (
            <p className={styles.heroExtra} lang="hi">{description}</p>
          )}
        </div>
      </section>

      {/* Tools Grid */}
      <section className={styles.toolsSection} aria-labelledby="tools-heading">
        <div className={styles.container}>
          <h2 id="tools-heading" className={styles.sectionTitle} lang="hi">
            सभी {category.titleHi}
          </h2>
          {tools.length > 0 ? (
            <div className="grid-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p lang="hi">जल्द ही टूल्स जोड़े जाएंगे।</p>
              <p>Tools will be added soon. Check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.container}>
            <h2 id="faq-heading" className={styles.sectionTitle} lang="hi">
              सामान्य प्रश्न
            </h2>
            <div className={styles.faqWrapper}>
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className={styles.backSection}>
        <div className={styles.container}>
          <Link href="/" className="btn btn--ghost">
            ← <span lang="hi">होम पर वापस जाएं</span>
          </Link>
        </div>
      </div>
    </>
  );
}
