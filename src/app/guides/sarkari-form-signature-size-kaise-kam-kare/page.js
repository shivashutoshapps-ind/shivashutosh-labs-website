import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'Sarkari Form Signature Size Kaise Kam Kare? Signature Resize Guide | Shivashutosh Labs',
  description: 'सरकारी/ऑनलाइन आवेदन फॉर्म में signature upload नहीं हो रहा, तो signature को सही size, dimensions, background और KB में कैसे तैयार करें? Mobile से 20KB limit में crop/resize/compress करें।',
  path: '/guides/sarkari-form-signature-size-kaise-kam-kare',
});

export default function SarkariFormSignatureSizeGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'सरकारी फॉर्म सिग्नेचर साइज', href: '/guides/sarkari-form-signature-size-kaise-kam-kare' },
  ];

  const faqs = [
    {
      q: 'सरकारी फॉर्म में signature upload क्यों नहीं होता है?',
      a: 'आमतौर पर signature रिजेक्ट होने के तीन मुख्य कारण होते हैं: 1) फाइल का साइज (KB) तय लिमिट से बड़ा होना, 2) बैकग्राउंड डार्क या लाइन वाला होना, 3) डायमेंशन (width/height) सही ना होना।'
    },
    {
      q: 'सिग्नेचर के लिए नीले या काले पेन में से कौन सा बेहतर है?',
      a: 'हमेशा फॉर्म के official notification को चेक करें। हालांकि, 90% से अधिक सरकारी परीक्षाओं और फॉर्मों में सफेद बिना लाइन वाले कागज पर काले (Black) पेन से किए गए सिग्नेचर को प्राथमिकता दी जाती है।'
    },
    {
      q: 'मैं अपने मोबाइल से सिग्नेचर का साइज कैसे कम करूँ?',
      a: 'आप बिना किसी ऐप के मोबाइल ब्राउज़र से सीधे सिग्नेचर का साइज कम कर सकते हैं। बस सफेद कागज पर सिग्नेचर की फोटो लें, उसे Crop Image टूल से क्रॉप करें और फिर Signature 20KB टूल का उपयोग करके साइज सेट करें।'
    },
    {
      q: 'अगर मेरा सिग्नेचर धुंधला (blur) हो गया है तो क्या करूँ?',
      a: 'अगर 20KB करने पर सिग्नेचर ब्लर हो रहा है, तो पहले सिग्नेचर के आसपास की खाली जगह (extra space) को क्रॉप करें। इससे कम KB में भी पिक्सेल क्वालिटी बेहतर बनी रहती है।'
    },
    {
      q: 'क्या सभी फॉर्म में 20KB सिग्नेचर ही मांगा जाता है?',
      a: 'नहीं। कुछ फॉर्म (जैसे SSC) में 10-20KB मांगा जाता है, जबकि कुछ राज्य स्तरीय फॉर्म में 50KB तक की छूट होती है। हमेशा अपने विशेष फॉर्म की गाइडलाइंस पढ़ें।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'सरकारी फॉर्म के लिए Signature का Size कैसे कम करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/sarkari-form-signature-size-kaise-kam-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>सरकारी फॉर्म के लिए Signature का Size कैसे कम करें?</h1>
        
        <p lang="hi">
          सरकारी या ऑनलाइन आवेदन फॉर्म भरते समय सबसे ज्यादा समस्या <strong>Signature (हस्ताक्षर)</strong> अपलोड करने में आती है। 
          "सरकारी/ऑनलाइन आवेदन फॉर्म में signature upload नहीं हो रहा, तो signature को सही size, dimensions, background और KB में कैसे तैयार करें?" यह एक आम सवाल है।
          अगर सिग्नेचर का साइज (KB), डाइमेंशन्स (Dimensions), या बैकग्राउंड सही नहीं है, तो फॉर्म रिजेक्ट भी हो सकता है।
        </p>
        
        <p lang="hi" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          ध्यान दें: हर एग्जाम और अथॉरिटी की सिग्नेचर रिक्वायरमेंट अलग होती है। कोई 20KB मांगता है तो कोई 50KB। फाइल फॉर्मेट, डाइमेंशन्स और पेन के रंग के लिए हमेशा फॉर्म के ऑफिशियल नोटिफिकेशन (Official Instructions) को ही अंतिम सत्य मानें।
        </p>

        <div style={{ textAlign: 'center', margin: 'var(--space-8) 0' }}>
          <Link href="/signature-20kb" className="btn btn-primary" style={{ padding: 'var(--space-4) var(--space-8)', fontSize: '1.125rem' }}>
            Signature को 20KB करें
          </Link>
        </div>

        <h2 lang="hi">1. सरकारी फॉर्म में signature की जरूरत क्यों होती है?</h2>
        <p lang="hi">
          सिग्नेचर आपकी पहचान (Identity) को प्रमाणित करता है। परीक्षा केंद्र (Exam Center) पर आपके द्वारा किए गए सिग्नेचर का मिलान आपके द्वारा ऑनलाइन अपलोड किए गए डिजिटल सिग्नेचर से किया जाता है। इसलिए इसका स्पष्ट (Clear) होना बहुत जरूरी है।
        </p>

        <h2 lang="hi">2. सही Paper और Background कैसे रखें?</h2>
        <p lang="hi">
          कभी भी लाइन वाले कागज (ruled notebook) पर साइन न करें। हमेशा एकदम <strong>सफेद और बिना लाइन वाले कागज (White unruled paper)</strong> का इस्तेमाल करें। इससे स्कैन करने पर बैकग्राउंड साफ आता है और सिग्नेचर स्पष्ट दिखता है।
        </p>

        <h2 lang="hi">3. Blue या Black Pen: कौन सा सही है?</h2>
        <p lang="hi">
          ज्यादातर सरकारी फॉर्मों (विशेषकर UPSC और SSC) में <strong>Black Ink Pen (काले पेन)</strong> से किए गए हस्ताक्षर को प्राथमिकता दी जाती है, क्योंकि स्कैन करने पर काला रंग सबसे स्पष्ट दिखाई देता है। फॉर्म निर्देशों में जो रंग (नीला या काला) लिखा हो, उसी का उपयोग करें।
        </p>

        <h2 lang="hi">4. Mobile से Signature की Photo कैसे लें?</h2>
        <ul lang="hi">
          <li>कागज को किसी समतल (flat) जगह पर रखें।</li>
          <li>पर्याप्त रोशनी (Natural light) में फोटो लें, ताकि कागज पर आपके फोन या हाथ की परछाईं (Shadow) न पड़े।</li>
          <li>कैमरे को बिल्कुल सीधा (Parallel) रखकर फोटो खींचें।</li>
        </ul>

        <h2 lang="hi">5. खाली Space/Background कैसे Crop करें?</h2>
        <p lang="hi">
          फोटो खींचने के बाद, सिग्नेचर के आस-पास का फालतू सफेद हिस्सा हटाना बहुत जरूरी है। इसके लिए आप हमारे <Link href="/crop-image"><strong>Crop Image Tool</strong></Link> का उपयोग कर सकते हैं। केवल उतना ही हिस्सा रखें जिसमें आपका सिग्नेचर हो।
        </p>

        <h2 lang="hi">6. Signature को सही Dimensions में कैसे Resize करें?</h2>
        <p lang="hi">
          कुछ फॉर्म्स में चौड़ाई (Width) और ऊंचाई (Height) फिक्स होती है, जैसे <code>4cm x 2cm</code> या <code>140 x 60 pixels</code>। 
          अगर आपको डायमेंशन बदलने हैं, तो <Link href="/resize-image"><strong>Resize Image Tool</strong></Link> का उपयोग करें और वहां exact pixels दर्ज करें।
        </p>

        <h2 lang="hi">7. Signature का KB Size कैसे कम करें?</h2>
        <p lang="hi">
          एक बार जब आप फोटो को क्रॉप कर लें, तो फाइल का साइज (KB) कम करना (Compress) होता है। इसके लिए आपको किसी ऐप की जरूरत नहीं है, सीधे ब्राउज़र में टूल खोलें और साइज सेट करें।
        </p>

        <h2 lang="hi">8. 20KB Requirement होने पर क्या करें?</h2>
        <p lang="hi">
          भारत में ज्यादातर फॉर्म (जैसे SSC) सिग्नेचर का साइज <strong>10KB से 20KB</strong> के बीच मांगते हैं। 
          विस्तृत स्टेप-बाय-स्टेप जानकारी के लिए हमारी स्पेशल गाइड <Link href="/guides/signature-20kb-kaise-kare">सिग्नेचर को 20KB में कैसे करें</Link> जरूर पढ़ें, या सीधे <Link href="/signature-20kb">Signature 20KB Tool</Link> का इस्तेमाल करें।
        </p>

        <h2 lang="hi">9. Signature बहुत Blur हो जाए तो क्या करें?</h2>
        <p lang="hi">
          फाइल साइज 20KB करने पर अगर सिग्नेचर धुंधला (blur) हो रहा है, तो इसका मतलब है कि फोटो में 'फालतू सफेद कागज' बहुत ज्यादा है। 
          पहले फालतू हिस्से को क्रॉप करें, फिर KB कम करें। इससे पिक्सल केवल सिग्नेचर पर फोकस करेंगे और क्वालिटी खराब नहीं होगी।
        </p>

        <h2 lang="hi">10. Mobile से Signature तैयार करने का पूरा तरीका</h2>
        <ol lang="hi">
          <li>सफेद कागज पर साइन करें और मोबाइल कैमरे से फोटो लें।</li>
          <li><Link href="/crop-image">Crop Tool</Link> से फालतू हिस्सा काट दें।</li>
          <li><Link href="/signature-20kb">Signature 20KB Tool</Link> में अपलोड करके साइज कम करें।</li>
          <li>तैयार फाइल को डाउनलोड करके फॉर्म में अपलोड करें।</li>
        </ol>

        <h2 lang="hi">11. Form Upload से पहले Final Checklist</h2>
        <ul lang="hi">
          <li>क्या साइज मांगी गई लिमिट (जैसे max 20KB) के अंदर है?</li>
          <li>क्या फॉर्मेट <strong>.jpg</strong> या <strong>.jpeg</strong> है? (जैसा फॉर्म में मांगा गया हो)</li>
          <li>क्या बैकग्राउंड बिल्कुल सफेद है?</li>
          <li>क्या सिग्नेचर आसानी से पढ़ा जा रहा है?</li>
        </ul>

        <h2 lang="hi">12. Common Rejection Reasons (सिग्नेचर क्यों रिजेक्ट होते हैं?)</h2>
        <ul lang="hi">
          <li><strong>Dark Background:</strong> कम रोशनी में फोटो लेने से बैकग्राउंड ग्रे या काला हो जाता है।</li>
          <li><strong>Too Small:</strong> सिग्नेचर पेज के एक छोटे से कोने में होता है और बाकी सिर्फ सफेद कागज होता है।</li>
          <li><strong>Capital Letters:</strong> कभी भी पूरा सिग्नेचर BLOCK LETTERS (कैपिटल लेटर्स) में न करें, यह अमान्य माना जाता है।</li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड और टूल्स</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अपने फॉर्म की तैयारी पूरी करने के लिए अन्य टूल्स और गाइड्स का भी उपयोग करें:
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? (Companion Guide) →</Link></li>
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
