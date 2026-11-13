'use client';

import React from 'react';
import Image from 'next/image';
import styles from './SolarPackages.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarPackages() {
  const handleScrollToForm = (componentName) => {
    trackEvent('site_survey_click', { location: `package_${componentName}` });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>संपूर्ण सोलर समाधान</span>
          <h2 className={styles.heading}>
            3 KW संपूर्ण सोलर सिस्टम — उच्च गुणवत्ता वाले मुख्य घटक
          </h2>
          <p className={styles.subtext}>
            शिवआशुतोष सोलर सिस्टम्स आपके घर और व्यवसाय के लिए केवल प्रमाणित, टिकाऊ और उच्च दक्षता वाले सोलर उपकरण प्रदान करता है।
          </p>
        </div>

        {/* Three Product Cards Grid */}
        <div className={styles.cardsGrid}>
          {/* 1. Solar Panels */}
          <div className={styles.productCard}>
            <div className={styles.cardMedia}>
              <Image
                src="/solar/solar-panel.jpg"
                alt="High Efficiency Monocrystalline Solar Panels"
                width={380}
                height={240}
                className={styles.cardImage}
              />
              <span className={styles.cardTag}>25 वर्ष वारंटी*</span>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardTitleRow}>
                <span className={styles.cardIcon}>☀️</span>
                <div>
                  <h3 className={styles.cardTitle}>उच्च दक्षता सोलर पैनल्स</h3>
                  <span className={styles.cardSubtitle}>Monocrystalline / Bifacial PV Modules</span>
                </div>
              </div>

              <p className={styles.cardDesc}>
                कम धूप और बादलों वाले मौसम में भी बेहतर विद्युत उत्पादन। अत्याधुनिक सेल तकनीक एवं एंटी-रिफ्लेक्टिव टेम्पर्ड ग्लास के साथ।
              </p>

              <ul className={styles.featureList}>
                <li>
                  <span className={styles.check}>✓</span>
                  <span><strong>25 वर्ष तक परफॉर्मेंस वारंटी*</strong> (निर्माता शर्तों के अनुसार)</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>उच्च तापमान और भारतीय जलवायु के लिए अनुकूलित</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>मजबूत एल्युमिनियम फ्रेम व ओला-रोधी (Hail-resistant) ग्लास</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>प्रतिदिन 12–15 यूनिट तक अनुमानित बिजली उत्पादन (3KW सिस्टम)</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => handleScrollToForm('panel')}
                className={styles.cardBtn}
              >
                पैनल विवरण व कोटेशन प्राप्त करें
              </button>
            </div>
          </div>

          {/* 2. Solar Inverter */}
          <div className={styles.productCard}>
            <div className={styles.cardMedia}>
              <Image
                src="/solar/inverter-battery.jpg"
                alt="Smart Solar Hybrid and On-Grid Inverter System"
                width={380}
                height={240}
                className={styles.cardImage}
              />
              <span className={styles.cardTagInverter}>स्मार्ट MPPT तकनीक</span>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardTitleRow}>
                <span className={styles.cardIcon}>⚡</span>
                <div>
                  <h3 className={styles.cardTitle}>स्मार्ट सोलर इन्वर्टर</h3>
                  <span className={styles.cardSubtitle}>Hybrid / On-Grid Pure Sine Wave</span>
                </div>
              </div>

              <p className={styles.cardDesc}>
                सौर ऊर्जा को घरेलू उपकरणों के अनुकूल 230V शुद्ध बिजली में परिवर्तित करता है। आधुनिक डिजिटल डिस्प्ले से दैनिक उत्पादन की सटीक निगरानी।
              </p>

              <ul className={styles.featureList}>
                <li>
                  <span className={styles.check}>✓</span>
                  <span><strong>शुद्ध साइन वेव (Pure Sine Wave)</strong> – फ्रिज, टीवी, एसी सभी सुरक्षित</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>एडवांस्ड MPPT चार्जर – 98% तक अधिकतम कन्वर्जन दक्षता</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>वोल्टेज फ्लक्चुएशन, ओवरलोड व शॉर्ट सर्किट से ऑटो-प्रोटेक्शन</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>ग्रिड-टाई (ऑन-ग्रिड) एवं हाइब्रिड मॉडल विकल्प उपलब्ध</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => handleScrollToForm('inverter')}
                className={styles.cardBtn}
              >
                इन्वर्टर विवरण व कोटेशन प्राप्त करें
              </button>
            </div>
          </div>

          {/* 3. Solar Battery */}
          <div className={styles.productCard}>
            <div className={styles.cardMedia}>
              <div className={styles.batteryGraphic}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.75">
                  <rect x="2" y="7" width="16" height="12" rx="2" />
                  <path d="M6 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
                  <line x1="18" y1="11" x2="22" y2="11" strokeWidth="2.5" />
                  <line x1="20" y1="9" x2="20" y2="13" strokeWidth="2.5" />
                  <path d="M7 13h6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className={styles.batteryTagText}>C10 सोलर ट्यूबलर / लिथियम स्टोरेज</span>
              </div>
              <span className={styles.cardTagBattery}>लंबा बैकअप</span>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardTitleRow}>
                <span className={styles.cardIcon}>🔋</span>
                <div>
                  <h3 className={styles.cardTitle}>सोलर स्टोरेज बैटरी</h3>
                  <span className={styles.cardSubtitle}>Deep-Cycle Solar C10 / Lithium Battery</span>
                </div>
              </div>

              <p className={styles.cardDesc}>
                रात के समय और बिजली कटौती (Power Cut) के दौरान आपके आवश्यक उपकरणों को निर्बाध बिजली प्रदान करने के लिए विशेष हेवी-ड्यूटी बैटरी बैकअप।
              </p>

              <ul className={styles.featureList}>
                <li>
                  <span className={styles.check}>✓</span>
                  <span><strong>सोलर रेटेड C10 डीप साइकिल</strong> – तेज़ चार्जिंग व धीमा डिस्चार्ज</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>लंबा जीवनकाल (Long Cycle Life) एवं कम मेंटेनेंस</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>पावर कट के दौरान पंखे, लाइट, कंप्यूटर और टीवी लगातार चालू</span>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <span>ग्राहक की आवश्यकता अनुसार 150Ah / 200Ah या लिथियम विकल्प</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => handleScrollToForm('battery')}
                className={styles.cardBtn}
              >
                बैटरी बैकअप सलाह प्राप्त करें
              </button>
            </div>
          </div>
        </div>

        {/* Technical Feasibility Notice Box */}
        <div className={styles.feasibilityNotice}>
          <div className={styles.noticeIcon}>ℹ️</div>
          <div className={styles.noticeText}>
            <strong>तकनीकी व्यवहार्यता एवं सिस्टम चयन:</strong>
            <p>
              वास्तविक सिस्टम कॉन्फ़िगरेशन (ऑन-ग्रिड, ऑफ-ग्रिड या हाइब्रिड), आवश्यक सोलर पैनल्स की संख्या तथा बैटरी बैकअप क्षमता ग्राहक के वास्तविक बिजली बिल, छत पर उपलब्ध छाया-रहित क्षेत्रफल और तकनीकी व्यवहार्यता (Technical Feasibility) पर निर्भर करती है। हमारी टीम साइट सर्वे के दौरान आपके लिए सर्वोत्तम सिस्टम सुझाती है।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
