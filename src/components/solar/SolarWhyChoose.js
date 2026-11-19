'use client';

import React from 'react';
import styles from './SolarWhyChoose.module.css';

export default function SolarWhyChoose() {
  const benefits = [
    {
      icon: '🛠️',
      title: 'संपूर्ण सोलर समाधान (Complete Solar Solution)',
      desc: 'सलाह, साइट सर्वे, उपकरण चयन से लेकर सुरक्षित इंस्टॉलेशन व टेस्टिंग तक सब कुछ एक ही छत के नीचे उपलब्ध।',
    },
    {
      icon: '📐',
      title: 'मुफ्त साइट सर्वे एवं लोड असेसमेंट (Site Survey & Consultation)',
      desc: 'हमारे अनुभवी तकनीशियन आपकी छत का क्षेत्रफल, छाया की स्थिति एवं मासिक बिजली बिल का सटीक अध्ययन कर सही सलाह देते हैं।',
    },
    {
      icon: '⚡',
      title: 'कुशल इंस्टॉलेशन सपोर्ट (Installation Support)',
      desc: 'मानक जीआई माउंटिंग स्ट्रक्चर, हाई-ग्रेड डीसी वायर, अर्थिंग रॉड एवं लाइटनिंग अरेस्टर के साथ सुरक्षित व मजबूत इंस्टॉलेशन।',
    },
    {
      icon: '🏛️',
      title: 'सरकारी सब्सिडी आवेदन में सहयोग (Subsidy Application Assistance)',
      desc: 'पीएम सूर्य घर (केंद्र: ₹78,000) व यूपी सरकार (₹30,000) की अधिकतम ₹1,08,000 तक की कुल सब्सिडी, पोर्टल रजिस्ट्रेशन और नेट मीटरिंग में पूर्ण मार्गदर्शन।',
    },
    {
      icon: '🤝',
      title: 'तेज़ व स्थानीय आफ्टर-सेल्स सर्विस (After-Sales Service)',
      desc: 'संपूर्ण उत्तर प्रदेश में समर्पित नेटवर्क और स्थानीय उपस्थिति के कारण आवश्यकता पड़ने पर त्वरित सपोर्ट और मेंटेनेंस सहायता।',
    },
    {
      icon: '📜',
      title: 'पारदर्शी वारंटी पॉलिसी (Clear Warranty Information)',
      desc: 'सोलर पैनलों पर 25 साल तक परफॉर्मेंस वारंटी*, इन्वर्टर और बैटरी पर निर्माता वारंटी की स्पष्ट एवं पारदर्शी जानकारी।',
    },
  ];

  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>हमारा संकल्प</span>
          <h2 className={styles.heading}>
            शिवआशुतोष सोलर सिस्टम्स को ही क्यों चुनें?
          </h2>
          <p className={styles.subtext}>
            उत्तर प्रदेश के घरों और दुकानों को स्वच्छ, भरोसेमंद और किफायती सौर ऊर्जा से जोड़ना हमारा मुख्य लक्ष्य है।
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((item, idx) => (
            <div key={idx} className={styles.benefitCard}>
              <div className={styles.iconCircle}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
