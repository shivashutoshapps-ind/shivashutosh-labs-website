import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'फोटो को 100KB में कैसे करें? Free Photo Compressor',
  description: 'सरकारी फॉर्म, परीक्षा और ऑनलाइन आवेदन के लिए फोटो को 100KB में कम करने का आसान तरीका जानें। Free Photo 100KB Tool से फोटो का साइज कम करें।',
  path: '/guides/photo-100kb-kaise-kare',
});

export default function Photo100KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'फोटो को 100KB कैसे करें?', href: '/guides/photo-100kb-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'फोटो को 100KB में कैसे करें?',
      a: 'Shivashutosh Labs के Photo 100KB Tool का उपयोग करके आप बिना किसी तकनीकी जानकारी के अपनी फोटो को 100KB से कम साइज में बदल सकते हैं।'
    },
    {
      q: 'मोबाइल से फोटो 100KB कैसे करें?',
      a: 'हमारा टूल पूरी तरह से मोबाइल-फ्रेंडली है। आप अपने स्मार्टफोन के ब्राउज़र से सीधे गैलरी की फोटो अपलोड करके उसे 100KB में सेव कर सकते हैं।'
    },
    {
      q: '100KB फोटो की quality खराब क्यों होती है?',
      a: 'अगर आप 10MB की बहुत बड़ी फोटो को सीधे 100KB में बदलते हैं, तो बहुत सारा डेटा हटाना पड़ता है जिससे क्वालिटी कम हो सकती है। बेहतर रिजल्ट के लिए पहले फोटो को क्रॉप करें।'
    },
    {
      q: 'फोटो 100KB से कम हो जाए तो क्या करें?',
      a: 'ज्यादातर फॉर्म्स में "Maximum 100KB" लिमिट होती है, यानी 60KB, 80KB या 90KB की फोटो भी मान्य होती है। अगर न्यूनतम (minimum) सीमा दी गई है, तो फोटो उसके ऊपर होनी चाहिए।'
    },
    {
      q: '100KB फोटो JPG में कैसे बनाएं?',
      a: 'हमारा Photo 100KB Tool फोटो को ऑटोमैटिक रूप से JPG/JPEG फॉर्मेट में ही सेव करता है, जो सभी सरकारी फॉर्म्स के लिए सबसे उपयुक्त है।'
    },
    {
      q: 'सरकारी फॉर्म के लिए 100KB फोटो कैसे तैयार करें?',
      a: 'सरकारी फॉर्म के लिए फोटो का बैकग्राउंड साफ रखें, चेहरा स्पष्ट दिखना चाहिए। फोटो खींचने के बाद हमारे Crop Tool से अतिरिक्त हिस्सा काट लें, फिर Photo 100KB टूल से साइज कम करें।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'फोटो को 100KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/photo-100kb-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>फोटो को 100KB में कैसे करें?</h1>
        
        <p lang="hi">
          भारत में कई सरकारी नौकरियों, यूनिवर्सिटी एडमिशन और ऑनलाइन फॉर्म्स भरते समय फोटो अपलोड करनी होती है। कई फॉर्म्स में फोटो का साइज "Maximum 100KB" तक माँगा जाता है। इस गाइड में हम आपको बताएंगे कि बिना क्वालिटी खोए अपनी फोटो को 100KB कैसे बनाएं।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/photo-100kb" className="btn btn--primary btn--lg">
            फोटो को 100KB में करें →
          </Link>
        </div>

        <h2 lang="hi">1. फोटो को 100KB में कैसे करें?</h2>
        <p lang="hi">
          अपनी फोटो का फाइल साइज 100KB तक कम करना बहुत ही आसान है:
        </p>
        <ol lang="hi">
          <li>अपने मोबाइल या कंप्यूटर में <Link href="/photo-100kb">Photo 100KB Tool</Link> खोलें।</li>
          <li>अपनी ओरिजिनल फोटो को सेलेक्ट करके अपलोड करें।</li>
          <li>हमारा टूल फोटो को प्रोसेस करेगा।</li>
          <li>प्रोसेसिंग के बाद, 100KB से कम साइज वाली नई फोटो को डाउनलोड करें।</li>
        </ol>

        <h2 lang="hi">2. मोबाइल से फोटो 100KB कैसे करें?</h2>
        <p lang="hi">
          फोटो का साइज कम करने के लिए किसी ऐप को डाउनलोड करने की जरूरत नहीं है। आप सीधे अपने मोबाइल के ब्राउज़र (Chrome, Safari आदि) में हमारे टूल को खोलकर, गैलरी से फोटो चुन सकते हैं और उसे 100KB में सेव कर सकते हैं।
        </p>

        <h2 lang="hi">3. सरकारी फॉर्म में 100KB फोटो की जरूरत होने पर क्या करें?</h2>
        <p lang="hi">
          जब फॉर्म के निर्देशों में लिखा हो कि फोटो का साइज 100KB होना चाहिए, तो ध्यान दें कि क्या वह "Maximum 100KB" है या फिर "Between 50KB to 100KB" है।
          अगर "Maximum 100KB" है, तो 80KB या 90KB की फोटो भी पूरी तरह से मान्य होगी।
        </p>

        <h2 lang="hi">4. फोटो की quality और dimensions का balance</h2>
        <p lang="hi">
          100KB साइज लिमिट काफी अच्छी होती है, इसमें फोटो की क्वालिटी बहुत साफ रहती है। लेकिन अगर आपकी फोटो बहुत बड़ी (जैसे 10MB) है, तो पहले हमारी <Link href="/crop-image">Crop Image</Link> टूल से फोटो के फालतू हिस्से को काट (crop) लें। अगर फॉर्म में खास dimensions जैसे (3.5cm x 4.5cm) मांगे गए हैं, तो <Link href="/resize-image">Resize Image Tool</Link> का उपयोग करें।
        </p>

        <h2 lang="hi">5. अगर फोटो 100KB से ज्यादा है तो क्या करें?</h2>
        <p lang="hi">
          अगर वेबसाइट आपको "File size too large" का एरर दे रही है, तो इसका मतलब है कि आपकी फोटो 100KB से बड़ी है। बस हमारे <Link href="/photo-100kb">Photo 100KB Tool</Link> का उपयोग करके उसे सही साइज में लाएं।
        </p>

        <h2 lang="hi">6. अगर फोटो पहले से छोटी है तो क्या करें?</h2>
        <p lang="hi">
          अगर आपकी फोटो 20KB या 30KB की है और फॉर्म में 50KB से 100KB के बीच फोटो मांगी गई है, तो आपको फोटो दोबारा खींचनी पड़ सकती है, क्योंकि छोटे साइज की फोटो को बड़ा करने पर वह धुंधली हो जाती है।
        </p>
        
        <h2 lang="hi">7. फाइनल upload से पहले file size check</h2>
        <p lang="hi">
          अपलोड करने से पहले अपनी नई फोटो की प्रॉपर्टीज चेक कर लें कि वह सच में 100KB से कम और JPG/JPEG फॉर्मेट में है या नहीं।
        </p>

        <h2 lang="hi">8. 20KB, 50KB, 100KB और 200KB फोटो टूल्स</h2>
        <p lang="hi">
          अलग-अलग फॉर्म्स में अलग साइज लिमिट्स होती हैं। आपकी सुविधा के लिए हमारे पास कई टूल्स उपलब्ध हैं:
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
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-200kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 200KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
            <li><Link href="/guides/signature-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सिग्नेचर को 20KB में कैसे करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी फोटो को 100KB करने के लिए तैयार हैं?</h3>
          <Link href="/photo-100kb" className="btn btn--primary btn--lg">
            फोटो को 100KB में करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
