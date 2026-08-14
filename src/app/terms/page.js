import { buildBaseMetadata } from '@/lib/metadata';

export const metadata = buildBaseMetadata({
  title: 'उपयोग की शर्तें (Terms of Use)',
  description: 'SLabs AI PDF के उपयोग की शर्तें।',
});

export default function TermsPage() {
  return (
    <main id="main-content" className="container section">
      <div className="prose" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <h1 lang="hi">उपयोग की शर्तें (Terms of Use)</h1>
        <p><strong>अंतिम अपडेट:</strong> अगस्त 2026</p>

        <h2 lang="hi">1. स्वीकृति (Acceptance)</h2>
        <p lang="hi">
          SLabs AI PDF का उपयोग करके, आप इन शर्तों को स्वीकार करते हैं। यह वेबसाइट 
          पूरी तरह से निःशुल्क है और इसका उद्देश्य छात्रों और पेशेवरों की मदद करना है।
        </p>

        <h2 lang="hi">2. सेवाओं की स्थिति (Status of Services)</h2>
        <p lang="hi">
          <strong>कृपया ध्यान दें:</strong> वर्तमान में इस वेबसाइट पर प्रदर्शित सभी 
          टूल्स (जैसे PDF Merge, Photo Resizer आदि) केवल जानकारी के लिए हैं और अभी 
          "Coming Soon" (जल्द आ रहे हैं) की स्थिति में हैं। वर्तमान में कोई भी टूल 
          कार्यशील (functional) नहीं है। 
        </p>

        <h2 lang="hi">3. वारंटी (No Warranty)</h2>
        <p lang="hi">
          यह वेबसाइट "जैसी है" (As is) के आधार पर प्रदान की जाती है। हम किसी भी तरह 
          की कोई गारंटी या वारंटी प्रदान नहीं करते हैं। 
        </p>

        <h2 lang="hi">4. कोई अकाउंट या शुल्क नहीं (No Accounts or Fees)</h2>
        <p lang="hi">
          SLabs AI PDF पर किसी भी सेवा का उपयोग करने के लिए कोई खाता बनाने की आवश्यकता 
          नहीं है। हम कोई सशुल्क सदस्यता (paid subscription) या सेवा नहीं देते हैं।
        </p>
      </div>
    </main>
  );
}
