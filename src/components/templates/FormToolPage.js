/**
 * Form Tool Page Template
 * Specialized template for exact-size photo/signature/PDF tools.
 * These tools have government-form specific messaging and instructions.
 */
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PhotoCompressTool from '@/components/tools/PhotoCompressTool';
import SignatureCompressTool from '@/components/tools/SignatureCompressTool';
import TargetPdfCompressTool from '@/components/tools/TargetPdfCompressTool';
import ImageCompressorTool from '@/components/tools/ImageCompressorTool';
import ResizeImageTool from '@/components/tools/ResizeImageTool';
import CropImageTool from '@/components/tools/CropImageTool';
import FAQAccordion from '@/components/ui/FAQAccordion';
import RelatedTools from '@/components/ui/RelatedTools';
import StructuredData, {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
  buildSoftwareAppSchema,
} from '@/components/seo/StructuredData';
import { getRelatedTools, TOOL_STATUS } from '@/data/tools';
import styles from './FormToolPage.module.css';
import { siteConfig } from '@/lib/metadata';

const SITE_URL = siteConfig.siteUrl;

const formToolHowToSteps = (tool) => [
  {
    name: 'फोटो या फाइल अपलोड करें',
    text: `अपनी फाइल चुनें। ${tool.titleHi} के लिए JPG, PNG फॉर्मेट स्वीकृत है।`,
  },
  {
    name: 'साइज़ सेटिंग चुनें',
    text: 'वांछित फाइल साइज़ और गुणवत्ता सेटिंग चुनें।',
  },
  {
    name: 'कम्प्रेस/रिसाइज़ करें',
    text: 'बटन दबाएं और फाइल प्रोसेस होने तक इंतज़ार करें।',
  },
  {
    name: 'डाउनलोड और उपयोग करें',
    text: `प्रोसेस की गई फाइल डाउनलोड करें और अपने फॉर्म में अपलोड करें।`,
  },
];

