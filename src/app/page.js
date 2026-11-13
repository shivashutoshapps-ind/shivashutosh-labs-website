/**
 * Shivashutosh Labs — Homepage
 *
 * Full-width premium SaaS landing page for PDF, Image, Form Tools & Calculators.
 * All content is server-rendered for optimal performance and SEO.
 */
import Link from 'next/link';
import { buildHomeMetadata } from '@/lib/metadata';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { homeFAQs } from '@/data/faqs';
import StructuredData, { buildFAQSchema } from '@/components/seo/StructuredData';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ToolCard from '@/components/ui/ToolCard';
import styles from './page.module.css';

export const metadata = buildHomeMetadata();

// Top popular tools shown in first grid
const popularTools = tools.filter((t) =>
  ['merge-pdf', 'compress-pdf', 'photo-20kb', 'signature-20kb', 'pdf-to-word', 'jpg-to-pdf', 'pdf-to-jpg', 'split-pdf'].includes(t.slug)
);

// Core PDF tools showcase
const pdfSuiteTools = tools.filter((t) =>
  ['merge-pdf', 'compress-pdf', 'pdf-to-word', 'split-pdf', 'jpg-to-pdf', 'pdf-editor', 'pdf-to-jpg', 'watermark-pdf'].includes(t.slug)
);

// Government form & image optimization tools
const formAndImageTools = tools.filter((t) =>
  ['photo-20kb', 'signature-20kb', 'photo-50kb', 'photo-100kb', 'pdf-100kb', 'image-compressor', 'resize-image', 'pdf-200kb'].includes(t.slug)
);

