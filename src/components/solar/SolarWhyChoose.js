'use client';

import React from 'react';
import styles from './SolarWhyChoose.module.css';

export default function SolarWhyChoose() {
  const benefits = [
    {
      icon: '💳',
      title: 'ZERO DOWN PAYMENT – शुरुआती भुगतान ₹0 का विकल्प!*',
      desc: 'पात्र ग्राहकों के लिए उपलब्ध वित्तीय योजनाओं के अंतर्गत बिना शुरुआती भुगतान के Solar Installation का विकल्प प्राप्त करें। आसान मासिक किश्तों (EMI) की भरपाई बिजली बिल की मासिक बचत से हो जाती है।',
    },
    {
      icon: '🏛️',
      title: 'प्रभावी लागत ₹0 एवं ₹1,08,000 सरकारी सब्सिडी',
      desc: 'पीएम सूर्य घर (केंद्र: ₹78,000) व यूपी सरकार (₹30,000) की कुल ₹1,08,000 तक की अधिकतम सब्सिडी एवं आसान लोन के साथ अपने घर पर सोलर लगवाने की प्रभावी लागत ₹0 तक लाएं।*',
    },
    {
      icon: '🛠️',
      title: 'संपूर्ण सोलर समाधान (Complete Solar Solution)',
      desc: 'सलाह, साइट सर्वे, उपकरण चयन से लेकर सुरक्षित इंस्टॉलेशन, नेट मीटरिंग व टेस्टिंग तक सब कुछ एक ही छत के नीचे उपलब्ध।',
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
      icon: '🤝',
      title: 'तेज़ व स्थानीय आफ्टर-सेल्स सर्विस (After-Sales Service)',
      desc: 'संपूर्ण उत्तर प्रदेश में समर्पित नेटवर्क और स्थानीय उपस्थिति के कारण आवश्यकता पड़ने पर त्वरित सपोर्ट और मेंटेनेंस सहायता।',
    },
    {
      icon: '📜',
      title: 'पारदर्शी वारंटी पॉलिसी (Clear Warranty Information)',
      desc: 'सोलर पैनलों पर 25 साल तक परफॉर्मेंस वारंटी*, इन्वर्टर और बैटरी पर निर्माता वारंटी की स्पष्ट एवं पारदर्शी जानकारी।',
    },
    {
      icon: '☀️',
      title: 'अपनी पसंद का ब्रांड (TATA, Adani, UTL)',
      desc: 'किसी एक ब्रांड की बाध्यता नहीं—अपनी छत, बजट और पसंद के अनुसार प्रमुख प्रमाणित ब्रांड्स में से चुनने की पूरी स्वतंत्रता।',
    },
  ];

  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>⚡ प्रभावी लागत ₹0 | हमारा संकल्प</span>
          <h2 className={styles.heading}>
            Solar लगवाएं और हर महीने बिजली बिल में बड़ी बचत पाएं – प्रभावी लागत ₹0!
          </h2>
          <p className={styles.subtext}>
            उत्तर प्रदेश के घरों और दुकानों को ZERO DOWN PAYMENT विकल्प, ₹1,08,000 तक सरकारी सब्सिडी और भरोसेमंद सौर ऊर्जा से जोड़ना हमारा मुख्य लक्ष्य है।
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

        {/* Electricity Bill Savings Highlight Box */}
        <div className={styles.savingsBanner}>
          <div className={styles.savingsBannerHeader}>
            <span className={styles.savingsBadge}>💡 बिजली बिल में बड़ी बचत</span>
            <h3 className={styles.savingsTitle}>
              Solar लगवाएं और हर महीने बिजली बिल में बड़ी बचत पाएं!
            </h3>
          </div>
          <div className={styles.savingsGrid}>
            <div className={styles.savingsItem}>
              <span className={styles.savingsCheck}>✓</span>
              <span><strong>अपनी छत पर बिजली बनाएं:</strong> धूप से सीधे अपने घर की दैनिक बिजली का उत्पादन करें।</span>
            </div>
            <div className={styles.savingsItem}>
              <span className={styles.savingsCheck}>✓</span>
              <span><strong>Grid से बिजली खरीद कम करें:</strong> सरकारी बिजली पर निर्भरता 80% से 90% तक घटाएं।</span>
            </div>
            <div className={styles.savingsItem}>
              <span className={styles.savingsCheck}>✓</span>
              <span><strong>बिजली बिल का खर्च घटाएं:</strong> हर महीने आने वाले भारी बिल से मुक्ति पाएं।</span>
            </div>
            <div className={styles.savingsItem}>
              <span className={styles.savingsCheck}>✓</span>
              <span><strong>अपनी जरूरत अनुसार चुनें:</strong> TATA, Adani, UTL में से अपनी पसंद का सिस्टम लगवाएं।</span>
            </div>
          </div>
          <p className={styles.savingsDisclaimer}>
            * प्रभावी लागत ग्राहक की पात्रता, स्वीकृत सरकारी सब्सिडी, वास्तविक इंस्टॉलेशन लागत और लागू वित्तीय शर्तों पर निर्भर करती है। बिजली बिल बचत वास्तविक खपत एवं मौसम अनुसार उत्पादन पर निर्भर है।
          </p>
        </div>
      </div>
    </section>
  );
}
