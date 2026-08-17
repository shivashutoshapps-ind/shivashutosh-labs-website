import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'JPG को PDF कैसे बनाएं? Free JPG to PDF Converter',
  description: 'मोबाइल या कंप्यूटर से फोटो (JPG/PNG) को PDF में कैसे बदलें, इसका सबसे आसान तरीका जानें। कई फोटोज को एक साथ जोड़कर PDF फाइल बनाना सीखें।',
  path: '/guides/jpg-to-pdf-kaise-banaye',
});

export default function JPGtoPDFKaiseBanayeGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'JPG को PDF कैसे बनाएं?', href: '/guides/jpg-to-pdf-kaise-banaye' },
  ];

  const faqs = [
    {
      q: 'JPG को PDF कैसे बनाएं?',
      a: 'आप Shivashutosh Labs के "JPG to PDF" टूल का उपयोग करके किसी भी फोटो को आसानी से PDF में बदल सकते हैं। बस फोटो अपलोड करें और Convert पर क्लिक करें।'
    },
    {
      q: 'मोबाइल में JPG को PDF कैसे बनाएं?',
      a: 'हमारा टूल बिना किसी ऐप के सीधे मोबाइल ब्राउज़र में काम करता है। अपनी गैलरी से फोटो सेलेक्ट करें और एक क्लिक में PDF डाउनलोड करें।'
    },
    {
      q: 'क्या एक से ज्यादा JPG को एक PDF में जोड़ सकते हैं?',
      a: 'हाँ! आप एक साथ कई फोटोज (जैसे नोट्स के कई पेज या डॉक्यूमेंट्स) सेलेक्ट कर सकते हैं और टूल उन सभी को एक ही PDF फाइल में जोड़ देगा।'
    },
    {
      q: 'क्या PDF बनाने के बाद images का order बदला जा सकता है?',
      a: 'हाँ, टूल में फोटोज अपलोड करने के बाद आप उन्हें ड्रैग (खींच कर) करके उनका आर्डर बदल सकते हैं, ताकि PDF में पेजेस सही क्रम में आएं।'
    },
    {
      q: 'JPG से PDF बनाने के बाद file size कैसे check करें?',
      a: 'कन्वर्ट की गई PDF को डाउनलोड करने के बाद आप अपने फाइल मैनेजर या गैलरी में जाकर "Details" या "Properties" में फाइल का साइज चेक कर सकते हैं।'
    },
    {
      q: 'JPG को PDF बनाने के बाद size ज्यादा हो तो क्या करें?',
      a: 'अगर आपकी नई PDF फाइल का साइज बहुत बड़ा हो गया है, तो आप हमारे "Compress PDF" टूल का उपयोग करके उसका साइज बिना क्वालिटी खोए कम कर सकते हैं।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'JPG को PDF कैसे बनाएं?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/jpg-to-pdf-kaise-banaye',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>JPG को PDF कैसे बनाएं?</h1>
        
        <p lang="hi">
          अक्सर हमें अपने डॉक्युमेंट्स, नोट्स, या आइडेंटिटी कार्ड की फोटो (JPG या PNG फॉर्मेट) को किसी पोर्टल पर अपलोड करना होता है जहाँ सिर्फ PDF फॉर्मेट ही स्वीकार किया जाता है। इसके अलावा, कई इमेजेस को किसी के साथ शेयर करने के लिए उन्हें एक PDF फाइल में बांधना सबसे अच्छा तरीका होता है। इस गाइड में हम आपको बताएंगे कि <strong>JPG को PDF कैसे बनाएं</strong>, वो भी बिना क्वालिटी कम किए।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/jpg-to-pdf" className="btn btn--primary btn--lg">
            JPG को PDF में बदलें →
          </Link>
        </div>

        <h2 lang="hi">JPG को PDF में बदलना क्या है?</h2>
        <p lang="hi">
          सिंपल शब्दों में, JPG (या JPEG) एक इमेज फॉर्मेट है जिसमें हमारी आम फोटोज सेव होती हैं। जब हम JPG को PDF (Portable Document Format) में बदलते हैं, तो वे इमेजेस एक ऐसे डॉक्यूमेंट फॉर्मेट में पैक हो जाती हैं जिसे किसी भी डिवाइस पर बिना फॉर्मेटिंग बिगड़े खोला और प्रिंट किया जा सकता है।
        </p>

        <h2 lang="hi">मोबाइल या कंप्यूटर से JPG को PDF कैसे बनाएं?</h2>
        <p lang="hi">
          चाहे आप स्मार्टफोन इस्तेमाल कर रहे हों या लैपटॉप, <Link href="/jpg-to-pdf">JPG to PDF टूल</Link> का उपयोग करना बहुत आसान है:
        </p>
        <ol lang="hi">
          <li>अपने ब्राउज़र में <Link href="/jpg-to-pdf">JPG to PDF Converter</Link> खोलें।</li>
          <li><strong>"इमेज चुनें"</strong> (Select Images) बटन पर क्लिक करें।</li>
          <li>अपनी गैलरी या फोल्डर से उन फोटोज (JPG/PNG) को चुनें जिन्हें आप PDF बनाना चाहते हैं।</li>
          <li>जरूरत के अनुसार इमेजेस का क्रम (order) सेट करें।</li>
          <li><strong>"Convert to PDF"</strong> (PDF बनाएं) बटन पर क्लिक करें।</li>
          <li>प्रोसेसिंग पूरी होने के बाद, अपनी नई PDF फाइल डाउनलोड करें।</li>
        </ol>

        <h2 lang="hi">कई JPG images को एक PDF में कैसे जोड़ें?</h2>
        <p lang="hi">
          अगर आपके पास किसी किताब के कई पेज हैं या असाइनमेंट की 10 अलग-अलग फोटोज हैं, तो आप उन सभी को एक बार में सेलेक्ट कर सकते हैं। टूल में अपलोड होने के बाद, आप किसी भी फोटो को खींचकर (Drag & Drop) उसका स्थान बदल सकते हैं। पहला फोटो PDF का पहला पेज बनेगा और इसी तरह बाकी पेजेस सेट हो जाएंगे।
        </p>

        <h2 lang="hi">PDF बनाने से पहले Image Quality Check करना</h2>
        <p lang="hi">
          PDF में बदलने से पहले सुनिश्चित करें कि:
        </p>
        <ul>
          <li>फोटोज में लिखा हुआ टेक्स्ट साफ़ दिखाई दे रहा है।</li>
          <li>इमेजेस सही एंगल में हैं (उल्टी नहीं हैं)।</li>
          <li>डॉक्यूमेंट का कोई जरूरी हिस्सा कटा हुआ नहीं है।</li>
        </ul>

        <h2 lang="hi">Upload से पहले PDF File Size कैसे Check करें?</h2>
        <p lang="hi">
          अगर आप PDF को किसी सरकारी फॉर्म या जॉब एप्लीकेशन के लिए बना रहे हैं, तो डाउनलोड करने के बाद उसका साइज जरूर चेक कर लें (फाइल पर राइट-क्लिक करके Properties देखें या मोबाइल में Details चेक करें)। 
        </p>

        <h2 lang="hi">PDF का Size ज्यादा हो जाए तो क्या करें?</h2>
        <p lang="hi">
          अगर आपने हाई-क्वालिटी कैमरे से खींची गई 5-6 फोटोज को मिलाकर PDF बनाई है, तो फाइल का साइज 10MB या उससे ज्यादा भी हो सकता है। ऐसे में घबराने की जरूरत नहीं है, आप हमारी <Link href="/guides/pdf-ka-size-kam-kaise-kare">PDF का Size कम कैसे करें</Link> गाइड पढ़ सकते हैं और <Link href="/compress-pdf">Compress PDF</Link> टूल से इसका साइज छोटा कर सकते हैं।
        </p>

        <h2 lang="hi">हमारे अन्य उपयोगी Tools</h2>
        <p lang="hi">
          PDF से संबंधित अन्य कार्यों के लिए हमारे टूल्स का उपयोग करें:
        </p>
        <ul lang="hi">
          <li><Link href="/pdf-to-jpg">PDF to JPG</Link></li>
          <li><Link href="/compress-pdf">Compress PDF</Link></li>
          <li><Link href="/merge-pdf">Merge PDF</Link></li>
          <li><Link href="/pdf-100kb">PDF 100KB Tool</Link></li>
          <li><Link href="/pdf-200kb">PDF 200KB Tool</Link></li>
          <li><Link href="/pdf-500kb">PDF 500KB Tool</Link></li>
        </ul>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी इमेजेस को PDF में बदलने के लिए तैयार हैं?</h3>
          <Link href="/jpg-to-pdf" className="btn btn--primary btn--lg">
            JPG को PDF में बदलें →
          </Link>
        </div>
      </main>
    </div>
  );
}
