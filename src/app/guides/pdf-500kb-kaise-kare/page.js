import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'PDF को 500KB में कैसे करें? Free PDF Compressor',
  description: 'सरकारी फॉर्म, जॉब एप्लीकेशन और स्कॉलरशिप के लिए PDF का साइज 500KB में कम करने का आसान तरीका जानें। Free PDF 500KB Tool से मोबाइल से पीडीएफ साइज कम करें।',
  path: '/guides/pdf-500kb-kaise-kare',
});

export default function PDF500KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'PDF को 500KB कैसे करें?', href: '/guides/pdf-500kb-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'PDF को 500KB में कैसे करें?',
      a: 'Shivashutosh Labs के PDF 500KB Tool का उपयोग करके आप बिना किसी तकनीकी जानकारी के अपनी PDF फाइल को 500KB से कम साइज में आसानी से कम्प्रेस कर सकते हैं।'
    },
    {
      q: 'मोबाइल से PDF 500KB कैसे करें?',
      a: 'हमारा टूल मोबाइल-फ्रेंडली है। अपने स्मार्टफोन के ब्राउज़र से सीधे डॉक्यूमेंट अपलोड करें और उसे 500KB में सेव करें।'
    },
    {
      q: 'PDF 500KB से ज्यादा हो तो क्या करें?',
      a: 'अगर आपकी PDF फाइल 2MB, 5MB या इससे बड़ी है, तो हमारे PDF 500KB Tool में अपलोड करें। टूल बड़ी फाइल को प्रोसेस करके 500KB के अंदर सेट कर देगा।'
    },
    {
      q: 'PDF 500KB करने पर quality खराब होगी क्या?',
      a: '500KB एक बहुत अच्छा साइज है, जिसमें आमतौर पर डॉक्यूमेंट्स की क्वालिटी बेहतरीन रहती है और टेक्स्ट साफ पढ़ा जा सकता है। फिर भी, हमेशा डाउनलोड करने के बाद एक बार पीडीएफ खोलकर चेक कर लें।'
    },
    {
      q: 'स्कैन की हुई PDF का size कैसे कम करें?',
      a: 'स्कैन की गई फाइलें (जैसे आधार कार्ड या मार्कशीट) काफी बड़ी होती हैं। उन्हें हमारे टूल से आसानी से 500KB में बदला जा सकता है, जो अक्सर ऑनलाइन फॉर्म्स में मांगा जाता है।'
    },
    {
      q: 'PDF 500KB से कम हो जाए तो क्या करें?',
      a: 'अगर फॉर्म में "Maximum 500KB" लिमिट है, तो 300KB या 400KB की फाइल भी मान्य होती है। बस यह ध्यान रखें कि फाइल साफ-साफ पढ़ी जा सके।'
    },
    {
      q: 'सरकारी फॉर्म के लिए PDF 500KB कैसे तैयार करें?',
      a: 'डॉक्यूमेंट को अच्छी रोशनी में स्कैन करें, उसे अपलोड करें और हमारे PDF 500KB टूल से उसका साइज कम करें। अपलोड से पहले हमेशा टेक्स्ट की क्लैरिटी जरूर जांच लें।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'PDF को 500KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/pdf-500kb-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>PDF को 500KB में कैसे करें?</h1>
        
        <p lang="hi">
          भारत में कई सरकारी नौकरियों, बैंक एग्जाम्स, स्कॉलरशिप, यूनिवर्सिटी एडमिशन और ऑनलाइन फॉर्म्स भरते समय सर्टिफिकेट्स या डाक्यूमेंट्स PDF फॉर्मेट में अपलोड करने होते हैं। अक्सर पोर्टल पर निर्देश होता है कि <strong>"PDF size must be maximum 500KB"</strong>. इस गाइड में हम आपको बताएंगे कि अपनी PDF फाइल को क्वालिटी खोए बिना 500KB कैसे बनाएं।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/pdf-500kb" className="btn btn--primary btn--lg">
            PDF 500KB में तैयार करें →
          </Link>
        </div>

        <h2 lang="hi">1. PDF को 500KB में कैसे करें?</h2>
        <p lang="hi">
          अपनी बड़ी PDF फाइल का साइज 500KB तक कम करना बहुत आसान है:
        </p>
        <ol lang="hi">
          <li>अपने मोबाइल या कंप्यूटर पर <Link href="/pdf-500kb">PDF 500KB Tool</Link> खोलें।</li>
          <li>अपनी ओरिजिनल PDF फाइल (जैसे मार्कशीट या आधार) सेलेक्ट करके अपलोड करें।</li>
          <li>टूल आपकी फाइल को 500KB से कम साइज में ऑटोमैटिक कम्प्रेस कर देगा।</li>
          <li>प्रोसेसिंग के बाद, अपनी नई PDF फाइल को डाउनलोड कर लें।</li>
        </ol>

        <h2 lang="hi">2. मोबाइल से PDF 500KB कैसे करें?</h2>
        <p lang="hi">
          इस काम के लिए आपको कोई अलग ऐप डाउनलोड करने की जरूरत नहीं है। हमारा टूल पूरी तरह मोबाइल-फ्रेंडली है। बस क्रोम या सफारी (Chrome/Safari) में हमारी वेबसाइट खोलें, फाइल अपलोड करें, और कुछ ही सेकंड्स में आपकी फाइल तैयार हो जाएगी।
        </p>

        <h2 lang="hi">3. बड़ी PDF का size कम कैसे करें?</h2>
        <p lang="hi">
          अगर आपने प्रिंटर या स्कैनर से डॉक्यूमेंट स्कैन किया है, या हाई-रिजॉल्यूशन फोन कैमरे का इस्तेमाल किया है, तो फाइल 5MB या उससे बड़ी हो सकती है। हमारा टूल इन इमेजेस को ऑप्टिमाइज़ करके फाइल का कुल साइज 500KB तक ले आता है, ताकि वह आसानी से वेबसाइट पर अपलोड हो सके।
        </p>

        <h2 lang="hi">4. 500KB target का सही इस्तेमाल</h2>
        <p lang="hi">
          <strong>500KB target तभी रखें जब संबंधित form/website की instructions में 500KB या उससे कम size मांगा गया हो।</strong> अगर वेबसाइट 1MB की छूट देती है, तो ज्यादा साइज रखना बेहतर हो सकता है ताकि डॉक्यूमेंट की क्वालिटी बिल्कुल वैसी ही रहे।
        </p>

        <h2 lang="hi">5. Text/Image readability कैसे check करें?</h2>
        <p lang="hi">
          साइज कम होने पर कभी-कभी फोटो वाले हिस्से थोड़े पिक्सलेट (धुंधले) हो सकते हैं। इसलिए डाउनलोड करने के बाद PDF फाइल खोलें और ज़ूम करके देखें कि <strong>आपका नाम, मार्क्स और फोटो साफ दिख रहे हैं या नहीं</strong>।
        </p>

        <h2 lang="hi">6. Upload से पहले किन चीजों को check करें?</h2>
        <p lang="hi">
          फॉर्म में फाइनल अपलोड करने से पहले दो चीजें पक्का कर लें:
        </p>
        <ul>
          <li><strong>फाइल का साइज:</strong> क्या फाइल वास्तव में 500KB से कम है?</li>
          <li><strong>फाइल का फॉर्मेट:</strong> क्या फाइल .pdf फॉर्मेट में है?</li>
        </ul>

        <h2 lang="hi">7. हमारे अन्य उपयोगी PDF Tools</h2>
        <p lang="hi">
          हम ऑनलाइन फॉर्म्स के लिए अन्य महत्वपूर्ण टूल्स भी प्रदान करते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/pdf-100kb">PDF 100KB Tool</Link></li>
          <li><Link href="/pdf-200kb">PDF 200KB Tool</Link></li>
          <li><Link href="/pdf-500kb">PDF 500KB Tool</Link></li>
          <li><Link href="/compress-pdf">Compress PDF</Link></li>
          <li><Link href="/merge-pdf">Merge PDF</Link></li>
          <li><Link href="/split-pdf">Split PDF</Link></li>
          <li><Link href="/pdf-to-jpg">PDF to JPG</Link></li>
          <li><Link href="/jpg-to-pdf">JPG to PDF</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अन्य PDF साइज लिमिट्स और रिक्वायरमेंट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-100kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 100KB में कैसे करें? →</Link></li>
            <li><Link href="/guides/pdf-200kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 200KB में कैसे करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी PDF को 500KB करने के लिए तैयार हैं?</h3>
          <Link href="/pdf-500kb" className="btn btn--primary btn--lg">
            PDF 500KB में तैयार करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
