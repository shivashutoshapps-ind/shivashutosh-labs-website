import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'फोटो को 20KB में कैसे करें? Free Online Photo Compressor',
  description: 'सरकारी फॉर्म, परीक्षा और नौकरी आवेदन के लिए फोटो को 20KB में कम करें। आसान तरीका जानें और Free Photo 20KB Tool से फोटो तैयार करें।',
  path: '/guides/photo-20kb-kaise-kare',
});

export default function Photo20KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'फोटो को 20KB में कैसे करें?', href: '/guides/photo-20kb-kaise-kare' },
  ];

  const faqs = [
    {
      question: 'क्या मोबाइल से फोटो को 20KB किया जा सकता है?',
      answer: 'हाँ, Shivashutosh Labs का Photo 20KB टूल पूरी तरह से मोबाइल-फ्रेंडली है। आप सीधे अपने फ़ोन के ब्राउज़र से फोटो अपलोड करके उसे 20KB में कर सकते हैं।'
    },
    {
      question: '20KB फोटो की width और height कितनी होनी चाहिए?',
      answer: 'आमतौर पर सरकारी फॉर्म्स के लिए फोटो की चौड़ाई (width) 3.5cm और ऊंचाई (height) 4.5cm होती है, जो लगभग 132x170 पिक्सल के बराबर होती है। हमारा टूल आकार और क्वालिटी दोनों को बैलेंस करता है।'
    },
    {
      question: 'क्या फोटो compress करने से वह धुंधली हो जाएगी?',
      answer: 'हमारा टूल क्वालिटी को बनाए रखने के लिए स्मार्ट कंप्रेशन का उपयोग करता है, जिससे आपकी फोटो धुंधली नहीं होती और फॉर्म रिजेक्ट होने का खतरा कम हो जाता है।'
    },
    {
      question: 'फोटो का format क्या होना चाहिए?',
      answer: 'ज्यादातर सरकारी फॉर्म्स में JPG या JPEG फॉर्मेट मांगा जाता है। आप किसी भी फॉर्मेट की फोटो अपलोड करें, हमारा टूल उसे अपने आप सही फॉर्मेट और 20KB साइज में कन्वर्ट कर देगा।'
    },
    {
      question: 'अगर मेरी फोटो 5MB की है, तो क्या वह 20KB हो जाएगी?',
      answer: 'हाँ, टूल इसे अपने आप 20KB के अंदर लाएगा, हालांकि बहुत बड़ी फाइल को 20KB में करने पर थोड़ी क्वालिटी कम हो सकती है।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'फोटो को 20KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/photo-20kb-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>फोटो को 20KB में कैसे करें?</h1>
        
        <p lang="hi">
          क्या आप किसी सरकारी नौकरी या परीक्षा का फॉर्म भर रहे हैं और फोटो का साइज़ 20KB मांगा गया है? यह एक बहुत ही आम समस्या है। इस गाइड में हम आपको बताएंगे कि बिना क्वालिटी खराब किए फोटो को 20KB कैसे करें।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/photo-20kb" className="btn btn--primary btn--lg">
            फोटो को 20KB में करें →
          </Link>
        </div>

        <h2 lang="hi">1. फोटो को 20KB कैसे करें?</h2>
        <p lang="hi">
          फोटो को 20KB में कम करना बहुत आसान है। आपको किसी सॉफ्टवेयर की आवश्यकता नहीं है। बस इन सरल चरणों का पालन करें:
        </p>
        <ol lang="hi">
          <li>हमारे <Link href="/photo-20kb">Photo 20KB Tool</Link> पर जाएं।</li>
          <li>अपनी फोटो सेलेक्ट करें या खींचें (drag and drop)।</li>
          <li>टूल अपने आप आपकी फोटो को प्रोसेस करेगा।</li>
          <li>'Download' पर क्लिक करें और आपकी 20KB की फोटो तैयार है!</li>
        </ol>

        <h2 lang="hi">2. फोटो को 20KB करने की जरूरत कब पड़ती है?</h2>
        <p lang="hi">
          भारत में SSC, UPSC, IBPS, Railway और कई अन्य सरकारी फॉर्म भरते समय आमतौर पर फोटो और सिग्नेचर का साइज़ 20KB से 50KB के बीच मांगा जाता है। यदि फोटो का साइज़ इससे बड़ा होता है, तो फॉर्म पोर्टल उसे स्वीकार नहीं करता। इसलिए, फॉर्म भरने से पहले फोटो को 20KB तक compress करना आवश्यक है।
        </p>

        <h2 lang="hi">3. मोबाइल से फोटो को 20KB कैसे करें?</h2>
        <p lang="hi">
          हमारे टूल का उपयोग मोबाइल से भी आसानी से किया जा सकता है। आपको बस अपने मोबाइल ब्राउज़र में वेबसाइट खोलनी है, फोटो अपलोड करनी है और 20KB में डाउनलोड करनी है। यह पूरी तरह से सुरक्षित है क्योंकि आपकी फोटो हमारे सर्वर पर सेव नहीं होती।
        </p>

        <h2 lang="hi">4. फोटो 20KB करने पर quality क्यों कम हो सकती है?</h2>
        <p lang="hi">
          जब आप एक बहुत बड़ी फाइल (जैसे 5MB) को 20KB में बदलते हैं, तो फोटो से बहुत सारा डेटा हटा दिया जाता है। इस वजह से फोटो थोड़ी धुंधली (pixelated) लग सकती है। बेहतर रिज़ल्ट के लिए, फोटो को क्रॉप करें और केवल चेहरा और कंधे रखें, जिससे साइज़ भी कम हो और क्वालिटी भी बनी रहे।
        </p>

        <h2 lang="hi">5. सरकारी फॉर्म के लिए फोटो तैयार करते समय क्या देखें?</h2>
        <ul lang="hi">
          <li>फोटो का बैकग्राउंड सफेद या हल्का होना चाहिए।</li>
          <li>चेहरा बिल्कुल साफ और कैमरे की ओर होना चाहिए (80% चेहरा दिखना चाहिए)।</li>
          <li>चश्मा या टोपी पहनने से बचें।</li>
          <li>फोटो का फॉर्मेट JPG या JPEG होना चाहिए।</li>
        </ul>

        <h2 lang="hi">6. अगर 20KB से ज्यादा फोटो चाहिए?</h2>
        <p lang="hi">
          अगर आपके फॉर्म में फोटो का साइज़ 50KB, 100KB या 200KB मांगा गया है, तो आप हमारे अन्य टूल्स का उपयोग कर सकते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/photo-50kb">Photo 50KB Tool</Link></li>
          <li><Link href="/photo-100kb">Photo 100KB Tool</Link></li>
          <li><Link href="/photo-200kb">Photo 200KB Tool</Link></li>
        </ul>

        <h2 lang="hi">7. Signature भी 20KB करनी है?</h2>
        <p lang="hi">
          आमतौर पर फोटो के साथ-साथ सिग्नेचर (हस्ताक्षर) को भी 20KB से कम करना होता है। आप सिग्नेचर के लिए हमारे <Link href="/signature-20kb">Signature 20KB Tool</Link> का उपयोग कर सकते हैं, जो विशेष रूप से सिग्नेचर के लिए डिज़ाइन किया गया है।
        </p>

        <h2 lang="hi">8. फोटो resize या crop भी करनी है?</h2>
        <p lang="hi">
          अगर आपको फोटो को विशेष पिक्सल (जैसे 132x170) में रिसाइज़ करना है या फालतू हिस्सा काटना है, तो हमारे <Link href="/resize-image">Image Resizer</Link> और <Link href="/crop-image">Image Cropper</Link> टूल का उपयोग करें।
        </p>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 अन्य गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            सरकारी फॉर्म्स की अन्य फोटो और सिग्नेचर रिक्वायरमेंट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
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
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप फोटो compress करने के लिए तैयार हैं?</h3>
          <Link href="/photo-20kb" className="btn btn--primary btn--lg">
            फोटो को 20KB में करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
