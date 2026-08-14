import { buildBaseMetadata } from '@/lib/metadata';

export const metadata = buildBaseMetadata({
  title: 'Privacy Policy - Shivashutosh Labs',
  description: 'Privacy Policy (गोपनीयता नीति) for Shivashutosh Labs and SLabs AI PDF tools.',
  path: '/privacy',
});

export default function PrivacyPolicy() {
  return (
    <main id="main-content" className="container section">
      <div className="prose" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <h1>Privacy Policy / गोपनीयता नीति</h1>
        
        <h2>1. Data Processing (डेटा प्रोसेसिंग)</h2>
        <p>
          <strong>English:</strong> All PDF, Image, and Form processing on SLabs AI PDF is performed locally on your device where possible. If server processing is required, your files are strictly used only for the requested operation and are immediately deleted after processing. We do not store, analyze, or share your documents.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> SLabs AI PDF पर सभी PDF, इमेज और फॉर्म प्रोसेसिंग जहाँ तक संभव हो, आपके डिवाइस पर स्थानीय रूप से की जाती है। यदि सर्वर प्रोसेसिंग की आवश्यकता होती है, तो आपकी फ़ाइलें केवल आपके अनुरोधित कार्य के लिए उपयोग की जाती हैं और प्रोसेसिंग के तुरंत बाद हटा दी जाती हैं। हम आपके दस्तावेज़ों को सहेजते, उनका विश्लेषण करते या उन्हें साझा नहीं करते हैं।
        </p>

        <h2>2. User Information Collection (उपयोगकर्ता जानकारी संग्रह)</h2>
        <p>
          <strong>English:</strong> We do not require account creation for basic tools. We collect minimal analytics data to improve our services and understand feature usage. This data is anonymized and does not include personally identifiable information unless explicitly provided for support or premium features.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> बुनियादी उपकरणों के लिए खाता बनाने की आवश्यकता नहीं है। हम अपनी सेवाओं को बेहतर बनाने और सुविधाओं के उपयोग को समझने के लिए न्यूनतम एनालिटिक्स डेटा एकत्र करते हैं। यह डेटा गुमनाम होता है और इसमें व्यक्तिगत पहचान योग्य जानकारी शामिल नहीं होती है, जब तक कि वह स्पष्ट रूप से समर्थन या प्रीमियम सुविधाओं के लिए प्रदान न की गई हो।
        </p>

        <h2>3. Third-party Services (तृतीय-पक्ष सेवाएं)</h2>
        <p>
          <strong>English:</strong> We may use trusted third-party services for analytics, hosting, and AI capabilities. These providers are strictly vetted and are bound by confidentiality agreements. They do not have the right to use your data beyond providing the specific service to Shivashutosh Labs.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> हम एनालिटिक्स, होस्टिंग और AI क्षमताओं के लिए विश्वसनीय तृतीय-पक्ष सेवाओं का उपयोग कर सकते हैं। इन प्रदाताओं की सख्ती से जांच की जाती है और वे गोपनीयता समझौतों से बंधे होते हैं। उन्हें शिवशुतोष लैब्स को विशिष्ट सेवा प्रदान करने से परे आपके डेटा का उपयोग करने का कोई अधिकार नहीं है।
        </p>

        <h2>4. Security (सुरक्षा)</h2>
        <p>
          <strong>English:</strong> We implement industry-standard security measures, including SSL encryption, to protect your data during transmission. While we strive for maximum security, no internet transmission is 100% secure, and we advise users to avoid processing highly sensitive government or financial documents on public networks.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> हम ट्रांसमिशन के दौरान आपके डेटा की सुरक्षा के लिए SSL एन्क्रिप्शन सहित उद्योग-मानक सुरक्षा उपाय लागू करते हैं। यद्यपि हम अधिकतम सुरक्षा के लिए प्रयास करते हैं, इंटरनेट पर कोई भी ट्रांसमिशन 100% सुरक्षित नहीं है, और हम उपयोगकर्ताओं को सार्वजनिक नेटवर्क पर अत्यधिक संवेदनशील सरकारी या वित्तीय दस्तावेज़ों को प्रोसेस करने से बचने की सलाह देते हैं।
        </p>
        
        <h2>5. Contact (संपर्क)</h2>
        <p>
          <strong>English:</strong> For privacy-related inquiries, please use our <a href="/contact">Contact Page</a>.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> गोपनीयता संबंधी पूछताछ के लिए, कृपया हमारे <a href="/contact">संपर्क पृष्ठ (Contact Page)</a> का उपयोग करें।
        </p>
      </div>
    </main>
  );
}
