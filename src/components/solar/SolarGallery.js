'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './SolarGallery.module.css';

export default function SolarGallery() {
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      category: 'rooftop',
      title: 'आवासीय रूफटॉप सोलर संरचना',
      subtitle: 'Residential Rooftop Structure',
      desc: 'मजबूत हॉट-डिप गैल्वेनाइज्ड आयरन (GI) स्ट्रक्चर पर स्थापित उच्च क्षमता वाले मोनोक्रिस्टलाइन सोलर पैनल्स।',
      src: '/solar/rooftop-installation.jpg',
      badge: 'रूफटॉप स्थापना',
    },
    {
      id: 2,
      category: 'panel',
      title: 'अत्याधुनिक मोनोक्रिस्टलाइन पैनल्स',
      subtitle: 'Monocrystalline Solar PV Cells',
      desc: 'उच्च प्रकाश अवशोषण क्षमता, एंटी-रिफ्लेक्टिव टेम्पर्ड ग्लास और 25 वर्ष तक परफॉर्मेंस वारंटी*।',
      src: '/solar/solar-panel.jpg',
      badge: 'सोलर पैनल',
    },
    {
      id: 3,
      category: 'inverter',
      title: 'स्मार्ट हाइब्रिड इन्वर्टर व लिथियम स्टोरेज',
      subtitle: 'Smart Inverter & Battery Storage',
      desc: 'डिजिटल एलसीडी मॉनिटरिंग स्क्रीन, हाई एफिशिएंसी MPPT चार्जिंग और निर्बाध पावर बैकअप मैनेजमेंट।',
      src: '/solar/inverter-battery.jpg',
      badge: 'इन्वर्टर एवं बैटरी',
    },
    {
      id: 4,
      category: 'wiring',
      title: 'मानक वायरिंग एवं सुरक्षा उपकरण',
      subtitle: 'Standard Safety & Earthing',
      desc: 'डीसीडीबी (DCDB), एसीडीबी (ACDB), कॉपर अर्थिंग रॉड्स और लाइटनिंग अरेस्टर के साथ पूर्ण विद्युतीय सुरक्षा।',
      src: '/solar/rooftop-installation.jpg', // reused with alternate aspect & caption
      badge: 'सुरक्षा मानक',
    },
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>कार्य उत्कृष्टता एवं उपकरण</span>
          <h2 className={styles.heading}>
            सोलर इंस्टॉलेशन एवं उपकरण गैलरी
          </h2>
          <p className={styles.subtext}>
            हमारे द्वारा उपयोग किए जाने वाले वास्तविक सोलर पैनल्स, इन्वर्टर, बैटरी और रूफटॉप माउंटिंग मानकों की झलक।
          </p>

          <div className={styles.filterBar}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            >
              सभी (All)
            </button>
            <button
              type="button"
              onClick={() => setFilter('rooftop')}
              className={`${styles.filterBtn} ${filter === 'rooftop' ? styles.filterBtnActive : ''}`}
            >
              रूफटॉप इंस्टॉलेशन
            </button>
            <button
              type="button"
              onClick={() => setFilter('panel')}
              className={`${styles.filterBtn} ${filter === 'panel' ? styles.filterBtnActive : ''}`}
            >
              सोलर पैनल्स
            </button>
            <button
              type="button"
              onClick={() => setFilter('inverter')}
              className={`${styles.filterBtn} ${filter === 'inverter' ? styles.filterBtnActive : ''}`}
            >
              इन्वर्टर व बैटरी
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.galleryCard}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.src}
                  alt={item.title}
                  width={580}
                  height={360}
                  className={styles.image}
                />
                <span className={styles.tag}>{item.badge}</span>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.cardSubtitle}>{item.subtitle}</span>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.disclaimerNote}>
          * प्रस्तुत चित्र सोलर सिस्टम घटकों एवं मानक तकनीकी स्थापनाओं के उदाहरण हैं। वास्तविक ऑन-साइट इंस्टॉलेशन लेआउट आपकी छत के आकार, दिशा और तकनीकी व्यवहार्यता के अनुसार अनुकूलित किया जाता है।
        </div>
      </div>
    </section>
  );
}
