import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'PDF को 100KB में कैसे करें? Free PDF Compressor',
  description: 'सरकारी फॉर्म, जॉब आवेदन और स्कॉलरशिप के लिए PDF का साइज 100KB में कम करने का आसान तरीका जानें। Free PDF 100KB Tool से मोबाइल से पीडीएफ साइज कम करें।',
  path: '/guides/pdf-100kb-kaise-kare',
});

export default function PDF100KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'PDF को 100KB कैसे करें?', href: '/guides/pdf-100kb-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'PDF को 100KB में कैसे करें?',
      a: 'Shivashutosh Labs के PDF 100KB Tool का उपयोग करके आप बिना किसी तकनीकी जानकारी के अपनी PDF फाइल को 100KB से कम साइज में आसानी से कम्प्रेस कर सकते हैं।'
    },
    {
      q: 'मोबाइल से PDF 100KB कैसे करें?',
      a: 'हमारा टूल मोबाइल-फ्रेंडली है। अपने स्मार्टफोन के ब्राउज़र से सीधे डॉक्यूमेंट अपलोड करें और उसे 100KB में सेव करें।'
    },
    {
      q: 'PDF 100KB से ज्यादा हो तो क्या करें?',
      a: 'अगर आपकी PDF फाइल 2MB या 5MB की है, तो हमारे PDF 100KB Tool में डालें। टूल बड़ी फाइल को प्रोसेस करके 100KB के अंदर सेट कर देगा।'
    },
    {
      q: 'PDF को 100KB करने पर quality खराब होगी क्या?',
      a: 'बहुत बड़ी फाइल को बहुत छोटा करने पर इमेजेस की क्वालिटी थोड़ी कम हो सकती है, लेकिन टेक्स्ट आमतौर पर पढ़ने योग्य (readable) रहता है। हमेशा डाउनलोड करने के बाद एक बार पीडीएफ खोलकर चेक कर लें।'
    },
    {
      q: 'स्कैन की हुई PDF का size कैसे कम करें?',
      a: 'स्कैन की गई फाइलें (जैसे आधार कार्ड या मार्कशीट) काफी बड़ी होती हैं। उन्हें हमारे टूल से 100KB में बदला जा सकता है, जो अक्सर ऑनलाइन फॉर्म्स में मांगा जाता है।'
    },
    {
      q: 'PDF 100KB से कम हो जाए तो क्या करें?',
      a: 'ज्यादातर फॉर्म्स में "Maximum 100KB" लिमिट होती है, यानी 60KB, 80KB या 90KB की फाइल भी मान्य होती है। बस यह ध्यान रखें कि फाइल साफ-साफ पढ़ी जा सके।'
    },
    {
      q: 'सरकारी फॉर्म के लिए PDF 100KB कैसे तैयार करें?',
      a: 'सरकारी फॉर्म के लिए डॉक्यूमेंट को अच्छी रोशनी में स्कैन करें या साफ फोटो खींचकर पीडीएफ बनाएं। फिर हमारे PDF 100KB टूल से उसका साइज कम करें और अपलोड से पहले चेक करें।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'PDF को 100KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/pdf-100kb-kaise-kare',
      image: 'https://shivashutoshlabs.com/og-default.png',
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    })
  ];

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
      <StructuredData data={structuredData} />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="prose" style={{ margin: '0 auto' }}>
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>PDF को 100KB में कैसे करें?</h1>
        
        <p lang="hi">
          भारत में कई सरकारी नौकरियों, स्कॉलरशिप, यूनिवर्सिटी एडमिशन और ऑनलाइन फॉर्म्स भरते समय मार्कशीट, आधार कार्ड या जाति प्रमाण पत्र (Caste Certificate) जैसे डॉक्यूमेंट्स PDF फॉर्मेट में अपलोड करने होते हैं। अक्सर पोर्टल पर निर्देश होता है कि <strong>"PDF size must be maximum 100KB"</strong>. इस गाइड में हम आपको बताएंगे कि अपनी PDF फाइल को बिना पढ़ने की क्षमता (readability) खोए 100KB कैसे बनाएं।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/pdf-100kb" className="btn btn--primary btn--lg">
            PDF 100KB में तैयार करें →
          </Link>
        </div>

        <h2 lang="hi">1. PDF को 100KB में कैसे करें?</h2>
        <p lang="hi">
          अपनी बड़ी PDF फाइल का साइज 100KB तक कम करना बहुत सरल है:
        </p>
        <ol lang="hi">
          <li>अपने मोबाइल या कंप्यूटर पर <Link href="/pdf-100kb">PDF 100KB Tool</Link> खोलें।</li>
          <li>अपनी ओरिजिनल PDF फाइल को सेलेक्ट करके अपलोड करें।</li>
          <li>टूल फाइल को 100KB से कम साइज में ऑटोमैटिक कम्प्रेस कर देगा।</li>
          <li>प्रोसेसिंग के बाद, नई PDF फाइल को डाउनलोड करें।</li>
        </ol>

        <h2 lang="hi">2. मोबाइल से PDF 100KB कैसे करें?</h2>
        <p lang="hi">
          आपको कोई ऐप डाउनलोड करने की जरूरत नहीं है। हमारा टूल मोबाइल ब्राउज़र पर आसानी से काम करता है। बस वेबसाइट खोलें, फाइल अपलोड करें, और आपका काम कुछ ही सेकंड्स में हो जाएगा।
        </p>

        <h2 lang="hi">3. PDF compression क्या करता है और Scanned PDF का size ज्यादा क्यों होता है?</h2>
        <p lang="hi">
          जब आप डॉक्यूमेंट को स्कैनर से स्कैन करते हैं या मोबाइल कैमरे से फोटो खींचकर उसे PDF बनाते हैं, तो वह इमेजेस के रूप में सेव होती है। हाई-रिज़ॉल्यूशन इमेजेस का साइज (जैसे 2MB या 5MB) बहुत बड़ा होता है। PDF Compression इन इमेजेस की क्वालिटी को थोड़ा कम (optimize) करके फाइल का कुल साइज 100KB तक ले आता है, जिससे वह वेबसाइट पर अपलोड होने लायक बन जाती है।
        </p>

        <h2 lang="hi">4. 100KB target का सही इस्तेमाल</h2>
        <p lang="hi">
          <strong>100KB target तभी use करें जब संबंधित website या form की instructions में 100KB या उससे कम size मांगा गया हो।</strong> बहुत ज्यादा कम्प्रेस करने से फाइल के अक्षर धुंधले हो सकते हैं।
        </p>

        <h2 lang="hi">5. Compression के बाद readability check क्यों जरूरी है?</h2>
        <p lang="hi">
          फाइल का साइज कम करने के बाद, डाउनलोड की गई PDF को खोलकर <strong>जरूर चेक करें</strong>। यह पक्का करें कि आपका नाम, मार्क्स, रोल नंबर और सील-सिग्नेचर साफ-साफ पढ़े जा सकते हैं (readable)। अगर डॉक्यूमेंट धुंधला है, तो फॉर्म रिजेक्ट हो सकता है।
        </p>

        <h2 lang="hi">6. Upload से पहले क्या verify करें?</h2>
        <p lang="hi">
          फॉर्म में फाइनल अपलोड करने से पहले दो चीजें चेक करें:
        </p>
        <ul>
          <li><strong>फाइल का साइज:</strong> क्या फाइल 100KB से कम है (जैसे 80KB या 95KB)?</li>
          <li><strong>फाइल का फॉर्मेट:</strong> क्या फाइल वास्तव में .pdf फॉर्मेट में है? (अगर आपने फोटो टूल इस्तेमाल किया है तो वह JPG होगी, PDF नहीं)।</li>
        </ul>

        <h2 lang="hi">7. हमारे अन्य PDF Tools</h2>
        <p lang="hi">
          हम ऑनलाइन फॉर्म्स के लिए अन्य महत्वपूर्ण टूल्स भी प्रदान करते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/pdf-100kb">PDF 100KB Tool</Link></li>
          <li><Link href="/compress-pdf">Compress PDF</Link></li>
          <li><Link href="/merge-pdf">Merge PDF</Link></li>
          <li><Link href="/split-pdf">Split PDF</Link></li>
          <li><Link href="/pdf-to-jpg">PDF to JPG</Link></li>
          <li><Link href="/jpg-to-pdf">JPG to PDF</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            सरकारी फॉर्म्स से जुड़ी हमारी अन्य गाइड्स पढ़ें:
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-ka-size-kam-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF का Size कम कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-200kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 200KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-500kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 500KB में कैसे करें? →</Link></li>
            <li><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी PDF को 100KB करने के लिए तैयार हैं?</h3>
          <Link href="/pdf-100kb" className="btn btn--primary btn--lg">
            PDF 100KB में तैयार करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