// Financial & utility calculators
const calculatorTools = tools.filter((t) => t.category === 'calculators');

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildFAQSchema(homeFAQs)} />

      {/* ─── Hero Section (Full-Width Viewport SaaS) ─────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBackdropGrid} aria-hidden="true" />
        <div className={styles.heroOrb1} aria-hidden="true" />
        <div className={styles.heroOrb2} aria-hidden="true" />

        <div className={styles.heroContainer}>
          {/* Left Column: Headlines, copy, CTAs, authentic metrics */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} aria-hidden="true" />
              <span>Shivashutosh Labs • 100% मुफ़्त एवं सुरक्षित वेब टूल्स</span>
            </div>

            <h1 id="hero-heading" className={styles.heroTitle}>
              <span className={styles.heroTitleHindi} lang="hi">
                सभी के लिए मुफ्त PDF और Image Tools
              </span>
              <span className={styles.heroTitleEnglish}>
                Fast, In-Browser &amp; Privacy-First Document Suite
              </span>
            </h1>

            <p className={styles.heroSubtitle} lang="hi">
              PDF एडिट करें, फाइलें कन्वर्ट करें, फोटो और सिग्नेचर तैयार करें। सरकारी फॉर्म भरने के लिए जरूरी सभी टूल्स एक ही जगह।
            </p>
            <p className={styles.heroSubtitleEn}>
              Merge, split &amp; compress PDFs. Resize photos and signatures for SSC, UPSC and state government exam portals. No signup, no watermarks, completely free.
            </p>

            {/* CTAs */}
            <div className={styles.heroActions}>
              <Link href="/tools" className={styles.btnPrimary}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M12 18v-6M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span lang="hi">सभी टूल्स देखें</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/about" className={styles.btnSecondary}>
                <span lang="hi">हमारे बारे में</span>
              </Link>
            </div>

            {/* Quick Navigation Jump Pills */}
            <div className={styles.quickNavRow}>
              <span className={styles.quickNavLabel} lang="hi">त्वरित नेविगेशन:</span>
              <a href="#popular-tools" className={styles.quickNavPill}>⚡ लोकप्रिय</a>
              <a href="#pdf-tools" className={styles.quickNavPill}>📄 PDF टूल्स</a>
              <a href="#form-tools" className={styles.quickNavPill}>📋 सरकारी फॉर्म</a>
              <a href="#calculators" className={styles.quickNavPill}>🧮 कैलकुलेटर</a>
            </div>

            {/* Authentic Statistics / Trust Bar */}
            <div className={styles.heroStats} role="list">
              <div role="listitem" className={styles.heroStatItem}>
                <span className={styles.heroStatNumber}>30+</span>
                <span className={styles.heroStatLabel} lang="hi">टूल्स उपलब्ध</span>
              </div>
              <div role="listitem" className={styles.heroStatItem}>
                <span className={styles.heroStatNumber}>0₹</span>
                <span className={styles.heroStatLabel} lang="hi">बिल्कुल मुफ़्त</span>
              </div>
              <div role="listitem" className={styles.heroStatItem}>
                <span className={styles.heroStatNumber}>100%</span>
                <span className={styles.heroStatLabel} lang="hi">ब्राउज़र प्राइवेसी</span>
              </div>
              <div role="listitem" className={styles.heroStatItem}>
                <span className={styles.heroStatNumber}>⚡ Instant</span>
                <span className={styles.heroStatLabel} lang="hi">नो साइन-अप</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom SaaS Studio Showcase */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.studioWindow}>
              {/* Studio Window Header */}
              <div className={styles.studioHeader}>
                <div className={styles.studioDots}>
                  <span className={styles.studioDotRed} />
                  <span className={styles.studioDotYellow} />
                  <span className={styles.studioDotGreen} />
                </div>
                <span className={styles.studioTitle}>Shivashutosh Labs • लाइव डेमो पूर्वावलोकन (Preview)</span>
                <span className={styles.studioStatusBadge}>
                  <span className={styles.studioStatusDot} />
                  डेमो उदाहरण
                </span>
              </div>

              {/* Module 1: Live PDF Compression Simulation (Demo) */}
              <div className={styles.studioModule}>
                <div className={styles.studioModuleTop}>
                  <div className={styles.fileMeta}>
                    <div className={styles.fileIconPdf}>📄</div>
                    <div className={styles.fileDetails}>
                      <span className={styles.fileName}>Application_Form_2026.pdf <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(डेमो फाइल)</span></span>
                      <span className={styles.fileSub}>उदाहरण परिणाम: 4.8 MB → 340 KB</span>
                    </div>
                  </div>
                  <span className={styles.compressionBadge}>-93% साइज़ कम</span>
                </div>
                <div className={styles.compressionTrack}>
                  <div className={styles.compressionFill} />
                </div>
                <div className={styles.compressionFooter}>
                  <span>कम्प्रेशन डेमो सिमुलेशन</span>
                  <span className={styles.compressionStatus}>✓ पोर्टल अपलोड के लिए तैयार</span>
                </div>
              </div>

              {/* Module 2: Government Exam Photo & Signature Optimizer */}
              <div className={styles.studioSplitGrid}>
                <div className={styles.miniCard}>
                  <div className={styles.miniIconPhoto}>👤</div>
                  <div className={styles.miniText}>
                    <span className={styles.miniTitle}>पासपोर्ट फोटो (उदा. 20 KB)</span>
                    <span className={styles.miniMeta}>✓ SSC / UPSC स्वीकृत</span>
                  </div>
                </div>

                <div className={styles.miniCard}>
                  <div className={styles.miniIconSign}>✍️</div>
                  <div className={styles.miniText}>
                    <span className={styles.miniTitle}>हस्ताक्षर (उदा. 15 KB)</span>
                    <span className={styles.miniMeta}>✓ 140 × 60 px फिट</span>
                  </div>
                </div>
              </div>

              {/* Module 3: PDF to Word / Format Converter */}
              <div className={styles.studioConvertRow}>
                <div className={styles.convertFlow}>
                  <span className={styles.convertChip}>PDF File</span>
                  <span className={styles.convertArrow}>⇄</span>
                  <span className={styles.convertChip}>Word DOCX</span>
                  <span className={styles.convertArrow}>•</span>
                  <span className={styles.convertChip}>JPG ⇄ PDF</span>
                </div>
                <span className={styles.convertSpeed}>⚡ 1.2s Fast</span>
              </div>

              {/* Bottom Trust Badge */}
              <div className={styles.studioTrustBadge}>
                <span className={styles.trustShield}>🔒 100% क्लाइंट-साइड सुरक्षा</span>
                <span>• फाइलें सीधे आपके डिवाइस पर प्रोसेस होती हैं</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 1. Popular Tools Section ─────────────────────────────────────────── */}
      <section id="popular-tools" className={styles.section} aria-labelledby="popular-tools-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>⚡ सबसे लोकप्रिय</span>
            <h2 id="popular-tools-heading" className={styles.sectionTitle} lang="hi">
              सबसे ज़्यादा उपयोग होने वाले टूल्स
            </h2>
            <p className={styles.sectionSubtitle}>
              छात्रों, साइबर कैफे ऑपरेटरों और प्रोफेशनल्स द्वारा प्रतिदिन उपयोग किए जाने वाले शीर्ष टूल्स।
            </p>
          </div>
          <div className="grid-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. PDF Tools Suite Section ───────────────────────────────────────── */}
      <section id="pdf-tools" className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="pdf-tools-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>📄 PDF टूल्स सुइट</span>
            <h2 id="pdf-tools-heading" className={styles.sectionTitle} lang="hi">
              शक्तिशाली और मुफ़्त PDF टूल्स
            </h2>
            <p className={styles.sectionSubtitle}>
              PDF फाइलों को जोड़ें, छोटा करें, पेज अलग करें, Word में बदलें और वॉटरमार्क जोड़ें — बिना किसी सीमा या वॉटरमार्क के।
            </p>
          </div>
          <div className="grid-4">
            {pdfSuiteTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className={styles.sectionActionRow}>
            <Link href="/pdf-tools" className={styles.sectionActionLink}>
              <span>सभी PDF टूल्स देखें (10+ टूल्स)</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. Government Form & Image Tools Section ─────────────────────────── */}
      <section id="form-tools" className={styles.section} aria-labelledby="form-tools-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>📋 सरकारी फॉर्म टूल्स</span>
            <h2 id="form-tools-heading" className={styles.sectionTitle} lang="hi">
              सरकारी भर्ती फॉर्म हेतु फोटो, साइन व इमेज टूल्स
            </h2>
            <p className={styles.sectionSubtitle}>
              SSC, UPSC, रेलवे, पुलिस भर्ती एवं प्रतियोगी परीक्षाओं के लिए 20KB, 50KB, 100KB साइज में फोटो और हस्ताक्षर तुरंत तैयार करें।
            </p>
          </div>
          <div className="grid-4">
            {formAndImageTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className={styles.sectionActionRow}>
            <Link href="/form-tools" className={styles.sectionActionLink}>
              <span>सभी सरकारी फॉर्म टूल्स देखें</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. Useful Calculators Section ────────────────────────────────────── */}
      <section id="calculators" className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="calculators-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>🧮 ऑनलाइन कैलकुलेटर</span>
            <h2 id="calculators-heading" className={styles.sectionTitle} lang="hi">
              उपयोगी कैलकुलेटर
            </h2>
            <p className={styles.sectionSubtitle}>
              आयु (Age), होम व पर्सनल लोन EMI, GST, SIP निवेश और प्रतिशत की सरल, त्वरित और सटीक गणना करें।
            </p>
          </div>
          <div className="grid-4">
            {calculatorTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className={styles.sectionActionRow}>
            <Link href="/calculators" className={styles.sectionActionLink}>
              <span>सभी कैलकुलेटर देखें</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. Tool Categories Explorer ──────────────────────────────────────── */}
      <section id="categories" className={styles.section} aria-labelledby="categories-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>📂 सभी श्रेणियाँ</span>
            <h2 id="categories-heading" className={styles.sectionTitle} lang="hi">
              टूल्स की श्रेणियाँ
            </h2>
            <p className={styles.sectionSubtitle}>
              अपनी आवश्यकतानुसार श्रेणी चुनें — PDF एडिटिंग से लेकर सरकारी परीक्षा फॉर्म दस्तावेज़ तक।
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

      {/* ─── 6. Why Choose Shivashutosh Labs ──────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>🌟 हमारी विशेषता</span>
            <h2 id="why-heading" className={styles.sectionTitle} lang="hi">
              Shivashutosh Labs क्यों चुनें?
            </h2>
            <p className={styles.sectionSubtitle}>
              भारतीय उपयोगकर्ताओं, छात्रों और साइबर कैफे के लिए विशेष रूप से डिज़ाइन किया गया हल्का और तेज़ प्लेटफ़ॉर्म।
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

      {/* ─── 7. Privacy & Security Note ───────────────────────────────────────── */}
      <section className={styles.privacySection} aria-labelledby="privacy-heading">
        <div className="container">
          <div className={styles.privacyCard}>
            <div className={styles.privacyIcon} aria-hidden="true">🔒</div>
            <div className={styles.privacyContent}>
              <h2 id="privacy-heading" className={styles.privacyTitle} lang="hi">
                आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है
              </h2>
              <p className={styles.privacyText} lang="hi">
                हम आपके दस्तावेज़ों और व्यक्तिगत डेटा को पूर्णतः सुरक्षित रखने के लिए प्रतिबद्ध हैं। हमारे टूल्स इन-ब्राउज़र प्रोसेसिंग तकनीक पर काम करते हैं, जिससे आपकी फाइलें किसी अनधिकृत सर्वर पर अपलोड नहीं होतीं।
              </p>
              <p className={styles.privacyTextEn}>
                We prioritize client-side in-browser processing wherever technically possible. Your files remain on your device and are never sold, retained, or tracked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. Frequently Asked Questions ────────────────────────────────────── */}
      <section id="faqs" className={styles.section} aria-labelledby="faq-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrowBadge}>❓ सामान्य प्रश्न</span>
            <h2 id="faq-heading" className={styles.sectionTitle} lang="hi">
              अक्सर पूछे जाने वाले प्रश्न (FAQs)
            </h2>
            <p className={styles.sectionSubtitle}>
              Shivashutosh Labs के टूल्स और उनकी कार्यप्रणाली से जुड़े मुख्य सवाल और जवाब।
            </p>
          </div>
          <div className={styles.faqWrapper}>
            <FAQAccordion faqs={homeFAQs} />
          </div>
        </div>
      </section>

      {/* ─── 9. Final Action Banner ───────────────────────────────────────────── */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 id="cta-heading" className={styles.ctaTitle} lang="hi">
              अभी शुरू करें — 100% मुफ़्त और सुरक्षित
            </h2>
            <p className={styles.ctaSubtitle}>
              बिना किसी साइन-अप, बिना किसी वॉटरमार्क और बिना किसी शुल्क के तुरंत काम शुरू करें।
            </p>
            <div className={styles.ctaActions}>
              <Link href="/tools" className={styles.btnPrimary} style={{ background: '#FFFFFF', color: '#1E40AF' }}>
                <span lang="hi">सभी टूल्स एक्सप्लोर करें</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/form-tools" className={styles.btnSecondary} style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
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
    titleHi: 'अल्ट्रा-फास्ट और हल्का',
    descHi: 'धीमे 3G/4G इंटरनेट पर भी तुरंत लोड होता है। किसी बड़े सॉफ्टवेयर डाउनलोड की आवश्यकता नहीं।',
  },
  {
    icon: '📱',
    title: 'Mobile First & Responsive',
    titleHi: 'मोबाइल फ्रेंडली डिज़ाइन',
    descHi: 'मोबाइल, टैबलेट, लैपटॉप और डेस्कटॉप — सभी स्क्रीन साइज़ पर आसान और सुगम संचालन।',
  },
  {
    icon: '🆓',
    title: '100% Free Forever',
    titleHi: 'आजीवन 100% मुफ़्त',
    descHi: 'कोई छिपे हुए चार्ज नहीं, कोई वॉटरमार्क नहीं और कोई क्रेडिट कार्ड विवरण की जरूरत नहीं।',
  },
  {
    icon: '🔐',
    title: 'Privacy Focused',
    titleHi: 'ब्राउज़र-साइड प्राइवेसी',
    descHi: 'फाइलें सीधे आपके वेब ब्राउज़र में प्रोसेस होती हैं और किसी सर्वर पर स्टोर नहीं की जातीं।',
  },
  {
    icon: '🇮🇳',
    title: 'Tailored for India',
    titleHi: 'भारतीय आवश्यकताओं के अनुरूप',
    descHi: 'हिंदी इंटरफेस। SSC, UPSC, राज्य पुलिस व बोर्ड परीक्षा फॉर्म्स के सटीक फॉर्मेट टूल्स।',
  },
  {
    icon: '♿',
    title: 'Accessible & Simple',
    titleHi: 'सुलभ और उपयोग में आसान',
    descHi: 'सरल हिंदी भाषा, बड़े टच बटन और वॉइस असिस्टेंट की मदद से कोई भी आसानी से उपयोग कर सकता है।',
  },
];
