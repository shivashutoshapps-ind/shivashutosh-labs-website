import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'PDF को JPG में कैसे बदलें? Free PDF to JPG Converter',
  description: 'मोबाइल या कंप्यूटर से PDF को JPG इमेजेस में कैसे बदलें, इसका सबसे आसान तरीका जानें। PDF के हर पेज को अलग फोटो के रूप में सेव करें।',
  path: '/guides/pdf-to-jpg-kaise-kare',
});

export default function PDFtoJPGKaiseKareGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'PDF को JPG में कैसे बदलें?', href: '/guides/pdf-to-jpg-kaise-kare' },
  ];

  const faqs = [
    {
      q: 'PDF को JPG में कैसे बदलें?',
      a: 'आप Shivashutosh Labs के "PDF to JPG" टूल का उपयोग करके किसी भी PDF फाइल को आसानी से फोटोज (JPG) में बदल सकते हैं। बस अपनी PDF अपलोड करें और Convert पर क्लिक करें।'
    },
    {
      q: 'मोबाइल में PDF को JPG कैसे बनाएं?',
      a: 'हमारा टूल बिना किसी ऐप के सीधे मोबाइल के ब्राउज़र में काम करता है। आप अपनी फाइल सेलेक्ट करके उसे इमेजेस में बदल सकते हैं, जो आपकी गैलरी या डाउनलोड फोल्डर में सेव हो जाएंगी।'
    },
    {
      q: 'क्या PDF के सभी pages JPG में बदल सकते हैं?',
      a: 'हाँ! टूल आपकी PDF फाइल के हर एक पेज को एक अलग JPG इमेज में बदल देगा।'
    },
    {
      q: 'PDF से JPG बनाने के बाद image quality कैसे check करें?',
      a: 'डाउनलोड की गई फोटोज को अपनी गैलरी या फोटो व्यूअर में खोलें और ज़ूम करके देखें कि टेक्स्ट और फोटो साफ दिखाई दे रहे हैं या नहीं।'
    },
    {
      q: 'PDF से JPG बनाने पर file size ज्यादा हो तो क्या करें?',
      a: 'अगर निकाली गई इमेजेस का साइज बहुत बड़ा है, तो आप उन्हें हमारे "Image Resize" टूल या किसी फोटो कंप्रेसर का उपयोग करके छोटा कर सकते हैं।'
    },
    {
      q: 'PDF को image में बदलने के बाद JPG files का क्या करें?',
      a: 'आप इन JPG फाइल्स को आसानी से WhatsApp पर भेज सकते हैं, सोशल मीडिया पर शेयर कर सकते हैं, या ऑनलाइन फॉर्म्स में अपलोड कर सकते हैं जहाँ केवल फोटो मांगी जाती है।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'PDF को JPG में कैसे बदलें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/pdf-to-jpg-kaise-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>PDF को JPG में कैसे बदलें?</h1>
        
        <p lang="hi">
          कई बार हमारे पास कोई ऐसा डॉक्यूमेंट PDF फाइल के रूप में होता है जिसे हमें WhatsApp पर शेयर करना होता है या किसी ऐसे ऑनलाइन फॉर्म में अपलोड करना होता है जो सिर्फ इमेजेस (फोटोज) ही सपोर्ट करता है। ऐसे में हमें उस PDF के पेजों को फोटो में बदलने की जरूरत पड़ती है। इस गाइड में हम आपको बताएंगे कि <strong>PDF को JPG में कैसे बदलें</strong>।
        </p>

        <div style={{ margin: 'var(--space-8) 0', textAlign: 'center' }}>
          <Link href="/pdf-to-jpg" className="btn btn--primary btn--lg">
            PDF को JPG में बदलें →
          </Link>
        </div>

        <h2 lang="hi">PDF to JPG Conversion क्या है?</h2>
        <p lang="hi">
          PDF फाइल एक सिंगल फाइल होती है जिसमें कई सारे पेजेस हो सकते हैं। जब हम उसे JPG में बदलते हैं, तो PDF का हर एक पेज एक अलग इमेज (फोटो) बन जाता है। इस तरह, अगर 5 पेज की PDF है, तो आपको 5 अलग-अलग फोटोज (JPG files) मिलेंगी।
        </p>

        <h2 lang="hi">मोबाइल या कंप्यूटर से PDF को JPG कैसे बनाएं?</h2>
        <p lang="hi">
          <Link href="/pdf-to-jpg">PDF to JPG टूल</Link> का इस्तेमाल करना बहुत आसान है। इसके लिए आपको कोई ऐप डाउनलोड करने की जरूरत नहीं है:
        </p>
        <ol lang="hi">
          <li>अपने ब्राउज़र में <Link href="/pdf-to-jpg">PDF to JPG Converter</Link> खोलें।</li>
          <li><strong>"PDF चुनें"</strong> (Select PDF) बटन पर क्लिक करें।</li>
          <li>अपनी डिवाइस से वह PDF फाइल अपलोड करें जिसे आप फोटो में बदलना चाहते हैं।</li>
          <li><strong>"Convert"</strong> बटन पर क्लिक करके प्रोसेस शुरू करें।</li>
          <li>कुछ ही सेकंड में आपका डॉक्यूमेंट कन्वर्ट हो जाएगा। तैयार हुई JPG इमेजेस को <strong>Download</strong> कर लें।</li>
        </ol>

        <h2 lang="hi">Multiple-page PDF का Output कैसे समझें?</h2>
        <p lang="hi">
          अगर आपकी PDF में कई पेजेस हैं, तो टूल हर पेज को एक अलग इमेज फाइल बना देगा। उदाहरण के लिए, अगर आपने 'notes.pdf' नाम की 3-पेज की फाइल अपलोड की है, तो डाउनलोड होने पर आपको 'notes-page1.jpg', 'notes-page2.jpg' जैसी अलग-अलग इमेजेस मिलेंगी।
        </p>

        <h2 lang="hi">Image Quality और Output Files कैसे Check करें?</h2>
        <p lang="hi">
          कन्वर्ट होने के बाद इमेजेस को अपनी गैलरी या कंप्यूटर में खोलें और चेक करें कि:
        </p>
        <ul>
          <li>क्या सभी पेजेस इमेज में बदल गए हैं?</li>
          <li>क्या इमेजेस साफ़ हैं और उनमें लिखा हुआ टेक्स्ट आसानी से पढ़ा जा रहा है?</li>
        </ul>

        <h2 lang="hi">अगर Output File Size ज्यादा हो तो क्या करें?</h2>
        <p lang="hi">
          PDF से बनी हुई JPG फाइल्स हाई क्वालिटी की होती हैं। अगर किसी इमेज का फाइल साइज बहुत ज्यादा है और आपको उसे किसी फॉर्म में अपलोड करना है (जहाँ साइज लिमिट दी गई हो), तो आप हमारे <Link href="/guides/pdf-ka-size-kam-kaise-kare">PDF का Size कम कैसे करें</Link> गाइड पढ़ सकते हैं, या सीधे इमेज एडिटर की मदद से उसे छोटा कर सकते हैं। अगर आपको इमेज को फिर से PDF में बनाना हो, तो आप <Link href="/jpg-to-pdf">JPG to PDF</Link> टूल का इस्तेमाल कर सकते हैं।
        </p>

        <h2 lang="hi">हमारे अन्य PDF Tools</h2>
        <p lang="hi">
          हम ऑनलाइन डॉक्युमेंट्स के लिए कई सारे उपयोगी टूल्स प्रदान करते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/jpg-to-pdf">JPG to PDF</Link></li>
          <li><Link href="/compress-pdf">Compress PDF</Link></li>
          <li><Link href="/merge-pdf">Merge PDF</Link></li>
          <li><Link href="/split-pdf">Split PDF</Link></li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 संबंधित गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            PDF से जुड़ी हमारी अन्य उपयोगी गाइड्स:
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/jpg-to-pdf-kaise-banaye" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>JPG को PDF कैसे बनाएं? →</Link></li>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/pdf-ka-size-kam-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>PDF का Size कम कैसे करें? →</Link></li>
          </ul>
        </div>

        <h2 lang="hi" style={{ marginTop: 'var(--space-10)' }}>अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <FAQAccordion faqs={faqs} />
        </div>

        <div style={{ margin: 'var(--space-10) 0', padding: 'var(--space-8)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
          <h3 lang="hi" style={{ marginBottom: 'var(--space-4)' }}>क्या आप अपनी PDF को फोटोज में बदलना चाहते हैं?</h3>
          <Link href="/pdf-to-jpg" className="btn btn--primary btn--lg">
            PDF को JPG में बदलें →
          </Link>
        </div>
      </main>
    </div>
  );
}
