'use client';

import React from 'react';
import styles from './SolarSubsidy.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarSubsidy() {
  const handlePortalClick = () => {
    trackEvent('outbound_portal_click', { destination: 'pmsuryaghar.gov.in' });
  };

  const handleFormScroll = () => {
    trackEvent('site_survey_click', { location: 'subsidy_section' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="subsidy" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badgeWrap}>
            <span className={styles.badge}>सरकारी योजना जानकारी</span>
            <span className={styles.officialTag}>भारत सरकार — नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE)</span>
          </div>
          <h2 className={styles.heading}>
            पीएम सूर्य घर: मुफ्त बिजली योजना — संपूर्ण सब्सिडी विवरण
          </h2>
          <p className={styles.subtext}>
            भारत सरकार द्वारा आवासीय रूफटॉप सोलर को बढ़ावा देने के लिए ऐतिहासिक सब्सिडी योजना। जानें कि आपको कितनी सब्सिडी मिल सकती है और आवेदन की सही प्रक्रिया क्या है।
          </p>
        </div>

        {/* Subsidy Slab Cards Grid */}
        <div className={styles.slabsGrid}>
          <div className={styles.slabCard}>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>1 KW सिस्टम</span>
              <span className={styles.loadType}>छोटे परिवार / 2-3 पंखे + लाइट</span>
            </div>
            <div className={styles.slabAmount}>
              ₹30,000 <span className={styles.slabLabel}>तक केंद्रीय सब्सिडी*</span>
            </div>
            <p className={styles.slabDesc}>
              आवासीय ग्रिड-कनेक्टेड रूफटॉप सोलर पर केंद्र सरकार द्वारा डीबीटी (DBT) के माध्यम से देय।
            </p>
          </div>

          <div className={styles.slabCard}>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>2 KW सिस्टम</span>
              <span className={styles.loadType}>मध्यम परिवार / फ्रिज + टीवी + पंखे</span>
            </div>
            <div className={styles.slabAmount}>
              ₹60,000 <span className={styles.slabLabel}>तक केंद्रीय सब्सिडी*</span>
            </div>
            <p className={styles.slabDesc}>
              2 किलोवाट तक के ऑन-ग्रिड आवासीय सिस्टम पर सरकार द्वारा निर्धारित मानक सब्सिडी दर।
            </p>
          </div>

          <div className={`${styles.slabCard} ${styles.slabHighlight}`}>
            <div className={styles.popularBadge}>सर्वाधिक लोकप्रिय</div>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>3 KW या अधिक</span>
              <span className={styles.loadType}>1.5 टन एसी + फ्रिज + वाशिंग मशीन</span>
            </div>
            <div className={styles.slabAmount}>
              ₹78,000 <span className={styles.slabLabel}>तक अधिकतम केंद्रीय सब्सिडी*</span>
            </div>
            <p className={styles.slabDesc}>
              3 किलोवाट या उससे अधिक क्षमता के ग्रिड-कनेक्टेड आवासीय रूफटॉप सोलर पर अधिकतम केंद्रीय वित्तीय सहायता (CFA)।
            </p>
          </div>
        </div>

        {/* Information Grid: What, Who, Documents, Process */}
        <div className={styles.infoGrid}>
          {/* Box 1: What & Who */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>❓</span> पीएम सूर्य घर योजना क्या है और कौन पात्र है?
            </h3>
            <p className={styles.infoText}>
              <strong>पीएम सूर्य घर: मुफ्त बिजली योजना</strong> भारत सरकार की एक राष्ट्रीय पहल है, जिसका उद्देश्य 1 करोड़ परिवारों को अपनी छतों पर सोलर सिस्टम लगाकर हर महीने 300 यूनिट तक मुफ्त सौर बिजली का लाभ दिलाना और बिजली बिल को शून्य के करीब लाना है।
            </p>
            <h4 className={styles.infoSubhead}>पात्रता शर्तें:</h4>
            <ul className={styles.infoList}>
              <li>आवेदक भारत का स्थायी नागरिक हो।</li>
              <li>स्वयं का पक्का आवासीय मकान या छत का स्वामित्व हो।</li>
              <li>वैध घरेलू (Residential) बिजली कनेक्शन आवेदक के नाम पर हो।</li>
              <li>छत पर सोलर पैनल लगाने हेतु पर्याप्त छाया-रहित स्थान हो।</li>
            </ul>
          </div>

          {/* Box 2: Required Documents */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>📑</span> आवश्यक दस्तावेज (Required Documents)
            </h3>
            <p className={styles.infoText}>
              पीएम सूर्य घर पोर्टल पर आवेदन एवं डिस्कॉम नेट मीटरिंग के लिए सामान्यतः निम्नलिखित दस्तावेजों की आवश्यकता होती है:
            </p>
            <ul className={styles.infoList}>
              <li><strong>नवीनतम बिजली बिल</strong> (Electricity Consumer Number / CA Number सहित)</li>
              <li><strong>आधार कार्ड</strong> (बिजली उपभोक्ता के नाम से मिलान)</li>
              <li><strong>बैंक खाता पासबुक या कैंसिल्ड चेक</strong> (सब्सिडी की राशि सीधे डीबीटी द्वारा इसी खाते में आती है)</li>
              <li><strong>छत की वर्तमान तस्वीर</strong> और वैध मोबाइल नंबर (ओटीपी सत्यापन हेतु)</li>
            </ul>
          </div>

          {/* Box 3: Application Process */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>⚙️</span> 5-चरणीय सरकारी सब्सिडी प्रक्रिया
            </h3>
            <ol className={styles.processSteps}>
              <li>
                <strong>पोर्टल पर रजिस्ट्रेशन:</strong> pmsuryaghar.gov.in पर राज्य (उत्तर प्रदेश), डिस्कॉम एवं बिजली खाता संख्या दर्ज कर पंजीकरण करें।
              </li>
              <li>
                <strong>तकनीकी स्वीकृति (Feasibility):</strong> डिस्कॉम द्वारा लोड और ग्रिड तकनीकी व्यवहार्यता की ऑनलाइन जांच व स्वीकृति।
              </li>
              <li>
                <strong>सिस्टम इंस्टॉलेशन:</strong> मानक नियमों के अनुरूप सोलर पैनल्स, इनवर्टर व प्रोटेक्टिव गियर की स्थापना।
              </li>
              <li>
                <strong>नेट मीटरिंग व इंस्पेक्शन:</strong> डिस्कॉम टीम द्वारा नेट-मीटर लगाया जाता है और कमीशनिंग सर्टिफिकेट जारी होता है।
              </li>
              <li>
                <strong>डीबीटी सब्सिडी ट्रांसफर:</strong> कमीशनिंग रिपोर्ट सबमिट होने के बाद सरकार सीधे बैंक खाते में सब्सिडी भेजती है।
              </li>
            </ol>
          </div>

          {/* Box 4: How Shivashutosh Helps */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>🤝</span> शिवआशुतोष सोलर सिस्टम्स आपकी कैसे सहायता करता है?
            </h3>
            <p className={styles.infoText}>
              सरकारी पोर्टल पर आवेदन करने से लेकर नेट-मीटर चालू होने तक हमारी तकनीकी टीम आपके साथ रहती है:
            </p>
            <ul className={styles.infoList}>
              <li>मुफ्त साइट सर्वे करके उपयुक्त सिस्टम क्षमता का सही निर्धारण।</li>
              <li>पीएम सूर्य घर पोर्टल पर फॉर्म भरने एवं दस्तावेज अपलोड में पूर्ण तकनीकी सहायता।</li>
              <li>डिस्कॉम और मानक तकनीकी विनिर्देशों के अनुसार सुरक्षित इंस्टॉलेशन।</li>
              <li>नेट मीटरिंग आवेदन, इंस्पेक्शन और कमीशनिंग प्रक्रिया में लगातार फॉलो-अप।</li>
            </ul>
            <div className={styles.cardCtaWrap}>
              <button type="button" onClick={handleFormScroll} className={styles.inlineCta}>
                सब्सिडी सहायता हेतु संपर्क करें
              </button>
            </div>
          </div>
        </div>

        {/* Official Portal Link & Strict Compliance Disclaimer */}
        <div className={styles.disclaimerBox}>
          <div className={styles.portalRow}>
            <div>
              <span className={styles.portalLabel}>आधिकारिक सरकारी वेबसाइट:</span>
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePortalClick}
                className={styles.portalLink}
              >
                https://pmsuryaghar.gov.in ↗
              </a>
            </div>
            <a
              href="https://pmsuryaghar.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePortalClick}
              className={styles.portalBtn}
            >
              पीएम सूर्य घर पोर्टल खोलें
            </a>
          </div>

          <div className={styles.legalNotes}>
            <strong>महत्वपूर्ण सरकारी सब्सिडी नियम एवं स्पष्टीकरण:</strong>
            <ul>
              <li>
                <strong>सब्सिडी अनुमोदन:</strong> सरकारी सब्सिडी सीधे भारत सरकार के नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) और संबंधित डिस्कॉम (जैसे DVVNL आदि) द्वारा उनके नियमों, सत्यापन और बजट आवंटन के अनुसार स्वीकृत की जाती है। शिवआशुतोष सोलर सिस्टम्स एक इंस्टॉलेशन एवं कंसल्टिंग प्रदाता है, यह कोई सरकारी विभाग नहीं है और किसी भी ग्राहक को सब्सिडी स्वीकृति की कोई स्वतंत्र या निजी गारंटी नहीं देता है।
              </li>
              <li>
                <strong>सब्सिडी का दायरा:</strong> केंद्रीय पीएम सूर्य घर सब्सिडी मूल रूप से मानक ग्रिड-कनेक्टेड (On-Grid) सोलर पीवी सिस्टम पर लागू होती है। यदि ग्राहक ऑफ-ग्रिड या हाइब्रिड बैटरी बैकअप का चयन करता है, तो बैटरी और अतिरिक्त बैकअप हार्डवेयर की लागत पर अलग से सरकारी केंद्रीय सब्सिडी स्वतः लागू नहीं होती है।
              </li>
              <li>
                <strong>कंपनी छूट बनाम सरकारी सब्सिडी:</strong> सरकारी सब्सिडी की राशि सरकार द्वारा सीधे उपभोक्ता के बैंक खाते में DBT के माध्यम से भेजी जाती है, जिसे कंपनी के किसी विशेष डिस्काउंट से भ्रमित न करें।
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
