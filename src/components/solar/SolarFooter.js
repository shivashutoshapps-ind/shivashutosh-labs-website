import React from 'react';
import Link from 'next/link';
import styles from './SolarFooter.module.css';

export default function SolarFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          {/* Col 1: Brand Info */}
          <div className={styles.colBrand}>
            <div className={styles.brandRow}>
              <div className={styles.logoBadge}>☀️</div>
              <div>
                <h3 className={styles.brandTitle}>शिवआशुतोष सोलर सिस्टम्स</h3>
                <span className={styles.brandSub}>SHIVASHUTOSH SOLAR SYSTEMS</span>
              </div>
            </div>
            <p className={styles.tagline}>
              &quot;हर घर सौर ऊर्जा, हर घर खुशहाली&quot;
            </p>
            <p className={styles.parentOrg}>
              शिवआशुतोष लैब्स (Shivashutosh Labs) का एक समर्पित हरित ऊर्जा उपक्रम। अलीगढ़ एवं संपूर्ण उत्तर प्रदेश के घरों और व्यावसायिक प्रतिष्ठानों को सोलर समाधान समर्पित।
            </p>
          </div>

          {/* Col 2: Contact & Service Area */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>संपर्क एवं सेवा क्षेत्र</h4>
            <ul className={styles.contactList}>
              <li>
                <strong>हेल्पलाइन / फोन:</strong>{' '}
                <a href="tel:9719543259" className={styles.link}>
                  9719543259
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/919719543259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  +91 9719543259
                </a>
              </li>
              <li>
                <strong>वेबसाइट:</strong>{' '}
                <a href="https://shivashutoshlabs.com/solarsystem" className={styles.link}>
                  shivashutoshlabs.com/solarsystem
                </a>
              </li>
              <li>
                <strong>प्राथमिक सेवा क्षेत्र:</strong> अलीगढ़, हाथरस, मथुरा, आगरा, बुलंदशहर, कासगंज, एटा एवं उत्तर प्रदेश।
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>त्वरित लिंक (Quick Links)</h4>
            <ul className={styles.linkList}>
              <li><a href="#hero" className={styles.link}>होम (Home)</a></li>
              <li><a href="#packages" className={styles.link}>सोलर पैकेज (Solar Packages)</a></li>
              <li><a href="#subsidy" className={styles.link}>सरकारी सब्सिडी (PM Surya Ghar)</a></li>
              <li><a href="#why-us" className={styles.link}>विशेषताएं (Why Choose Us)</a></li>
              <li><a href="#process" className={styles.link}>स्थापना प्रक्रिया (Installation Process)</a></li>
              <li><a href="#gallery" className={styles.link}>गैलरी (Installation Gallery)</a></li>
              <li><a href="#faq" className={styles.link}>अक्सर पूछे जाने वाले सवाल (FAQ)</a></li>
              <li><a href="#enquiry-form" className={styles.link}>मुफ्त साइट सर्वे बुक करें</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>कानूनी एवं नीतियां</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy" className={styles.link}>
                  गोपनीयता नीति (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  उपयोग की शर्तें (Terms of Use)
                </Link>
              </li>
              <li>
                <a
                  href="https://pmsuryaghar.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  पीएम सूर्य घर आधिकारिक पोर्टल ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 9: Mandatory Legal Disclaimers */}
        <div className={styles.disclaimerBox}>
          <h5 className={styles.disclaimerHeading}>महत्वपूर्ण कानूनी अस्वीकरण (Important Legal Disclaimers):</h5>
          <p className={styles.disclaimerText}>
            <strong>* प्रभावी लागत ₹0 तक:</strong> प्रभावी लागत ₹0 तक का अर्थ है कि लागू सरकारी सब्सिडी एवं ग्राहक की पात्रता के बाद अनुमानित प्रभावी लागत शून्य तक हो सकती है। वास्तविक लागत, ग्राहक का भुगतान, सिस्टम कॉन्फिगरेशन और सब्सिडी स्वीकृति योजना की शर्तों एवं ग्राहक की स्थिति पर निर्भर करेंगे।
          </p>
          <p className={styles.disclaimerText}>
            <strong>* वारंटी नियम:</strong> सोलर पैनल की परफॉर्मेंस वारंटी निर्माता की नियम एवं शर्तों के अनुसार लागू होगी। इन्वर्टर और बैटरी की वारंटी अलग-अलग होगी।
          </p>
          <p className={styles.disclaimerText}>
            <strong>* सब्सिडी स्वीकृति:</strong> सरकारी सब्सिडी सीधे भारत सरकार के नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) और संबंधित डिस्कॉम द्वारा निर्धारित नियमों, बजट और तकनीकी मानकों के अनुसार स्वीकृत की जाती है। शिवआशुतोष सोलर सिस्टम्स सब्सिडी प्रक्रिया में पूर्ण सहयोग प्रदान करता है परंतु किसी भी ग्राहक को सरकारी स्वीकृति का स्वतंत्र गारंटीकृत दावा नहीं करता।
          </p>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © {currentYear} Shivashutosh Solar Systems (A division of Shivashutosh Labs). सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
}

