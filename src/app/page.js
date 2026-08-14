/**
 * Shivashutosh Labs — Homepage
 *
 * Hero + tool categories + why-us + privacy note + FAQ.
 * All content is server-rendered for SEO.
 */
import Link from 'next/link';
import { buildHomeMetadata } from '@/lib/metadata';
import { categories } from '@/data/categories';
import { tools, TOOL_STATUS } from '@/data/tools';
import { homeFAQs } from '@/data/faqs';
import StructuredData, { buildFAQSchema, buildWebSiteSchema } from '@/components/seo/StructuredData';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ToolCard from '@/components/ui/ToolCard';
import styles from './page.module.css';

export const metadata = buildHomeMetadata();

// Popular tools shown on homepage
const popularTools = tools.filter((t) =>
  ['merge-pdf', 'compress-pdf', 'photo-20kb', 'photo-50kb', 'signature-20kb', 'jpg-to-pdf', 'pdf-to-jpg', 'split-pdf'].includes(t.slug)
);

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildFAQSchema(homeFAQs)} />

      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} aria-hidden="true"></span>
            <span lang="hi">Shivashutosh Labs</span>
          </div>

          <h1 id="hero-heading" className={styles.heroTitle}>
            <span className={styles.heroTitleHindi} lang="hi">
              सभी के लिए मुफ़्त PDF टूल्स
            </span>
            <span className={styles.heroTitleEnglish}>
              Free PDF, Image &amp; Form Tools
            </span>
          </h1>

          <p className={styles.heroSubtitle} lang="hi">
            PDF जोड़ें, विभाजित करें, कम्प्रेस करें। सरकारी फॉर्म के लिए फोटो साइज़ करें।
            कोई साइन-अप नहीं। मोबाइल पर काम करे।
          </p>
          <p className={styles.heroSubtitleEn}>
            Merge, split, compress PDFs. Resize photos for government forms.
            No signup. Works on mobile.
          </p>

          <div className={styles.heroActions}>
            <Link href="/tools" className="btn btn--primary btn--lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6M12 18v-6M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span lang="hi">सभी टूल्स देखें</span>
            </Link>
            <Link href="/form-tools" className="btn btn--ghost btn--lg">
              <span lang="hi">फॉर्म टूल्स</span>
            </Link>
          </div>

          <div className={styles.heroStats} role="list">
            <div role="listitem" className={styles.heroStat}>
              <span className={styles.heroStatNumber}>20</span>
              <span className={styles.heroStatLabel} lang="hi">टूल्स</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true"></div>
            <div role="listitem" className={styles.heroStat}>
              <span className={styles.heroStatNumber}>0₹</span>
              <span className={styles.heroStatLabel} lang="hi">बिल्कुल मुफ़्त</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true"></div>
            <div role="listitem" className={styles.heroStat}>
              <span className={styles.heroStatNumber}>📱</span>
              <span className={styles.heroStatLabel} lang="hi">मोबाइल फ्रेंडली</span>
            </div>
          </div>
        </div>

        {/* Hero decorative element */}
        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.heroDecorCard}>
            <div className={styles.heroDecorIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="#60A5FA" strokeWidth="1.5" fill="rgba(37,99,235,0.12)"/>
                <path d="M14 2v6h6" stroke="#60A5FA" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.heroDecorText}>
              <span lang="hi">PDF कम्प्रेस</span>
              <small>2.4 MB → 180 KB</small>
            </div>
            <div className={styles.heroDecorCheck} aria-label="सफल">✓</div>
          </div>
          <div className={`${styles.heroDecorCard} ${styles.heroDecorCardAlt}`}>
            <div className={styles.heroDecorIcon}>
              <span style={{fontSize:'24px'}}>📷</span>
            </div>
            <div className={styles.heroDecorText}>
              <span lang="hi">फोटो 20KB</span>
              <small>फॉर्म के लिए तैयार</small>
            </div>
            <div className={styles.heroDecorCheck} aria-label="सफल">✓</div>
          </div>
        </div>
      </section>

      {/* ─── Popular Tools ─────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="popular-tools-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">लोकप्रिय</p>
            <h2 id="popular-tools-heading" className="section-header__title" lang="hi">
              सबसे ज़्यादा उपयोग होने वाले टूल्स
            </h2>
            <p className="section-header__subtitle">
              Most used tools by students, professionals, and cyber café users across India.
            </p>
          </div>
          <div className="grid-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tool Categories ──────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">सभी टूल्स</p>
            <h2 id="categories-heading" className="section-header__title" lang="hi">
              टूल्स की श्रेणियाँ
            </h2>
            <p className="section-header__subtitle">
              All tool categories — from PDF editing to government form document preparation.
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
      </section>

      {/* ─── Why SLabs AI PDF ─────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">हमारी खासियत</p>
            <h2 id="why-heading" className="section-header__title" lang="hi">
              Shivashutosh Labs क्यों चुनें?
            </h2>
            <p className="section-header__subtitle">
              Built for Indian users — simple, fast, and accessible even on slow connections.
            </p>
          </div>
          <div className="grid-3">
            {whyFeatures.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                <h3 className={styles.featureTitle} lang="hi">{f.titleHi}</h3>
                <p className={styles.featureTitleEn}>{f.title}</p>
                <p className={styles.featureDesc} lang="hi">{f.descHi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Privacy Note ─────────────────────────────────────────────────────── */}
      <section className={styles.privacySection} aria-labelledby="privacy-heading">
        <div className="container">
          <div className={styles.privacyCard}>
            <div className={styles.privacyIcon} aria-hidden="true">🔒</div>
            <div className={styles.privacyContent}>
              <h2 id="privacy-heading" className={styles.privacyTitle} lang="hi">
                आपकी गोपनीयता हमारी प्राथमिकता है
              </h2>
              <p className={styles.privacyText} lang="hi">
                हम आपके दस्तावेज़ों को सुरक्षित रखने की दिशा में काम कर रहे हैं।
                हमारा लक्ष्य है कि भविष्य में फाइलें आपके डिवाइस पर ही प्रोसेस हों।
              </p>
              <p className={styles.privacyTextEn}>
                We are building toward a privacy-first architecture where document processing
                happens locally in your browser. Your trust is important to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">सामान्य प्रश्न</p>
            <h2 id="faq-heading" className="section-header__title" lang="hi">
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
          </div>
          <div className={styles.faqWrapper}>
            <FAQAccordion faqs={homeFAQs} />
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 id="cta-heading" className={styles.ctaTitle} lang="hi">
              अभी शुरू करें — बिल्कुल मुफ़्त
            </h2>
            <p className={styles.ctaSubtitle}>
              No signup. No watermark. No tricks. Just useful tools.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/tools" className="btn btn--accent btn--lg">
                <span lang="hi">सभी टूल्स देखें</span>
              </Link>
              <Link href="/form-tools" className="btn btn--outline btn--lg" style={{color:'white', borderColor:'rgba(255,255,255,0.4)'}}>
                <span lang="hi">फॉर्म टूल्स देखें</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Inline Category Icon component ──────────────────────────────────────────
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

