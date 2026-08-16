import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StructuredData, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/components/seo/StructuredData';

export const metadata = buildBaseMetadata({
  title: 'सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें? Free Photo Resizer',
  description: 'सरकारी नौकरी, परीक्षा और ऑनलाइन फॉर्म के लिए फोटो का साइज कम करने का आसान तरीका जानें। 20KB, 50KB, 100KB और 200KB फोटो तैयार करें।',
  path: '/guides/sarkari-form-photo-size-kaise-kam-kare',
});

export default function SarkariFormPhotoSizeGuide() {
  const breadcrumbItems = [
    { label: 'होम', href: '/' },
    { label: 'गाइड', href: '/guides' },
    { label: 'सरकारी फॉर्म फोटो साइज', href: '/guides/sarkari-form-photo-size-kaise-kam-kare' },
  ];

  const faqs = [
    {
      q: 'सरकारी फॉर्म के लिए फोटो कितने KB की होनी चाहिए?',
      a: 'यह form या application की official requirement पर निर्भर करता है। आमतौर पर 20KB, 50KB या 100KB की लिमिट होती है, लेकिन हमेशा official notification चेक करें।'
    },
    {
      q: 'क्या मोबाइल से फोटो का size कम कर सकते हैं?',
      a: 'हाँ, Shivashutosh Labs के सभी photo size tools मोबाइल-फ्रेंडली हैं। आप अपने मोबाइल ब्राउज़र से सीधे फोटो अपलोड करके साइज कम कर सकते हैं।'
    },
    {
      q: '20KB और 50KB में कौन सा tool इस्तेमाल करें?',
      a: 'यह इस बात पर निर्भर करता है कि आपके फॉर्म में maximum file size कितना मांगा गया है। अगर फॉर्म में max 50KB लिखा है, तो Photo 50KB टूल का उपयोग करें। अगर max 20KB है, तो Photo 20KB टूल चुनें।'
    },
    {
      q: 'फोटो का KB कम करने से quality खराब होगी?',
      a: 'फाइल साइज बहुत ज्यादा कम करने पर (जैसे 5MB से 20KB) थोड़ी quality कम हो सकती है, लेकिन हमारे टूल्स स्मार्ट कंप्रेशन का उपयोग करते हैं जिससे फोटो धुंधली न हो और फॉर्म में आसानी से accept हो जाए।'
    },
    {
      q: 'फोटो का KB कम करने के साथ size/dimensions भी बदल सकते हैं?',
      a: 'हाँ, अगर फॉर्म में विशेष dimensions (जैसे 132x170 pixels) मांगे गए हैं, तो KB कम करने से पहले हमारे Resize Image टूल का उपयोग करके डायमेंशन बदल सकते हैं।'
    }
  ];

  const structuredData = [
    buildBreadcrumbSchema(breadcrumbItems),
    buildFAQSchema(faqs),
    buildArticleSchema({
      title: 'सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें?',
      description: metadata.description,
      url: 'https://shivashutoshlabs.com/guides/sarkari-form-photo-size-kaise-kam-kare',
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
        <h1 lang="hi" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें?</h1>
        
        <p lang="hi">
          जब आप कोई भी सरकारी नौकरी, परीक्षा या ऑनलाइन फॉर्म भरते हैं, तो सबसे बड़ी समस्या फोटो और सिग्नेचर अपलोड करने में आती है। हर फॉर्म की अपनी अलग आवश्यकताएं होती हैं, जैसे:
        </p>
        <ul lang="hi">
          <li><strong>Maximum file size</strong> (जैसे 20KB, 50KB या 100KB)</li>
          <li><strong>Image format</strong> (आमतौर पर JPG या JPEG)</li>
          <li><strong>Image dimensions</strong> (width और height पिक्सल में)</li>
          <li><strong>Photograph clarity</strong> (चेहरा साफ दिखना चाहिए)</li>
        </ul>

        <p lang="hi" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
          ध्यान दें: जिस फॉर्म या notification में फोटो upload करनी है, उसकी official instructions को final authority मानें।
        </p>

        <h2 lang="hi">सरकारी फॉर्म के लिए फोटो का साइज कैसे कम करें?</h2>
        <p lang="hi">
          ऑनलाइन फॉर्म के लिए सही साइज की फोटो तैयार करना आसान है। बस इन स्टेप्स को फॉलो करें:
        </p>
        <ol lang="hi">
          <li><strong>Form की photo requirement देखें:</strong> सबसे पहले चेक करें कि फॉर्म में कितने KB की फोटो मांगी गई है।</li>
          <li><strong>Required maximum KB पहचानें:</strong> अगर लिमिट 50KB है, तो फोटो का साइज 50KB से कम होना चाहिए।</li>
          <li><strong>अपनी photo select करें:</strong> अपने मोबाइल या कंप्यूटर से साफ़ फोटो चुनें।</li>
          <li><strong>सही Shivashutosh Labs size tool चुनें:</strong> जरूरत के अनुसार <Link href="/photo-20kb">Photo 20KB</Link>, <Link href="/photo-50kb">Photo 50KB</Link>, या <Link href="/photo-100kb">Photo 100KB</Link> टूल पर जाएं।</li>
          <li><strong>Photo compress करें:</strong> फोटो अपलोड करें और टूल अपने आप साइज कम कर देगा।</li>
          <li><strong>Final file size और clarity check करें:</strong> डाउनलोड करने से पहले देखें कि फोटो साफ है या नहीं।</li>
          <li><strong>Form में upload करें:</strong> तैयार की गई फोटो को अपने फॉर्म में सुरक्षित रूप से अपलोड करें।</li>
        </ol>

        <h2 lang="hi">फोटो कितने KB की करनी है?</h2>
        <p lang="hi">
          फोटो का साइज पूरी तरह से उस विशेष फॉर्म पर निर्भर करता है जिसे आप भर रहे हैं। आपकी सुविधा के लिए, हमने अलग-अलग लिमिट के अनुसार टूल्स बनाए हैं:
        </p>
        
        <div style={{ overflowX: 'auto', marginBottom: 'var(--space-6)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: 'var(--space-3)' }}>Requirement (Maximum Size)</th>
                <th style={{ padding: 'var(--space-3)' }}>Recommended Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Max 20KB</td>
                <td style={{ padding: 'var(--space-3)' }}><Link href="/photo-20kb" style={{ fontWeight: 'bold' }}>Photo 20KB Tool →</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Max 50KB</td>
                <td style={{ padding: 'var(--space-3)' }}><Link href="/photo-50kb" style={{ fontWeight: 'bold' }}>Photo 50KB Tool →</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Max 100KB</td>
                <td style={{ padding: 'var(--space-3)' }}><Link href="/photo-100kb" style={{ fontWeight: 'bold' }}>Photo 100KB Tool →</Link></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-3)' }}>Max 200KB</td>
                <td style={{ padding: 'var(--space-3)' }}><Link href="/photo-200kb" style={{ fontWeight: 'bold' }}>Photo 200KB Tool →</Link></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p lang="hi">
          <em>(यदि आपको विशेष रूप से 20KB की फोटो बनानी है, तो हमारी विस्तृत <Link href="/guides/photo-20kb-kaise-kare">फोटो को 20KB में कैसे करें</Link> गाइड पढ़ें।)</em>
        </p>

        <h2 lang="hi">मोबाइल से सरकारी फॉर्म की फोटो कैसे तैयार करें?</h2>
        <p lang="hi">
          आपको किसी लैपटॉप या कंप्यूटर की जरूरत नहीं है। मोबाइल से फोटो तैयार करने का प्रोसेस बहुत ही आसान है:
        </p>
        <ul lang="hi">
          <li><strong>Mobile browser खोलें</strong> (जैसे Chrome)।</li>
          <li><strong>Photo tool पर जाएं</strong> (जैसे Photo 50KB)।</li>
          <li><strong>Select photo:</strong> अपनी गैलरी से फोटो चुनें।</li>
          <li><strong>Compress/resize:</strong> टूल अपने आप साइज सेट कर देगा।</li>
          <li><strong>Download:</strong> नई फाइल को अपने फोन में सेव करें।</li>
          <li><strong>Upload to form:</strong> फॉर्म वाले पेज पर जाकर फाइल अपलोड कर दें।</li>
        </ul>

        <h2 lang="hi">सिर्फ KB कम करना काफी है?</h2>
        <p lang="hi">
          नहीं, सिर्फ KB (file size) कम करना हमेशा काफी नहीं होता। फॉर्म रिजेक्ट न हो इसके लिए इन बातों का भी ध्यान रखें:
        </p>
        <ul lang="hi">
          <li><strong>Required dimensions:</strong> क्या फॉर्म में width और height (जैसे 3.5cm x 4.5cm) मांगी गई है?</li>
          <li><strong>Required format:</strong> क्या फाइल JPG, JPEG या PNG में होनी चाहिए?</li>
          <li><strong>Photo clarity:</strong> फोटो धुंधली (blur) नहीं होनी चाहिए।</li>
          <li><strong>Background:</strong> बैकग्राउंड हल्का या सफेद होना चाहिए।</li>
          <li><strong>Face visibility:</strong> आपका चेहरा और दोनों कान साफ दिखने चाहिए।</li>
        </ul>

        <h2 lang="hi">फोटो बहुत बड़ी है तो क्या करें?</h2>
        <p lang="hi">
          यदि आपके मोबाइल के कैमरे से ली गई फोटो का साइज 5MB या 10MB है, तो सीधे उसे छोटे साइज में कन्वर्ट करें। अपनी जरूरत के अनुसार टूल चुनें:
        </p>
        <ul lang="hi">
          <li>लिमिट 20KB है? <Link href="/photo-20kb">Photo 20KB</Link> का उपयोग करें।</li>
          <li>लिमिट 50KB है? <Link href="/photo-50kb">Photo 50KB</Link> का उपयोग करें।</li>
          <li>लिमिट 100KB है? <Link href="/photo-100kb">Photo 100KB</Link> का उपयोग करें।</li>
          <li>लिमिट 200KB है? <Link href="/photo-200kb">Photo 200KB</Link> का उपयोग करें।</li>
        </ul>

        <h2 lang="hi">फोटो का dimension भी बदलना है?</h2>
        <p lang="hi">
          कई बार फॉर्म में फोटो के पिक्सल (dimensions) भी फिक्स होते हैं। इसके लिए आप इन टूल्स का उपयोग कर सकते हैं:
        </p>
        <ul lang="hi">
          <li><Link href="/resize-image"><strong>Resize Image:</strong></Link> इसका मतलब है dimensions (width और height) बदलना। इससे फोटो का साइज (KB) भी बदलता है।</li>
          <li><Link href="/crop-image"><strong>Crop Image:</strong></Link> इसका मतलब है फोटो का फालतू (unwanted) हिस्सा काटकर हटाना, जिससे केवल आपका चेहरा और कंधे फोकस में रहें।</li>
        </ul>

        <h2 lang="hi">फोटो upload नहीं हो रही तो क्या check करें?</h2>
        <p lang="hi">
          अगर साइज कम करने के बाद भी फोटो अपलोड नहीं हो रही है, तो इन बातों को चेक करें:
        </p>
        <ul lang="hi">
          <li><strong>File size limit:</strong> क्या आपकी फाइल मांगी गई अधिकतम लिमिट से सच में कम है?</li>
          <li><strong>Format:</strong> क्या आपने सही फॉर्मेट (जैसे .jpg) अपलोड किया है?</li>
          <li><strong>Dimensions:</strong> क्या फोटो की चौड़ाई और ऊंचाई फॉर्म की शर्तों के अनुसार है?</li>
          <li><strong>Filename:</strong> कुछ फॉर्म्स में फोटो के नाम में स्पेस (space) या स्पेशल कैरेक्टर (special characters) अलाउड नहीं होते (जैसे <code>my_photo.jpg</code> सही है)।</li>
          <li><strong>Internet/browser issue:</strong> कभी-कभी ब्राउज़र की कुकीज़ या धीमे इंटरनेट के कारण अपलोड फेल हो जाता है।</li>
        </ul>

        <div style={{ margin: 'var(--space-8) 0', padding: 'var(--space-6)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <h3 lang="hi" style={{ fontSize: '1.125rem', marginBottom: 'var(--space-2)' }}>📖 अन्य गाइड पढ़ें</h3>
          <p lang="hi" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            सिग्नेचर और अन्य रिक्वायरमेंट्स के बारे में जानने के लिए हमारी विस्तृत गाइड्स पढ़ें।
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}><Link href="/guides/photo-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>फोटो को 20KB में कैसे करें? →</Link></li>
            <li><Link href="/guides/signature-20kb-kaise-kare" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>सिग्नेचर को 20KB में कैसे करें? →</Link></li>
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
