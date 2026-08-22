/**
 * SLabs AI PDF — ToolPage Template
 *
 * Reusable template for all standard PDF/Image tool pages.
 * Contains: breadcrumb, H1, intro, status notice, benefits, how-to, FAQ, related tools.
 */
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JpgToPdfTool from '@/components/tools/JpgToPdfTool';
import CompressPdfTool from '@/components/tools/CompressPdfTool';
import MergePdfTool from '@/components/tools/MergePdfTool';
import SplitPdfTool from '@/components/tools/SplitPdfTool';
import PdfToJpgTool from '@/components/tools/PdfToJpgTool';
import RotatePdfTool from '@/components/tools/RotatePdfTool';
import WatermarkPdfTool from '@/components/tools/WatermarkPdfTool';
import AddPageNumbersTool from '@/components/tools/AddPageNumbersTool';
import PdfEditorTool from '@/components/tools/PdfEditorTool';
import dynamic from 'next/dynamic';

const PdfToWordTool = dynamic(
  () => import('@/components/tools/PdfToWordTool')
);
const GstCalculatorTool = dynamic(
  () => import('@/components/tools/GstCalculatorTool')
);
const EmiCalculatorTool = dynamic(
  () => import('@/components/tools/EmiCalculatorTool')
);
const AgeCalculatorTool = dynamic(
  () => import('@/components/tools/AgeCalculatorTool')
);
const SipCalculatorTool = dynamic(() => import('@/components/tools/SipCalculatorTool'));
const PercentageCalculatorTool = dynamic(
  () => import('@/components/tools/PercentageCalculatorTool')
);

import FAQAccordion from '@/components/ui/FAQAccordion';
import RelatedTools from '@/components/ui/RelatedTools';
import StructuredData, {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
  buildSoftwareAppSchema,
} from '@/components/seo/StructuredData';
import { getRelatedTools, TOOL_STATUS } from '@/data/tools';
import styles from './ToolPage.module.css';
import { siteConfig } from '@/lib/metadata';

const SITE_URL = siteConfig.siteUrl;

/** Default how-to steps used when tool-specific steps not provided */
const defaultHowToSteps = (toolTitleHi) => [
  { name: 'File Upload करें', text: `अपनी फाइल चुनें और ${toolTitleHi} टूल पर अपलोड करें।` },
  { name: 'सेटिंग चुनें', text: 'अपनी ज़रूरत के अनुसार विकल्प चुनें।' },
  { name: 'Process करें', text: 'प्रोसेस बटन दबाएं और परिणाम का इंतज़ार करें।' },
  { name: 'डाउनलोड करें', text: 'प्रोसेस होने के बाद फाइल डाउनलोड करें।' },
];

/**
 * @param {{
 *   tool: import('@/data/tools').ToolDefinition,
 *   category: object,
 *   faqs: Array,
 * }} props
 */
