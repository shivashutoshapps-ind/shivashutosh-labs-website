import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'फोटो को 50KB में कैसे करें? Free Photo Compressor',
  description: 'सरकारी फॉर्म, परीक्षा और ऑनलाइन आवेदन के लिए फोटो को 50KB में कम करने का आसान तरीका जानें। Free Photo 50KB Tool से फोटो का साइज कम करें।',
  path: '/guides/photo-50kb-kaise-kare',
});

export default function Photo50KBGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'फोटो को 50KB कैसे करें?', href: '/guides/photo-50kb-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'फोटो को 50KB कैसे करें?',
      a: 'Shivashutosh Labs के Photo 50KB Tool का उपयोग करके आप बिना किसी तकनीकी जानकारी के अपनी फोटो को 50KB से कम साइज में बदल सकते हैं।'
    },
    {
      q: 'क्या मोबाइल से फोटो 50KB कर सकते हैं?',
      a: 'हाँ, हमारा टूल मोबाइल-फ्रेंडली है। आप अपने मोबाइल ब्राउज़र से सीधे गैलरी की फोटो अपलोड करके उसे 50KB में सेव कर सकते हैं।'
    },
    {
      q: 'फोटो 50KB करने पर quality खराब होगी?',
      a: 'अगर ओरिजिनल फोटो का साइज बहुत ज्यादा (जैसे 5MB) है, तो थोड़ा फर्क पड़ सकता है। लेकिन हमारे स्मार्ट कंप्रेशन से फॉर्म्स में अपलोड करने लायक स्पष्टता बनी रहती है।'
    },
    {
      q: 'क्या हर सरकारी फॉर्म के लिए 50KB फोटो जरूरी है?',
      a: 'नहीं, हर फॉर्म की आवश्यकता अलग होती है। कुछ में 20KB, कुछ में 50KB और कुछ में 100KB मांगा जाता है। हमेशा फॉर्म की official notification चेक करें।'
    },
    {
      q: 'फोटो 50KB से कम हो जाए तो क्या करें?',
      a: 'अगर फॉर्म में 50KB अधिकतम (maximum) सीमा है, तो फोटो 30KB या 40KB की भी हो सकती है। लेकिन अगर न्यूनतम (minimum) सीमा 20KB है, तो फोटो 20KB से 50KB के बीच होनी चाहिए।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'फोटो को 50KB में कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/photo-50kb-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>फोटो को 50KB में कैसे करें?</h1>
        
        <p lang="hi">
          भारत में सरकारी नौकरियों, यूनिवर्सिटी एडमिशन और विभिन्न प्रकार के ऑनलाइन फॉर्म्स भरते समय आपको अपनी पासपोर्ट साइज फोटो अपलोड करनी होती है। अक्सर इन फॉर्म्स में फोटो का फाइल साइज 50KB तक सीमित होता है। इस गाइड में हम आपको बताएंगे कि अपनी फोटो को बिना परेशानी के 50KB कैसे बनाएं।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/photo-50kb" className="btn btn--primary btn--lg">
            फोटो को 50KB में करें →
          </Link>
        </div>

        <h2 lang="hi">1. फोटो को 50KB कैसे करें?</h2>
        <p lang="hi">
          अपनी फोटो का फाइल साइज 50KB तक कम करना बहुत ही आसान है:
        </p>
        <ol lang="hi">
          <li>अपने मोबाइल या कंप्यूटर में <Link href="/photo-50kb">Photo 50KB Tool</Link> खोलें।</li>
          <li>अपनी ओरिजिनल फोटो को सेलेक्ट करके अपलोड करें।</li>
          <li>हमारा टूल फोटो को प्रोसेस करेगा।</li>
          <li>प्रोसेसिंग के बाद, 50KB से कम साइज वाली नई फोटो को डाउनलोड करें।</li>
        </ol>

        <h2 lang="hi">2. फोटो को 50KB करने की जरूरत कब पड़ती है?</h2>
        <p lang="hi">
          अधिकतर ऑनलाइन आवेदन पत्रों में सर्वर पर जगह बचाने के लिए फोटो के फाइल साइज की एक लिमिट तय की जाती है। यदि फॉर्म के निर्देशों में लिखा है कि फोटो का साइज "Maximum 50KB" होना चाहिए, तो आपको फोटो को 50KB या उससे कम करना होगा।
        </p>
        <p lang="hi" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          ध्यान दें: हमेशा उस विशेष फॉर्म या नोटिफिकेशन की आधिकारिक निर्देशों (official notification) का पालन करें।
        </p>

        <h2 lang="hi">3. मोबाइल से फोटो 50KB कैसे करें?</h2>
        <p lang="hi">
          फोटो का साइज कम करने के लिए आपको कंप्यूटर या लैपटॉप की जरूरत नहीं है। आप सीधे अपने मोबाइल के ब्राउज़र में हमारे टूल को खोलकर, गैलरी से फोटो चुन सकते हैं और उसे 50KB में सेव कर सकते हैं।
        </p>

        <h2 lang="hi">4. फोटो का size कम करने पर quality क्यों बदलती है?</h2>
        <p lang="hi">
          फाइल साइज कम करने (Compression) का मतलब है फोटो से कुछ अतिरिक्त डेटा हटाना। अगर आप 5MB की फोटो को सीधे 50KB में बदलते हैं, तो क्वालिटी कम हो सकती है। बेहतर क्वालिटी के लिए, आप पहले हमारी <Link href="/crop-image">Crop Image</Link> टूल से फोटो के बेकार हिस्से को काट (crop) सकते हैं और फिर साइज कम कर सकते हैं।
        </p>

        <h2 lang="hi">5. फोटो upload करने से पहले क्या check करें?</h2>
        <ul lang="hi">
          <li><strong>फाइल का साइज:</strong> क्या नई फोटो 50KB से छोटी है?</li>
          <li><strong>चेहरा (Face Visibility):</strong> क्या फोटो में आपका चेहरा साफ दिख रहा है? फॉर्म्स में धुंधली फोटो रिजेक्ट हो सकती है।</li>
          <li><strong>डायमेंशन्स (Dimensions):</strong> अगर फॉर्म में खास dimensions जैसे (3.5cm x 4.5cm) मांगे गए हैं, तो पहले <Link href="/resize-image">Resize Image Tool</Link> का उपयोग करें।</li>
        </ul>

        <h2 lang="hi">6. अगर फोटो 50KB से ज्यादा है तो क्या करें?</h2>
        <p lang="hi">
          अगर आपकी फोटो 50KB से बड़ी है और वेबसाइट उसे स्वीकार नहीं कर रही है, तो बस हमारे <Link href="/photo-50kb">Photo 50KB Tool</Link> का उपयोग करके उसे सही साइज में लाएं।
        </p>

        <h2 lang="hi">7. 20KB और 50KB फोटो में क्या अंतर है?</h2>
        <p lang="hi">
          20KB की फोटो 50KB की तुलना में ज्यादा छोटी होती है, इसलिए उसमें क्वालिटी थोड़ी कम हो सकती है। कुछ फॉर्म्स में फोटो के लिए 50KB और सिग्नेचर के लिए 20KB की लिमिट होती है। यदि आपको सिग्नेचर का साइज भी कम करना है, तो आप हमारा <Link href="/signature-20kb">Signature 20KB Tool</Link> या <Link href="/photo-20kb">Photo 20KB Tool</Link> इस्तेमाल कर सकते हैं।
        </p>

        <h2 lang="hi">8. फोटो को 100KB या 200KB करना हो तो क्या करें?</h2>
        <p lang="hi">
          अगर आपके फॉर्म में ज्यादा साइज लिमिट दी गई है, तो आप हमारे अन्य टूल्स का उपयोग कर सकते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/photo-100kb">Photo 100KB Tool</Link></li>
          <li><Link href="/photo-200kb">Photo 200KB Tool</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 अन्य गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अन्य साइज लिमिट्स और रिक्वायरमेंट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 20KB में कैसे करें? →</Link></li>
            <li><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी फोटो को 50KB करने के लिए तैयार हैं?</h3>
          <Link href="/photo-50kb" className="btn btn--primary btn--lg">
            फोटो को 50KB में करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