// ─── Why features data ───────────────────────────────────────────────────────
const whyFeatures = [
  {
    icon: '⚡',
    title: 'Fast & Lightweight',
    titleHi: 'तेज़ और हल्का',
    descHi: 'धीमे इंटरनेट पर भी तेज़ी से काम करता है। बड़े बंडल नहीं।',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    titleHi: 'मोबाइल फ्रेंडली',
    descHi: 'मोबाइल, टैबलेट और डेस्कटॉप — सभी पर बढ़िया काम करता है।',
  },
  {
    icon: '🆓',
    title: 'Completely Free',
    titleHi: 'बिल्कुल मुफ़्त',
    descHi: 'कोई छिपे हुए शुल्क नहीं। कोई वॉटरमार्क नहीं। कोई ट्रिक नहीं।',
  },
  {
    icon: '🔐',
    title: 'Privacy Focused',
    titleHi: 'गोपनीयता महत्वपूर्ण',
    descHi: 'हम ब्राउज़र-साइड प्रोसेसिंग की दिशा में काम कर रहे हैं।',
  },
  {
    icon: '🇮🇳',
    title: 'Made for India',
    titleHi: 'भारत के लिए',
    descHi: 'हिंदी इंटरफेस। सरकारी फॉर्म के लिए विशेष टूल्स।',
  },
  {
    icon: '♿',
    title: 'Accessible',
    titleHi: 'सुलभ',
    descHi: 'बड़े टच टारगेट। कीबोर्ड सुलभ। स्क्रीन रीडर समर्थन।',
  },
];