export default function ToolPageTemplate({ tool, category, faqs }) {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: category?.titleHi || 'टूल्स', href: `/${category?.slug || 'pdf-tools'}` },
    { label: tool.titleHi, href: `/${tool.slug}` },
  ];

  const howToSteps = defaultHowToSteps(tool.titleHi);
  const relatedTools = getRelatedTools(tool.slug);
  const isComingSoon = tool.status === TOOL_STATUS.COMING_SOON;

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildSoftwareAppSchema({
      name: tool.titleEn,
      description: tool.descriptionEn,
      url: `${SITE_URL}/${tool.slug}`,
    }),
    buildHowToSchema({
      name: `${tool.titleEn} कैसे करें`,
      description: tool.descriptionEn,
      steps: howToSteps.map(s => ({ name: s.name, text: s.text })),
    }),
    ...(faqs.length > 0 ? [buildFAQSchema(faqs)] : []),
  ];

  return (
    <>
      <StructuredData data={structuredData} />

      <div className={styles.page}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Header */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <Link href={`/${category?.slug}`} className={styles.categoryTag}>
                {category?.titleHi}
              </Link>
              <span
                className={`badge ${
                  isComingSoon ? 'badge--coming-soon' : 'badge--live'
                }`}
                lang="hi"
              >
                {isComingSoon ? 'जल्द आ रहा है' : 'उपलब्ध'}
              </span>
            </div>
            <h1 className={styles.title} lang="hi">{tool.titleHi}</h1>
            <p className={styles.titleEn}>{tool.titleEn}</p>
            <p className={styles.description} lang="hi">{tool.descriptionHi}</p>
            <p className={styles.descriptionEn}>{tool.descriptionEn}</p>
          </header>

          {/* Tool Area */}
          <section className={styles.toolArea} aria-labelledby="tool-area-heading">
            <h2 id="tool-area-heading" className="sr-only">{tool.titleEn} Tool</h2>
            {isComingSoon ? (
              <div className={styles.comingSoon}>
                <div className={styles.comingSoonIcon} aria-hidden="true">🚧</div>
                <h2 className={styles.comingSoonTitle} lang="hi">
                  यह टूल जल्द आ रहा है
                </h2>
                <p className={styles.comingSoonText} lang="hi">
                  हम इस टूल को बेहतरीन बनाने के लिए काम कर रहे हैं।
                  कृपया थोड़ा इंतज़ार करें।
                </p>
                <p className={styles.comingSoonTextEn}>
                  This tool is under development. We are working hard to make it
                  available soon. Check back later!
                </p>
                <Link href="/pdf-tools" className="btn btn--primary">
                  <span lang="hi">अन्य PDF टूल्स देखें</span>
                </Link>
              </div>
            ) : (
              <div className={styles.toolInterface}>
                {tool.slug === 'jpg-to-pdf' || tool.slug === 'image-to-pdf' ? (
                  <JpgToPdfTool />
                ) : tool.slug === 'compress-pdf' ? (
                  <CompressPdfTool />
                ) : tool.slug === 'merge-pdf' ? (
                  <MergePdfTool />
                ) : tool.slug === 'split-pdf' ? (
                  <SplitPdfTool />
                ) : tool.slug === 'pdf-to-jpg' ? (
                  <PdfToJpgTool />
                ) : tool.slug === 'rotate-pdf' ? (
                  <RotatePdfTool />
                ) : tool.slug === 'watermark-pdf' ? (
                  <WatermarkPdfTool />
                ) : tool.slug === 'add-page-numbers' ? (
                  <AddPageNumbersTool />
                ) : tool.slug === 'pdf-editor' ? (
                  <PdfEditorTool />
                ) : tool.slug === 'pdf-to-word' ? (
                  <PdfToWordTool />
                ) : tool.slug === 'gst-calculator' ? (
                  <GstCalculatorTool />
                ) : tool.slug === 'emi-calculator' ? (
                  <EmiCalculatorTool />
                ) : tool.slug === 'age-calculator' ? (
                  <AgeCalculatorTool />
                ) : tool.slug === 'sip-calculator' ? (
                  <SipCalculatorTool />
                ) : tool.slug === 'percentage-calculator' ? (
                  <PercentageCalculatorTool />
                ) : (
                  <div className={styles.comingSoonBox}>Tool interface will appear here.</div>
                )}
              </div>
            )}
          </section>

          {tool.slug === 'compress-pdf' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-4)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>📄 क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से PDF का साइज कैसे कम करें या फॉर्म के लिए PDF कैसे तैयार करें, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/pdf-ka-size-kam-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: PDF का Size कम कैसे करें? →
              </Link>
            </div>
          )}

          {tool.slug === 'jpg-to-pdf' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-4)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>🖼️ क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से फोटो (JPG/PNG) को PDF कैसे बनाएं या कई फोटोज को एक साथ जोड़कर PDF कैसे बनाएं, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/jpg-to-pdf-kaise-banaye" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: JPG को PDF कैसे बनाएं? →
              </Link>
            </div>
          )}

          {tool.slug === 'pdf-to-jpg' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-4)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>🖼️ क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से PDF को फोटो (JPG) में कैसे बदलें या PDF के पेजेस से इमेज कैसे निकालें, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/pdf-to-jpg-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: PDF को JPG में कैसे बदलें? →
              </Link>
            </div>
          )}

          {/* Benefits */}
          <section className={styles.benefits} aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className={styles.sectionTitle} lang="hi">
              {tool.titleHi} के फ़ायदे
            </h2>
            <ul className={styles.benefitsList}>
              <li lang="hi">✅ बिल्कुल मुफ़्त — कोई भुगतान नहीं</li>
              <li lang="hi">✅ मोबाइल और डेस्कटॉप दोनों पर काम करता है</li>
              <li lang="hi">✅ कोई साइन-अप या लॉगिन की ज़रूरत नहीं</li>
              <li lang="hi">✅ तेज़ और आसान — बस कुछ ही क्लिक में</li>
            </ul>
          </section>

          {/* How To Use */}
          <section className={styles.howTo} aria-labelledby="howto-heading">
            <h2 id="howto-heading" className={styles.sectionTitle} lang="hi">
              {tool.titleHi} कैसे करें?
            </h2>
            <ol className={styles.howToList}>
              {howToSteps.map((step, i) => (
                <li key={i} className={styles.howToStep}>
                  <div className={styles.howToNumber} aria-hidden="true">{i + 1}</div>
                  <div>
                    <strong lang="hi">{step.name}</strong>
                    <p lang="hi">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          {faqs.length > 0 && (
            <section className={styles.faq} aria-labelledby="faq-heading">
              <h2 id="faq-heading" className={styles.sectionTitle} lang="hi">
                सामान्य प्रश्न
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className={styles.related} aria-labelledby="related-heading">
              <h2 id="related-heading" className={styles.sectionTitle} lang="hi">
                संबंधित टूल्स
              </h2>
              <RelatedTools tools={relatedTools} />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
