import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'Exam Form Photo Size Kaise Kam Kare? Photo Resize Guide | Shivashutosh Labs',
  description: 'Exam, admission या online application form में photo upload नहीं हो रहा? Photo का KB, dimensions, crop और background सही करके upload-ready photo कैसे बनाएं, जानें।',
  path: '/guides/exam-form-photo-size-kaise-kam-kare',
});

export default function ExamFormPhotoSizeGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'एग्जाम फॉर्म फोटो साइज', href: '/guides/exam-form-photo-size-kaise-kam-kare' },
  ];

  const faqs = [
    {
      q: 'एग्जाम फॉर्म में फोटो अक्सर क्यों रिजेक्ट हो जाती है?',
      a: 'फोटो रिजेक्ट होने के मुख्य कारण होते हैं: बैकग्राउंड सही न होना (अक्सर सफेद या हल्का बैकग्राउंड चाहिए होता है), फोटो का साइज (KB) फॉर्म की लिमिट से ज्यादा होना, और चेहरे का स्पष्ट न दिखना (जैसे चश्मा या टोपी पहनना)।'
    },
    {
      q: 'क्या मैं मोबाइल से खींची गई फोटो को एग्जाम फॉर्म में लगा सकता हूँ?',
      a: 'हां, बिल्कुल। बस ध्यान रखें कि फोटो अच्छी रोशनी में खींची गई हो, आपका चेहरा कैमरे के बिल्कुल सामने हो, और पीछे का पर्दा या दीवार एकदम साफ और एक रंग (preferable white/light) का हो।'
    },
    {
      q: 'फोटो के डायमेंशन्स (Width x Height) और KB साइज में क्या अंतर है?',
      a: 'डायमेंशन्स फोटो की लंबाई और चौड़ाई (जैसे 3.5cm x 4.5cm या पिक्सेल्स) को दर्शाते हैं, जबकि KB साइज उस फोटो फाइल का डिजिटल वजन (जैसे 20KB या 50KB) होता है। दोनों का सही होना जरूरी है।'
    },
    {
      q: 'अगर फोटो बहुत धुंधली (Blur) हो जाए तो क्या करूं?',
      a: 'फोटो का KB साइज कम करने से पहले हमेशा फालतू बैकग्राउंड (extra whitespace) को क्रॉप करें। क्रॉप करने के बाद कंप्रेस करने से फोटो का रेजोल्यूशन बचता है और चेहरा धुंधला नहीं होता।'
    },
    {
      q: 'मैं अपनी फोटो का साइज 20KB या 50KB कैसे करूँ?',
      a: 'आप बिना किसी क्वालिटी लॉस के हमारे "Photo 20KB" या "Photo 50KB" टूल्स का इस्तेमाल कर सकते हैं। बस फोटो अपलोड करें, और टूल ऑटोमैटिक तरीके से उसे सही साइज में कंप्रेस कर देगा।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'Exam Form के लिए Photo का Size कैसे कम करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/exam-form-photo-size-kaise-kam-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>Exam Form के लिए Photo का Size कैसे कम करें?</h1>
        
        <p lang="hi">
          जब आप किसी नौकरी, एडमिशन, स्कॉलरशिप, या कॉम्पिटिटिव एग्जाम का ऑनलाइन फॉर्म भरते हैं, तो सबसे ज्यादा समय <strong>पासपोर्ट साइज फोटो अपलोड</strong> करने में लगता है। "File Size Too Large", "Invalid Dimensions", या "Blurry Image" जैसे एरर्स बहुत आम हैं। इस गाइड में हम आपको बताएंगे कि कैसे आप अपनी साधारण फोटो को एक <strong>upload-ready exam form photo</strong> में बदल सकते हैं, जिसमें क्रॉपिंग से लेकर KB कम करने तक का पूरा तरीका शामिल है।
        </p>

        <p lang="hi" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          ध्यान दें: फोटो का साइज, डायमेंशन्स और बैकग्राउंड के नियम हर एग्जाम (जैसे SSC, UPSC, IBPS, NTA) के लिए अलग होते हैं। कभी भी किसी एक "यूनिवर्सल नियम" पर भरोसा न करें। फॉर्म भरने से पहले हमेशा अपने एग्जाम की <strong>Official Notification</strong> जरूर पढ़ें।
        </p>

        <h2 lang="hi">1. Exam form में photo क्यों reject होती है?</h2>
        <p lang="hi">
          फॉर्म रिजेक्शन से बचने के लिए यह समझना जरूरी है कि गलतियां कहां होती हैं:
        </p>
        <ul lang="hi">
          <li><strong>गहरा या रंगीन बैकग्राउंड:</strong> कई एग्जाम्स में केवल सफेद या हल्के ग्रे बैकग्राउंड की मांग होती है।</li>
          <li><strong>चेहरा साफ न दिखना:</strong> चेहरे पर परछाईं होना, या चश्मा/टोपी पहनना।</li>
          <li><strong>गलत साइज (KB):</strong> फाइल फॉर्म की दी गई अधिकतम सीमा (Max Limit) से बड़ी या न्यूनतम सीमा (Min Limit) से छोटी होना।</li>
          <li><strong>गलत डायमेंशन्स (Dimensions):</strong> फोटो का आस्पेक्ट रेशियो (जैसे 3.5cm x 4.5cm) सही न होना, जिससे अपलोड करने पर फोटो खिंच (stretch) जाती है।</li>
        </ul>

        <h2 lang="hi">2. Official photo requirements पहले कैसे check करें?</h2>
        <p lang="hi">
          फोटो तैयार करने से पहले, नोटिफिकेशन में इन तीन चीजों को नोट कर लें:
        </p>
        <ul lang="hi">
          <li><strong>File Size (KB):</strong> जैसे 20KB - 50KB, या 50KB - 100KB.</li>
          <li><strong>Dimensions/Resolution:</strong> चौड़ाई (Width) और ऊंचाई (Height) पिक्सेल्स या सेंटीमीटर में।</li>
          <li><strong>Format:</strong> .jpg, .jpeg, या .png (आमतौर पर .jpg ही मान्य होता है)।</li>
        </ul>

        <h2 lang="hi">3. Photo का KB और dimensions क्या होते हैं?</h2>
        <p lang="hi">
          <strong>डायमेंशन्स (Dimensions)</strong> आपकी फोटो के फ्रेम को तय करते हैं—कि फोटो कितनी चौड़ी और कितनी लंबी होगी। <strong>KB (Kilobytes)</strong> आपकी फोटो फाइल का मेमोरी साइज होता है। अगर फोटो में बहुत ज्यादा डिटेल्स और कलर्स (high resolution) हैं, तो उसका KB साइज बड़ा होगा, भले ही डायमेंशन्स छोटे हों।
        </p>

        <h2 lang="hi">4. Mobile से सही photo कैसे तैयार करें?</h2>
        <p lang="hi">
          आपको स्टूडियो जाने की जरूरत नहीं है। मोबाइल से सही फोटो के लिए:
        </p>
        <ol lang="hi">
          <li>किसी साफ सफेद दीवार के सामने खड़े हों।</li>
          <li>सामने से आने वाली प्राकृतिक रोशनी (जैसे खिड़की के पास) में फोटो खिंचवाएं ताकि चेहरे पर चमक या परछाईं न आए।</li>
          <li>सीधे कैमरे में देखें, दोनों कान स्पष्ट दिखने चाहिए।</li>
        </ol>

        <h2 lang="hi">5. Extra background/whitespace कैसे crop करें?</h2>
        <p lang="hi">
          फोटो खींचने के बाद, उसमें से अतिरिक्त जगह हटाना पहला कदम है। केवल सिर से लेकर कंधों (head and shoulders) तक का हिस्सा रखें। आप इसके लिए हमारे <Link href="/crop-image">Crop Image टूल</Link> का उपयोग कर सकते हैं।
        </p>

        <h2 lang="hi">6. Photo dimensions कैसे सही करें?</h2>
        <p lang="hi">
          क्रॉप करने के बाद अगर आपको एग्जैक्ट पिक्सेल्स (जैसे 350 x 450 px) सेट करने हैं, तो <Link href="/resize-image">Resize Image टूल</Link> का उपयोग करें। यह सुनिश्चित करता है कि फॉर्म में फोटो अपलोड करते समय वह पिचके या अजीब न दिखे।
        </p>

        <h2 lang="hi">7. Photo का KB कैसे कम करें?</h2>
        <p lang="hi">
          सबसे अंतिम स्टेप होता है फाइल का वजन (KB) कम करना। यह काम कम्प्रेशन (Compression) कहलाता है। फोटो क्वालिटी बनाए रखते हुए फाइल का साइज कम करने के लिए, आपको सही टूल चुनना होगा जो आपकी फॉर्म की आवश्यकता से मेल खाता हो।
        </p>

        <h2 lang="hi">8. 20KB / 50KB / 100KB / 200KB requirement होने पर क्या करें?</h2>
        <p lang="hi">
          आपकी नोटिफिकेशन में जो भी साइज मांगा गया है, आप उसके अनुसार सीधे हमारे विशेष टूल्स का उपयोग कर सकते हैं:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', margin: 'var(--space-6) 0' }}>
          <Link href="/photo-20kb" className="btn btn-outline" style={{ textAlign: 'center', padding: 'var(--space-3)' }}>Photo 20KB</Link>
          <Link href="/photo-50kb" className="btn btn-outline" style={{ textAlign: 'center', padding: 'var(--space-3)' }}>Photo 50KB</Link>
          <Link href="/photo-100kb" className="btn btn-outline" style={{ textAlign: 'center', padding: 'var(--space-3)' }}>Photo 100KB</Link>
          <Link href="/photo-200kb" className="btn btn-outline" style={{ textAlign: 'center', padding: 'var(--space-3)' }}>Photo 200KB</Link>
        </div>

        <h2 lang="hi">9. Photo blur होने से कैसे बचाएं?</h2>
        <p lang="hi">
          यह एक बहुत आम समस्या है। याद रखें, एक छोटी फाइल हमेशा एक अच्छी फाइल नहीं होती। अगर आप बिना <strong>Crop</strong> किए सीधे फाइल को 20KB में कम्प्रेस करेंगे, तो चेहरा बहुत धुंधला हो जाएगा। इसलिए, हमेशा पहले फालतू बैकग्राउंड हटाएं (क्रॉप करें) और फिर KB कम करें। इससे पिक्सेल्स सिर्फ आपके चेहरे पर केंद्रित रहते हैं।
        </p>

        <h2 lang="hi">10. Upload से पहले final checklist</h2>
        <ul lang="hi">
          <li>क्या फोटो फॉर्म की साइज लिमिट (जैसे Max 50KB) के अंदर है?</li>
          <li>क्या बैकग्राउंड ऑफिशियल रूल्स के अनुसार है?</li>
          <li>क्या आपका चेहरा, दोनों कान और आंखें स्पष्ट रूप से दिखाई दे रही हैं?</li>
          <li>क्या फाइल .jpg फॉर्मेट में है?</li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड और टूल्स</h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-signature-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सिग्नेचर साइज कम करने की गाइड →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-50kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 50KB तक कैसे सेट करें →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-100kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 100KB तक कैसे सेट करें →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/form-tools" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सभी Form Tools देखें →</Link></li>
            <li><Link href="/student-tools" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Student Tools एक्सेस करें →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

      </main>
    </div>
  );
}