export default function FormToolPageTemplate({ tool, category, faqs }) {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'फॉर्म टूल्स', href: '/form-tools' },
    { label: tool.titleHi, href: `/${tool.slug}` },
  ];

  const howToSteps = formToolHowToSteps(tool);
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
      name: `${tool.titleEn} — How to resize for government forms`,
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
          <Breadcrumb items={breadcrumbItems} />

          {/* Government form context banner */}
          <div className={styles.contextBanner} role="note">
            <span className={styles.contextIcon} aria-hidden="true">🏛️</span>
            <div>
              <p className={styles.contextTitle} lang="hi">सरकारी फॉर्म / ऑनलाइन आवेदन टूल</p>
              <p className={styles.contextText} lang="hi">
                यह टूल सरकारी पोर्टल, परीक्षा आवेदन और ऑनलाइन फॉर्म के लिए फाइल साइज़ सही करने में मदद करता है।
              </p>
            </div>
          </div>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <Link href="/form-tools" className={styles.categoryTag}>फॉर्म टूल्स</Link>
              <span className={`badge ${isComingSoon ? 'badge--coming-soon' : 'badge--live'}`} lang="hi">
                {isComingSoon ? 'जल्द आ रहा है' : 'उपलब्ध'}
              </span>
            </div>
            <h1 className={styles.title} lang="hi">{tool.titleHi}</h1>
            <p className={styles.titleEn}>{tool.titleEn}</p>
            <p className={styles.description} lang="hi">{tool.descriptionHi}</p>
            <p className={styles.descriptionEn}>{tool.descriptionEn}</p>
          </header>

          {/* Tool Area */}
          <section className={styles.toolArea} aria-labelledby="tool-area-label">
            <h2 id="tool-area-label" className="sr-only">{tool.titleEn} Tool Interface</h2>
            {isComingSoon ? (
              <div className={styles.comingSoon}>
                <div className={styles.comingSoonIcon} aria-hidden="true">🚧</div>
                <h2 className={styles.comingSoonTitle} lang="hi">
                  यह टूल जल्द आ रहा है
                </h2>
                <p className={styles.comingSoonText} lang="hi">
                  हम इस टूल को जल्द ही लॉन्च करेंगे। कृपया थोड़ा इंतज़ार करें।
                </p>
                <p className={styles.comingSoonSubText}>
                  We are building this tool with accuracy in mind — so that your
                  government form uploads always work on the first try.
                </p>
                <div className={styles.comingSoonActions}>
                  <Link href="/form-tools" className="btn btn--primary">
                    <span lang="hi">अन्य फॉर्म टूल्स देखें</span>
                  </Link>
                  <Link href="/pdf-tools" className="btn btn--ghost">
                    <span lang="hi">PDF टूल्स</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.toolInterface}>
                {tool.slug.startsWith('photo-') ? (
                  <PhotoCompressTool defaultTarget={parseInt(tool.slug.replace(/\D/g, '')) || 20} />
                ) : tool.slug.startsWith('signature-') ? (
                  <SignatureCompressTool defaultTarget={parseInt(tool.slug.replace(/\D/g, '')) || 20} />
                ) : tool.slug === 'image-compressor' ? (
                  <ImageCompressorTool />
                ) : tool.slug === 'resize-image' ? (
                  <ResizeImageTool />
                ) : tool.slug === 'crop-image' ? (
                  <CropImageTool />
                ) : tool.slug.startsWith('pdf-') ? (
                  <TargetPdfCompressTool defaultTarget={parseInt(tool.slug.replace(/\D/g, '')) || 100} />
                ) : (
                  <p className="sr-only">Tool interface area.</p>
                )}
              </div>
            )}
          </section>

          {tool.slug === 'photo-20kb' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>📸 क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से फोटो कैसे compress करें या फॉर्म रिजेक्ट होने से कैसे बचाएं, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/photo-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: फोटो को 20KB में कैसे करें? →
              </Link>
            </div>
          )}
          {tool.slug === 'pdf-100kb' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>📄 क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से PDF का साइज कैसे कम करें या फॉर्म के लिए PDF कैसे तैयार करें, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/pdf-100kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: PDF को 100KB में कैसे करें? →
              </Link>
            </div>
          )}
          {tool.slug === 'pdf-200kb' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>📄 क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से PDF का साइज कैसे कम करें या फॉर्म के लिए PDF कैसे तैयार करें, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/pdf-200kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: PDF को 200KB में कैसे करें? →
              </Link>
            </div>
          )}
          {tool.slug === 'pdf-500kb' && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <h3 lang="hi" style={{ fontSize: '1rem', marginBottom: 'var(--space-2)' }}>📄 क्या आपको मदद चाहिए?</h3>
              <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                अगर आप जानना चाहते हैं कि मोबाइल से PDF का साइज कैसे कम करें या फॉर्म के लिए PDF कैसे तैयार करें, तो हमारी यह विस्तृत गाइड पढ़ें।
              </p>
              <Link href="/guides/pdf-500kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                गाइड पढ़ें: PDF को 500KB में कैसे करें? →
              </Link>
            </div>
          )}

          {/* Form-specific note */}
          <div className={styles.usageNote} role="note">
            <h2 className={styles.sectionTitle} lang="hi">📋 किन फॉर्म्स के लिए उपयोगी?</h2>
            <ul className={styles.usageList}>
              <li lang="hi">✅ SSC, UPSC, Railway, Banking परीक्षाएं</li>
              <li lang="hi">✅ सरकारी नौकरी आवेदन पोर्टल</li>
              <li lang="hi">✅ कॉलेज और विश्वविद्यालय प्रवेश फॉर्म</li>
              <li lang="hi">✅ आधार, PAN, Passport दस्तावेज़ अपलोड</li>
              <li lang="hi">✅ साइबर कैफे — ग्राहक दस्तावेज़ सेवा</li>
            </ul>
          </div>

          {/* How To */}
          <section className={styles.howTo} aria-labelledby="howto-heading">
            <h2 id="howto-heading" className={styles.sectionTitle} lang="hi">
              {tool.titleHi} — कैसे करें?
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

          {/* Related */}
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
