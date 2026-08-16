import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'फोटो को 200KB में कैसे करें? Free Photo Compressor',
  description: 'सरकारी फॉर्म, परीक्षा और ऑनलाइन आवेदन के लिए फोटो को 200KB में कम करने का आसान तरीका जानें। Free Photo 200KB Tool से क्वालिटी बनाए रखते हुए फोटो का साइज कम करें।',
  path: '/guides/photo-200kb-kaise-kare',
});

export default function Photo200KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'फोटो को 200KB कैसे करें?', href: '/guides/photo-200kb-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'फोटो को 200KB में कैसे करें?',
      a: 'Shivashutosh Labs के Photo 200KB Tool का उपयोग करके आप बिना क्वालिटी खराब किए अपनी फोटो को आसानी से 200KB से कम साइज में बदल सकते हैं।'
    },
    {
      q: 'मोबाइल से फोटो 200KB कैसे करें?',
      a: 'हमारा टूल मोबाइल-फ्रेंडली है। अपने स्मार्टफोन के ब्राउज़र से सीधे गैलरी की फोटो अपलोड करें और उसे 200KB में सेव करें।'
    },
    {
      q: 'फोटो 200KB से ज्यादा है तो क्या करें?',
      a: 'अगर आपकी फोटो 2MB या 5MB की है, तो पहले फालतू हिस्से को क्रॉप करें और फिर हमारे Photo 200KB Tool से उसका साइज कम कर लें।'
    },
    {
      q: '200KB फोटो की quality कैसे बनाए रखें?',
      a: '200KB एक बहुत अच्छा साइज है जिसमें फोटो की क्वालिटी और क्लैरिटी बरकरार रहती है। हमारे टूल में स्मार्ट कम्प्रेशन अल्गोरिदम है जो क्वालिटी को सुरक्षित रखता है।'
    },
    {
      q: 'JPG फोटो को 200KB कैसे करें?',
      a: 'हमारा टूल आपकी फोटो को प्रोसेस करके सीधे JPG/JPEG फॉर्मेट में ही आउटपुट देता है, जो सभी सरकारी और ऑनलाइन फॉर्म्स के लिए सबसे सही फॉर्मेट है।'
    },
    {
      q: 'सरकारी फॉर्म के लिए 200KB फोटो कैसे तैयार करें?',
      a: 'अगर फॉर्म में "Maximum 200KB" लिमिट है, तो फोटो स्पष्ट होनी चाहिए। Crop Tool का इस्तेमाल करके सही डाइमेंशन सेट करें और फिर Photo 200KB टूल से साइज एडजस्ट करें।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'फोटो को 200KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/photo-200kb-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>फोटो को 200KB में कैसे करें?</h1>
        
        <p lang="hi">
          भारत में कई सरकारी नौकरियों, बैंक एग्जाम्स (Bank Exams), यूनिवर्सिटी एडमिशन और पासपोर्ट सेवाओं से जुड़े ऑनलाइन फॉर्म्स में डाक्यूमेंट्स या फोटो अपलोड करते समय <strong>"Maximum 200KB"</strong> फाइल साइज की लिमिट दी जाती है। इस गाइड में हम आपको बताएंगे कि अपनी फोटो की क्वालिटी बनाए रखते हुए उसे 200KB कैसे बनाएं।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/photo-200kb" className="btn btn--primary btn--lg">
            फोटो को 200KB में करें →
          </Link>
        </div>

        <h2 lang="hi">1. फोटो को 200KB में कैसे करें?</h2>
        <p lang="hi">
          अपनी बड़ी फोटो का फाइल साइज 200KB तक कम करना बहुत सरल है:
        </p>
        <ol lang="hi">
          <li>अपने मोबाइल या कंप्यूटर पर <Link href="/photo-200kb">Photo 200KB Tool</Link> खोलें।</li>
          <li>गैलरी से अपनी ओरिजिनल फोटो को सेलेक्ट करें।</li>
          <li>टूल फोटो को 200KB से कम साइज में ऑटोमैटिक कम्प्रेस कर देगा।</li>
          <li>"Download" बटन पर क्लिक करके नई फोटो सेव करें।</li>
        </ol>

        <h2 lang="hi">2. मोबाइल से फोटो 200KB कैसे करें?</h2>
        <p lang="hi">
          आपको कोई नया ऐप डाउनलोड करने की जरूरत नहीं है। हमारे सारे टूल्स सीधे मोबाइल ब्राउज़र पर काम करते हैं। बस वेबसाइट खोलें और अपलोड करें, आपका काम कुछ ही सेकंड्स में हो जाएगा।
        </p>

        <h2 lang="hi">3. 200KB से बड़ी फोटो को छोटा कैसे करें?</h2>
        <p lang="hi">
          अगर वेबसाइट आपको "File size too large" का एरर दे रही है (मतलब फोटो 2MB या 5MB की है), तो उसे हमारे <Link href="/photo-200kb">Photo 200KB Tool</Link> में डालें। टूल बड़ी फाइल को बिना दिक्कत के 200KB के अंदर सेट कर देगा।
        </p>

        <h2 lang="hi">4. फोटो की quality बनाए रखते हुए size कम करना</h2>
        <p lang="hi">
          200KB लिमिट काफी बड़ी होती है, इसलिए इसमें क्वालिटी का नुकसान बहुत कम होता है। फिर भी, अगर फोटो का फालतू बैकग्राउंड ज्यादा है, तो पहले हमारी <Link href="/crop-image">Crop Image</Link> टूल से फोटो के अतिरिक्त हिस्से को काट लें।
        </p>

        <h2 lang="hi">5. JPG/JPEG photo handling और dimensions</h2>
        <p lang="hi">
          सरकारी फॉर्म्स में सिर्फ JPG/JPEG फॉर्मेट ही सपोर्ट होता है। हमारा टूल आपकी फोटो को उसी फॉर्मेट में आउटपुट करता है। अगर फॉर्म में खास dimensions जैसे (3.5cm x 4.5cm) चाहिए, तो आप <Link href="/resize-image">Resize Image Tool</Link> का उपयोग कर सकते हैं।
        </p>

        <h2 lang="hi">6. सही साइज का चुनाव: 20KB, 50KB, 100KB या 200KB?</h2>
        <p lang="hi">
          हर फॉर्म की अपनी आवश्यकता होती है। निर्देशों को ध्यान से पढ़ें:
        </p>
        <ul lang="hi">
          <li><strong>सिग्नेचर (Signature)</strong> आमतौर पर <Link href="/guides/signature-20kb-kaise-kare">10KB से 20KB</Link> के बीच मांगे जाते हैं।</li>
          <li><strong>पासपोर्ट साइज फोटो</strong> अक्सर <Link href="/guides/photo-50kb-kaise-kare">20KB से 50KB</Link> या <Link href="/guides/photo-100kb-kaise-kare">100KB</Link> तक मांगी जाती है।</li>
          <li><strong>डॉक्यूमेंट्स (मार्कशीट, आधार, आदि)</strong> के लिए <Link href="/photo-200kb">200KB</Link> की लिमिट आम बात है।</li>
        </ul>

        <h2 lang="hi">7. Upload से पहले क्या verify करें?</h2>
        <p lang="hi">
          फॉर्म में फाइनल अपलोड करने से पहले चेक कर लें कि फोटो का साइज 200KB से कम हो (जैसे 180KB या 190KB) और उसका फॉर्मेट JPG हो।
        </p>

        <h2 lang="hi">8. हमारे अन्य Photo Tools</h2>
        <p lang="hi">
          अपनी जरूरत के हिसाब से अलग-अलग टूल्स का उपयोग करें:
        </p>
        <ul lang="hi">
          <li><Link href="/photo-20kb">Photo 20KB Tool</Link></li>
          <li><Link href="/photo-50kb">Photo 50KB Tool</Link></li>
          <li><Link href="/photo-100kb">Photo 100KB Tool</Link></li>
          <li><Link href="/photo-200kb">Photo 200KB Tool</Link></li>
          <li><Link href="/signature-20kb">Signature 20KB Tool</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 अन्य गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अन्य साइज लिमिट्स और रिक्वायरमेंट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 20KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-50kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 50KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-100kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 100KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
            <li><Link href="/guides/signature-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सिग्नेचर को 20KB में कैसे करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी फोटो या डॉक्यूमेंट को 200KB करने के लिए तैयार हैं?</h3>
          <Link href="/photo-200kb" className="btn btn--primary btn--lg">
            फोटो को 200KB में करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
