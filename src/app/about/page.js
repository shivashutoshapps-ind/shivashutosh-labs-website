import { buildBaseMetadata } from '@/lib/metadata';

export const metadata = buildBaseMetadata({
  title: 'About Shivashutosh Labs',
  description: 'Learn about Shivashutosh Labs, a digital tools & productivity platform for everyday users.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="main-content" className="container section">
      <div className="prose" style={{ margin: '0 auto', maxWidth: '800px' }}>
        <h1>About Shivashutosh Labs</h1>
        <p>
          <strong>English:</strong> Shivashutosh Labs is a digital tools and productivity platform dedicated to building simple, accessible, and fast utilities for everyday users. We believe that essential digital tasks—like processing documents or preparing official forms—should not require complex software or expensive subscriptions.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> शिवशुतोष लैब्स एक डिजिटल टूल्स और उत्पादकता प्लेटफॉर्म है जो रोज़मर्रा के उपयोगकर्ताओं के लिए सरल, सुलभ और तेज़ उपयोगिताओं के निर्माण के लिए समर्पित है। हमारा मानना है कि आवश्यक डिजिटल कार्यों के लिए जटिल सॉफ़्टवेयर या महंगी सदस्यता की आवश्यकता नहीं होनी चाहिए।
        </p>

        <h2>Our Approach (हमारा दृष्टिकोण)</h2>
        <p>
          <strong>English:</strong> Our approach is user-first. We focus on building web-based tools that are lightweight, secure, and privacy-respecting. Where possible, files are processed directly on your device to ensure maximum security.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> हमारा दृष्टिकोण उपयोगकर्ता-प्रथम है। हम ऐसे वेब-आधारित टूल बनाने पर ध्यान केंद्रित करते हैं जो हल्के, सुरक्षित और गोपनीयता का सम्मान करने वाले हों। जहाँ तक संभव हो, अधिकतम सुरक्षा सुनिश्चित करने के लिए फ़ाइलों को सीधे आपके डिवाइस पर प्रोसेस किया जाता है।
        </p>

        <h2>The SLabs AI PDF Product Family</h2>
        <p>
          <strong>English:</strong> Shivashutosh Labs is the creator of the SLabs AI PDF product family. SLabs AI PDF offers a suite of document management utilities, enabling users to seamlessly manipulate, merge, and convert PDFs directly from their devices.
        </p>
        <p lang="hi">
          <strong>हिंदी:</strong> शिवशुतोष लैब्स SLabs AI PDF उत्पाद परिवार का निर्माता है। SLabs AI PDF दस्तावेज़ प्रबंधन उपयोगिताओं का एक सुइट प्रदान करता है, जिससे उपयोगकर्ता सीधे अपने डिवाइस से PDF को हेरफेर, मर्ज और कनवर्ट कर सकते हैं।
        </p>
      </div>
    </main>
  );
}
