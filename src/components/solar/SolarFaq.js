'use client';

import React, { useState } from 'react';
import styles from './SolarFaq.module.css';
import { FAQ_DATA } from '@/data/solarFaq';

export default function SolarFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>अक्सर पूछे जाने वाले सवाल</span>
          <h2 className={styles.heading}>
            सोलर सिस्टम एवं सब्सिडी से जुड़े प्रमुख सवाल-जवाब
          </h2>
          <p className={styles.subtext}>
            आपके मन में सोलर लगवाने को लेकर कोई भी शंका हो, तो यहाँ उसके सटीक और तकनीकी रूप से स्पष्ट उत्तर पाएं।
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.qText}>
                    <span className={styles.qNum}>Q{idx + 1}.</span> {item.q}
                  </span>
                  <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className={styles.answerWrap}>
                    <p className={styles.answerText}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
