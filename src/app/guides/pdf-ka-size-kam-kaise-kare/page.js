import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'PDF का Size कम कैसे करें? Free PDF Compressor',
  description: 'मोबाइल या कंप्यूटर से PDF का साइज कम कैसे करें, इसका सबसे आसान तरीका जानें। हमारे Free PDF Compressor Tool से मिनटों में फाइल का साइज कम करें।',
  path: '/guides/pdf-ka-size-kam-kaise-kare',
});

export default function PDFSizeKamKaiseKareGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'PDF का Size कम कैसे करें?', href: '/guides/pdf-ka-size-kam-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'PDF का size कैसे कम करें?',
      a: 'आप Shivashutosh Labs के "Compress PDF" टूल का इस्तेमाल करके किसी भी PDF फाइल का साइज आसानी से कम कर सकते हैं। बस फाइल अपलोड करें और "Compress" पर क्लिक करें।'
    },
    {
      q: 'मोबाइल में PDF का size कैसे कम करें?',
      a: 'हमारा टूल मोबाइल के ब्राउज़र में भी शानदार तरीके से काम करता है। आपको कोई ऐप इंस्टॉल करने की जरूरत नहीं है; बस वेबसाइट खोलें और फाइल अपलोड करें।'
    },
    {
      q: 'PDF compress करने से quality खराब होगी क्या?',
      a: 'नहीं, हमारा स्मार्ट कंप्रेशन टूल इस तरह काम करता है कि फाइल का साइज कम हो जाए लेकिन टेक्स्ट और इमेजेस की क्वालिटी पढ़ने लायक बनी रहे।'
    },
    {
      q: 'बड़ी scanned PDF का size कैसे कम करें?',
      a: 'स्कैन किए गए डॉक्युमेंट्स अक्सर कई MB के होते हैं। "Compress PDF" टूल बैकग्राउंड में इमेजेस को ऑप्टिमाइज़ कर देता है जिससे पूरी PDF का साइज काफी कम हो जाता है।'
    },
    {
      q: 'PDF को 100KB कैसे करें?',
      a: 'अगर आपको अपनी फाइल ठीक 100KB से कम करनी है, तो आप हमारे खास PDF 100KB टूल का उपयोग कर सकते हैं। यह फॉर्म्स के लिए सबसे बेस्ट है।'
    },
    {
      q: 'PDF को 200KB कैसे करें?',
      a: '200KB की लिमिट के लिए हमारे PDF 200KB टूल का इस्तेमाल करें। बस फाइल अपलोड करें और वह अपने आप 200KB के अंदर सेट हो जाएगी।'
    },
    {
      q: 'PDF को 500KB कैसे करें?',
      a: '500KB साइज की जरूरत होने पर हमारा PDF 500KB टूल आपको बेस्ट रिजल्ट देगा। फाइल की क्वालिटी भी बरकरार रहेगी।'
    },
    {
      q: 'PDF compress करने के बाद size कैसे check करें?',
      a: 'जैसे ही प्रोसेस पूरा होगा, फाइल अपने आप डाउनलोड हो जाएगी। आप अपने मोबाइल या कंप्यूटर की गैलरी/फाइल मैनेजर में जाकर "Properties" या "Details" में उसका नया साइज चेक कर सकते हैं।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'PDF का Size कम कैसे करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/pdf-ka-size-kam-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>PDF का Size कम कैसे करें?</h1>
        
        <p lang="hi">
          चाहे आप कोई ईमेल भेज रहे हों, ऑनलाइन जॉब एप्लीकेशन भर रहे हों, या किसी पोर्टल पर डॉक्यूमेंट्स अपलोड कर रहे हों, बड़ी PDF फाइल्स हमेशा दिक्कत देती हैं। अक्सर "File size is too large" का एरर आ जाता है। इस गाइड में हम आपको बताएंगे कि <strong>PDF का size कम कैसे करें</strong> ताकि आप अपनी फाइल्स को बिना क्वालिटी खोए आसानी से शेयर या अपलोड कर सकें।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/compress-pdf" className="btn btn--primary btn--lg">
            PDF का Size कम करें →
          </Link>
        </div>

        <h2 lang="hi">PDF का size बड़ा क्यों होता है?</h2>
        <p lang="hi">
          PDF फाइल का साइज मुख्य रूप से दो कारणों से बड़ा होता है: 
          पहला, उसमें हाई-रिजॉल्यूशन इमेजेस का होना, और दूसरा, उसे सीधे स्कैनर या कैमरे से क्रिएट किया जाना। जब आप स्कैन करते हैं, तो हर पेज एक बड़ी फोटो की तरह सेव होता है, जिससे फाइल साइज कई MBs में चला जाता है।
        </p>

        <h2 lang="hi">PDF को compress करने का आसान तरीका</h2>
        <p lang="hi">
          PDF फाइल का साइज कम करना (Compress करना) बहुत ही सरल है:
        </p>
        <ol lang="hi">
          <li>अपने डिवाइस में <Link href="/compress-pdf">Compress PDF</Link> टूल खोलें।</li>
          <li><strong>"फाइल चुनें"</strong> बटन पर क्लिक करके अपनी PDF अपलोड करें।</li>
          <li>टूल फाइल को प्रोसेस करेगा और स्मार्ट तरीके से उसका साइज कम कर देगा।</li>
          <li>नई फाइल को डाउनलोड करें।</li>
        </ol>

        <h2 lang="hi">मोबाइल से PDF का size कैसे कम करें?</h2>
        <p lang="hi">
          मोबाइल में PDF का साइज कम करने के लिए किसी थर्ड-पार्टी ऐप की जरूरत नहीं है। बस अपने फोन के ब्राउज़र में हमारी वेबसाइट खोलें, फाइल चुनें, और यह उसी तेजी से काम करेगा जैसे कंप्यूटर पर करता है।
        </p>

        <h2 lang="hi">Specific Size Limit के लिए टूल्स</h2>
        <p lang="hi">
          अगर किसी फॉर्म या वेबसाइट ने स्पष्ट निर्देश दिए हैं कि फाइल का साइज एक निश्चित लिमिट (जैसे 100KB या 200KB) से कम होना चाहिए, तो आप हमारे इन खास टूल्स का इस्तेमाल कर सकते हैं:
        </p>
        <ul>
          <li><Link href="/pdf-100kb">PDF 100KB Tool</Link> — 100KB तक साइज कम करने के लिए।</li>
          <li><Link href="/pdf-200kb">PDF 200KB Tool</Link> — 200KB तक साइज कम करने के लिए।</li>
          <li><Link href="/pdf-500kb">PDF 500KB Tool</Link> — 500KB तक साइज कम करने के लिए।</li>
        </ul>

        <h2 lang="hi">Upload से पहले PDF कैसे check करें?</h2>
        <p lang="hi">
          एक बार जब आप PDF का साइज कम कर लें, तो अपलोड करने से पहले इन बातों का ध्यान रखें:
        </p>
        <ul>
          <li><strong>फाइल का साइज चेक करें:</strong> क्या यह मांगी गई लिमिट के अंदर है?</li>
          <li><strong>टेक्स्ट पढ़ें:</strong> क्या डॉक्यूमेंट में लिखा हुआ टेक्स्ट, नाम और मार्क्स साफ़ पढ़े जा रहे हैं?</li>
          <li><strong>इमेज क्लैरिटी:</strong> क्या फोटो और सिग्नेचर साफ दिखाई दे रहे हैं?</li>
        </ul>

        <h2 lang="hi">अगर PDF अभी भी बड़ी है तो क्या करें?</h2>
        <p lang="hi">
          अगर फाइल अभी भी बड़ी है, तो आप उसे फिर से Compress टूल में डालकर एक बार और प्रोसेस कर सकते हैं। हालांकि, ध्यान रखें कि बहुत ज्यादा बार कंप्रेस करने से क्वालिटी खराब हो सकती है। अगर फाइल में बहुत सारे पेज हैं जिनकी आपको जरूरत नहीं है, तो आप <Link href="/split-pdf">Split PDF</Link> टूल का उपयोग करके गैर-जरूरी पेजों को हटा सकते हैं।
        </p>

        <h2 lang="hi">हमारे अन्य PDF Tools</h2>
        <p lang="hi">
          हम ऑनलाइन डॉक्युमेंट्स के लिए कई सारे उपयोगी टूल्स प्रदान करते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/merge-pdf">Merge PDF</Link></li>
          <li><Link href="/split-pdf">Split PDF</Link></li>
          <li><Link href="/pdf-to-jpg">PDF to JPG</Link></li>
          <li><Link href="/jpg-to-pdf">JPG to PDF</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            अन्य PDF साइज लिमिट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-100kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 100KB में कैसे करें? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-200kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 200KB में कैसे करें? →</Link></li>
            <li><Link href="/guides/pdf-500kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF को 500KB में कैसे करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी PDF का साइज कम करने के लिए तैयार हैं?</h3>
          <Link href="/compress-pdf" className="btn btn--primary btn--lg">
            PDF का Size कम करें →
          </Link>
        </div>
      </main>
    </div>
  );
}
