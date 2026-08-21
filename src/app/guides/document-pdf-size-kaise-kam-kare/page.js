import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'Document PDF Size Kaise Kam Kare? Application PDF Compress Guide | Shivashutosh Labs',
  description: 'Online application form में marksheet, certificate या scanned document upload करने के लिए PDF का size कैसे कम करें? 100KB, 200KB, या 500KB तक free PDF compress करें और readability बचाएं।',
  path: '/guides/document-pdf-size-kaise-kam-kare',
});

export default function DocumentPdfSizeGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'डॉक्यूमेंट PDF साइज', href: '/guides/document-pdf-size-kaise-kam-kare' },
  ];

  const faqs = [
    {
      q: 'Application form में document PDF क्यों मांगी जाती है?',
      a: 'ऑनलाइन फॉर्म्स (जैसे नौकरी, परीक्षा, या एडमिशन) में आपकी योग्यता और पहचान प्रमाणित करने के लिए ओरिजिनल डॉक्यूमेंट्स (मार्कशीट, सर्टिफिकेट) की स्कैन कॉपी PDF फॉर्मेट में मांगी जाती है ताकि वह सुरक्षित रहे और आसानी से पढ़ी जा सके।'
    },
    {
      q: 'Marksheet या certificate PDF फाइल का साइज बड़ा क्यों हो जाता है?',
      a: 'जब हम मोबाइल या स्कैनर से हाई-क्वालिटी (high DPI) में डॉक्यूमेंट स्कैन करते हैं, तो इमेजेज का रेजोल्यूशन बहुत ज्यादा होता है, जिससे PDF फाइल का साइज कई MBs में बन जाता है।'
    },
    {
      q: 'क्या PDF का साइज कम करने से डॉक्यूमेंट धुंधला (blur) हो जाएगा?',
      a: 'अगर आप सही कंप्रेशन टूल का उपयोग करते हैं, तो 100KB या 200KB तक साइज कम करने पर भी डॉक्यूमेंट की readability (पढ़ने योग्यता) बनी रहती है। ज्यादा छोटे साइज (जैसे 50KB) में धुंधला होने का खतरा रहता है।'
    },
    {
      q: 'Multi-page PDF का साइज कैसे कम करें?',
      a: 'मल्टी-पेज PDF के लिए भी कंप्रेशन टूल्स काम करते हैं। आप हमारे Compress PDF टूल में अपनी फाइल अपलोड करके जरूरत के हिसाब से कंप्रेशन लेवल चुन सकते हैं।'
    },
    {
      q: 'मुझे कैसे पता चलेगा कि फॉर्म में कितने KB की PDF अपलोड करनी है?',
      a: 'हर एप्लीकेशन फॉर्म के "Official Notification" या "Important Instructions" सेक्शन में स्पष्ट रूप से लिखा होता है कि डॉक्यूमेंट अपलोड के लिए अधिकतम फाइल साइज (जैसे Max 200KB या 500KB) क्या होना चाहिए।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'Application Form के लिए Document PDF का Size कैसे कम करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/document-pdf-size-kaise-kam-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>Application Form के लिए Document PDF का Size कैसे कम करें?</h1>
        
        <p lang="hi">
          जब आप किसी ऑनलाइन जॉब, एग्जाम, एडमिशन या सरकारी एप्लीकेशन फॉर्म को भरते हैं, तो आपको अपनी मार्कशीट, सर्टिफिकेट या अन्य जरूरी डॉक्यूमेंट्स अपलोड करने होते हैं। अक्सर पोर्टल पर PDF फाइल का साइज 100KB, 200KB, या 500KB तक सीमित होता है। इस गाइड में हम जानेंगे कि मोबाइल से फ्री में <strong>Document PDF</strong> का साइज कैसे कम (compress) करें, जिससे फाइल आसानी से अपलोड हो जाए और उसकी readability भी बनी रहे।
        </p>

        <p lang="hi" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          ध्यान दें: Exact file-size limits, page limits, dimensions, format requirements and document rules vary by the specific application authority. हमेशा अपने फॉर्म की ऑफिशियल गाइडलाइन्स पहले पढ़ें। हम कोई यूनिवर्सल सरकारी नियम तय नहीं करते हैं।
        </p>

        <div style={{ textAlign: 'center', margin: 'var(--space-8) 0' }}>
          <Link href="/compress-pdf" className="btn btn-primary" style={{ padding: 'var(--space-4) var(--space-8)', fontSize: '1.125rem' }}>
            Document PDF Compress करें
          </Link>
        </div>

        <h2 lang="hi">1. Application form में document PDF क्यों मांगी जाती है</h2>
        <p lang="hi">
          एप्लीकेशन फॉर्म्स में ओरिजिनल डॉक्यूमेंट्स की स्कैन कॉपी PDF फॉर्मेट में इसलिए मांगी जाती है क्योंकि PDF फाइल किसी भी डिवाइस पर समान रूप से खुलती है, इसमें टेक्स्ट आसानी से पढ़ा जा सकता है और मल्टीपल पेजों को एक ही फाइल में सुरक्षित रखा जा सकता है।
        </p>

        <h2 lang="hi">2. Marksheet/certificate PDF बड़ी क्यों होती है</h2>
        <p lang="hi">
          मार्कशीट और सर्टिफिकेट में बहुत बारीक डिटेल्स, सील, और हस्ताक्षर होते हैं। जब इन्हें मोबाइल कैमरे या स्कैनर से हाई रेजोल्यूशन (High DPI) में स्कैन किया जाता है, तो इमेज का साइज बढ़ जाता है। इन्ही बड़ी इमेजेज से बनने वाली PDF फाइल का साइज भी स्वाभाविक रूप से कई MB का हो जाता है।
        </p>

        <h2 lang="hi">3. Mobile से document PDF कैसे बनाएं</h2>
        <p lang="hi">
          आप अपने स्मार्टफोन का उपयोग करके आसानी से डॉक्यूमेंट स्कैन कर सकते हैं। अपने डॉक्यूमेंट की अच्छी रोशनी में फोटो लें, अतिरिक्त हिस्से को क्रॉप करें और फिर हमारे <Link href="/guides/jpg-to-pdf-kaise-banaye">JPG to PDF गाइड</Link> को पढ़कर उसे PDF में बदल लें।
        </p>

        <h2 lang="hi">4. Existing PDF का size कैसे कम करें</h2>
        <p lang="hi">
          अगर आपके पास पहले से बनी हुई बड़ी PDF फाइल है, तो आपको बस उसे हमारे <Link href="/compress-pdf">Compress PDF टूल</Link> पर अपलोड करना है। टूल स्वचालित रूप से फाइल का साइज कम कर देगा बिना उसकी क्वालिटी को ज्यादा नुकसान पहुँचाए। यह तरीका <Link href="/guides/pdf-ka-size-kam-kaise-kare">सामान्य PDF फाइल का साइज कम करने</Link> के लिए भी उपयोगी है।
        </p>

        <h2 lang="hi">5. PDF को 100KB तक कैसे करें</h2>
        <p lang="hi">
          कई फॉर्म्स में आधार कार्ड या छोटे सर्टिफिकेट्स के लिए अधिकतम साइज 100KB रखा जाता है। इसके लिए आप सीधे हमारे <Link href="/pdf-100kb">PDF 100KB टूल</Link> का उपयोग कर सकते हैं। विस्तृत जानकारी के लिए <Link href="/guides/pdf-100kb-kaise-kare">PDF 100KB गाइड</Link> देखें।
        </p>

        <h2 lang="hi">6. PDF को 200KB तक कैसे करें</h2>
        <p lang="hi">
          10वीं, 12वीं की मार्कशीट या डिग्री सर्टिफिकेट्स के लिए अक्सर 200KB की लिमिट होती है। इस साइज लिमिट को पूरा करने के लिए <Link href="/pdf-200kb">PDF 200KB टूल</Link> का प्रयोग करें, या हमारी <Link href="/guides/pdf-200kb-kaise-kare">PDF 200KB गाइड</Link> से स्टेप्स समझें।
        </p>

        <h2 lang="hi">7. PDF को 500KB तक कैसे करें</h2>
        <p lang="hi">
          अगर आप कई पेजों वाली मार्कशीट (जैसे सभी सेमेस्टर्स की) या कोई बड़ा एप्लीकेशन डॉक्यूमेंट अपलोड कर रहे हैं, तो साइज लिमिट 500KB तक हो सकती है। इसे सेट करने के लिए <Link href="/pdf-500kb">PDF 500KB टूल</Link> बेहतरीन है (अधिक जानकारी के लिए <Link href="/guides/pdf-500kb-kaise-kare">PDF 500KB गाइड</Link> पढ़ें)।
        </p>

        <h2 lang="hi">8. Scanned documents की readability कैसे बचाएं</h2>
        <p lang="hi">
          फाइल साइज कम करते समय यह ध्यान रखना बहुत जरूरी है कि डॉक्यूमेंट पर लिखे गए नाम, रोल नंबर, और मार्क्स साफ-साफ पढ़े जा सकें। बहुत अधिक compress करने से फाइल धुंधली (blur) हो सकती है। इसलिए हमेशा उचित रेजोल्यूशन (जैसे 150-200 DPI) पर स्कैन करें और सही टूल का ही इस्तेमाल करें।
        </p>

        <h2 lang="hi">9. Multi-page PDF के लिए practical tips</h2>
        <p lang="hi">
          मल्टी-पेज डॉक्यूमेंट्स के लिए:
        </p>
        <ul lang="hi">
          <li>केवल जरूरी पेजों को ही स्कैन करें (blank पेजों को हटा दें)।</li>
          <li>सभी पेजों को एक समान क्वालिटी में स्कैन करें।</li>
          <li>कंप्रेस करने के बाद यह सुनिश्चित करें कि कोई भी पेज मिसिंग न হোক (miss)।</li>
        </ul>

        <h2 lang="hi">10. Compression के बाद PDF check कैसे करें</h2>
        <p lang="hi">
          साइज कम होने के बाद, फाइल को डाउनलोड करें और उसे अपने मोबाइल या लैपटॉप पर खोल कर देखें। ज़ूम इन (Zoom-in) करके देखें कि टेक्स्ट और स्टैम्प/सील स्पष्ट दिखाई दे रहे हैं या नहीं।
        </p>

        <h2 lang="hi">11. Upload से पहले final checklist</h2>
        <ul lang="hi">
          <li>क्या PDF का साइज फॉर्म की लिमिट के अंदर है (जैसे Max 200KB)?</li>
          <li>क्या फाइल का फॉर्मेट .pdf ही है?</li>
          <li>क्या पूरी फाइल बिना पासवर्ड के खुल रही है?</li>
          <li>क्या डॉक्यूमेंट के सभी पेज पढ़ने योग्य (readable) हैं?</li>
        </ul>

        <h2 lang="hi">12. Common upload/file-size errors</h2>
        <p lang="hi">
          अपलोड के समय कुछ आम एरर आ सकते हैं:
        </p>
        <ul lang="hi">
          <li><strong>"File size exceeds limit":</strong> इसका मतलब आपकी फाइल बहुत बड़ी है। इसे फिर से compress करें।</li>
          <li><strong>"Invalid file format":</strong> इसका मतलब पोर्टल केवल PDF स्वीकार कर रहा है, जबकि आपकी फाइल JPG या कोई और फॉर्मेट है।</li>
          <li><strong>"File is password protected":</strong> फॉर्म पोर्टल्स एनक्रिप्टेड (encrypted) फाइलें स्वीकार नहीं करते, पासवर्ड हटाकर ही अपलोड करें।</li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड और टूल्स</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अपने फॉर्म की तैयारी पूरी करने के लिए अन्य टूल्स और गाइड्स का भी उपयोग करें:
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-photo-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/sarkari-form-signature-size-kaise-kam-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सरकारी फॉर्म के लिए सिग्नेचर का साइज कैसे कम करें? →</Link></li>
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
