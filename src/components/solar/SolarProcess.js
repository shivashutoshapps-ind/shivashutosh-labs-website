'use client';

import React from 'react';
import styles from './SolarProcess.module.css';

export default function SolarProcess() {
  const steps = [
    {
      num: '01',
      title: 'ग्राहक की जानकारी एवं परामर्श',
      subtitle: 'Enquiry & Consultation',
      desc: 'आप ऑनलाइन फॉर्म भरते हैं या हमें कॉल/व्हाट्सएप करते हैं। हमारी टीम प्रभावी लागत ₹0 एवं Zero Down Payment विकल्पों के साथ आपकी प्राथमिक आवश्यकताओं को समझती है।',
      icon: '📞',
    },
    {
      num: '02',
      title: 'साइट सर्वे एवं लोड का आकलन',
      subtitle: 'Site Survey & Feasibility',
      desc: 'सोलर विशेषज्ञ आपकी छत की दिशा, छाया (Shadow analysis), लोड और संरचनात्मक मजबूती का ऑन-साइट मुफ्त तकनीकी सर्वे करते हैं।',
      icon: '📐',
    },
    {
      num: '03',
      title: 'कोटेशन, ZERO DOWN PAYMENT एवं सब्सिडी',
      subtitle: 'Quotation, Zero Down & Subsidy',
      desc: 'आपकी आवश्यकता अनुसार सटीक सिस्टम डिज़ाइन, ZERO DOWN PAYMENT वित्तीय विकल्प*, तथा केंद्र व यूपी सरकार से अधिकतम ₹1,08,000 तक की कुल सब्सिडी का पारदर्शी विवरण जिससे प्रभावी लागत ₹0 तक आ सके।',
      icon: '📋',
    },
    {
      num: '04',
      title: 'इंस्टॉलेशन एवं सिस्टम हैंडओवर',
      subtitle: 'Installation & Handover',
      desc: 'कुशल इंजीनियरों द्वारा मानक सुरक्षा के साथ सोलर पैनल, इन्वर्टर, अर्थिंग व नेट मीटरिंग का कार्य पूरा कर सिस्टम चालू किया जाता है।',
      icon: '⚡',
    },
  ];

  return (
    <section id="process" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>⚡ प्रभावी लागत ₹0 तक | आसान एवं पारदर्शी प्रक्रिया</span>
          <h2 className={styles.heading}>
            सोलर इंस्टॉलेशन के 4 सरल चरण – प्रभावी लागत ₹0 तक!
          </h2>
          <p className={styles.subtext}>
            पहली कॉल से लेकर ZERO DOWN PAYMENT विकल्प एवं बिजली बिल में भारी बचत शुरू होने तक की पूरी प्रक्रिया सहज, पारदर्शी और तनाव-मुक्त है।
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepIcon}>{step.icon}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <span className={styles.stepSubtitle}>{step.subtitle}</span>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
