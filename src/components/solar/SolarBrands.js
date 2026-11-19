'use client';

import React from 'react';
import styles from './SolarBrands.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarBrands() {
  const brands = [
    {
      id: 'tata-solar',
      name: 'TATA Solar',
      fullName: 'TATA Power Solar',
      tag: 'प्रीमियम टियर-1 ब्रांड',
      tagColor: 'blue',
      badge: 'सर्वाधिक भरोसेमंद',
      desc: 'भारत का अग्रणी व सबसे प्रतिष्ठित सोलर ब्रांड। प्रीमियम क्वालिटी मोनो पर्क सेल्स, उच्च स्थायित्व और हर मौसम में लगातार उच्च विद्युत उत्पादन।',
      capacity: '1 KW से 10 KW+ (घरेलू व व्यावसायिक)',
      highlights: [
        'टियर-1 श्रेणी की उच्च सेल दक्षता',
        '25 वर्ष तक सोलर पैनल परफॉर्मेंस वारंटी*',
        'मजबूत एल्युमिनियम फ्रेम व ओला-रोधी ग्लास',
        'भारतीय जलवायु और उच्च तापमान के लिए श्रेष्ठ',
      ],
    },
    {
      id: 'adani-solar',
      name: 'Adani Solar',
      fullName: 'Adani Solar PV Modules',
      tag: 'अत्याधुनिक TOPCon / Mono',
      tagColor: 'green',
      badge: 'हाई एफिशिएंसी',
      desc: 'वैश्विक मानकों पर निर्मित अत्याधुनिक सोलर पैनल्स। उच्च तापमान गुणांक के कारण तेज गर्मी और कम धूप दोनों स्थितियों में उत्कृष्ट परफॉर्मेंस।',
      capacity: '3 KW, 5 KW, 10 KW एवं बड़े प्रोजेक्ट्स',
      highlights: [
        'नवीनतम बाईफेशियल (Bifacial) व मोनो पर्क विकल्प',
        'कम धूप व बादलों में भी सक्रिय पावर जनरेशन',
        '25 वर्ष निर्माता परफॉर्मेंस वारंटी*',
        'आवासीय, दुकान व इंडस्ट्रियल रूफटॉप के लिए अनुकूल',
      ],
    },
    {
      id: 'utl-solar',
      name: 'UTL Solar',
      fullName: 'UTL Solar Systems & Inverters',
      tag: 'किफायती व लोकप्रिय',
      tagColor: 'orange',
      badge: 'सर्वोत्तम वैल्यू',
      desc: 'भारतीय घरों, दुकानों और छोटे उद्योगों के लिए बेहद लोकप्रिय और सुलभ सोलर समाधान। दमदार सोलर इन्वर्टर, भरोसेमंद बैटरी और मजबूत सर्विस सपोर्ट।',
      capacity: 'ऑन-ग्रिड, हाइब्रिड व ऑफ-ग्रिड सिस्टम्स',
      highlights: [
        'स्मार्ट MPPT सोलर इन्वर्टर तकनीक',
        'बिजली कटौती के लिए मजबूत ट्यूबलर बैटरी बैकअप',
        'आसान मेंटेनेंस और पूरे उत्तर प्रदेश में पार्ट्स उपलब्धता',
        'किफायती बजट में संपूर्ण सिस्टम विकल्प',
      ],
    },
    {
      id: 'other-brands',
      name: 'अन्य प्रमुख ब्रांड्स',
      fullName: 'Luminous, Microtek, Loom Solar आदि',
      tag: 'विविध विकल्प',
      tagColor: 'purple',
      badge: 'कस्टमाइज्ड चयन',
      desc: 'Luminous, Microtek, Loom Solar सहित बाजार के अन्य सभी प्रतिष्ठित और बीआईएस (BIS) प्रमाणित सोलर पैनल्स, इन्वर्टर व एक्सेसरीज विकल्प उपलब्ध।',
      capacity: 'आपकी छत और बजट अनुसार अनुकूलित',
      highlights: [
        'बजट और लोड के अनुसार व्यक्तिगत सिस्टम डिजाइन',
        'मानक सुरक्षा कंपोनेंट्स (DCDB/ACDB, SPD, अर्थिंग)',
        'प्रमाणित निर्माता वारंटी और तकनीकी अनुकूलता',
        'पारदर्शी कोटेशन — बिना किसी छिपे शुल्क के',
      ],
    },
  ];

  const handleBrandInquiry = (brandName) => {
    trackEvent('brand_inquiry_click', { brand: brandName, location: 'brands_section' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappBrand = (brandName) => {
    trackEvent('whatsapp_click', { brand: brandName, location: 'brands_section_whatsapp' });
  };

  return (
    <section id="solar-brands" className={styles.section} aria-labelledby="brands-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrowBadge}>आपकी पसंद, आपका सोलर ब्रांड!</span>
          <h2 id="brands-heading" className={styles.heading}>
            आपकी पसंद के प्रमुख सोलर ब्रांड
          </h2>
          <p className={styles.subtitle}>
            भारत के प्रमुख सोलर ब्रांड्स में से अपनी पसंद चुनें — एक ही जगह पर कई प्रमुख ब्रांड्स के विकल्प, अपनी जरूरत और बजट के अनुसार।
          </p>
          <div className={styles.customerNotice}>
            <span className={styles.noticeIcon} aria-hidden="true">💡</span>
            <p className={styles.noticeText}>
              <strong>ग्राहक हित में स्पष्ट नीति:</strong> हम आपकी जरूरत, बजट और पसंद के अनुसार अलग-अलग प्रमुख ब्रांड्स के सोलर पैनल, इन्वर्टर और अन्य सिस्टम विकल्प उपलब्ध कराने में सहायता करते हैं। हम किसी एक ब्रांड की बाध्यता नहीं रखते।
            </p>
          </div>
        </div>

        {/* 4 Brand Cards Grid */}
        <div className={styles.grid}>
          {brands.map((brand) => (
            <div key={brand.id} className={styles.brandCard}>
              <div className={styles.cardTop}>
                <div className={styles.brandBadgeWrap}>
                  <span className={`${styles.tagBadge} ${styles[`tag_${brand.tagColor}`]}`}>
                    {brand.tag}
                  </span>
                  <span className={styles.popularityBadge}>{brand.badge}</span>
                </div>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <span className={styles.brandFullName}>{brand.fullName}</span>
              </div>

              <p className={styles.brandDesc}>{brand.desc}</p>

              <div className={styles.capacityRow}>
                <span className={styles.capacityLabel}>क्षमता विकल्प:</span>
                <span className={styles.capacityValue}>{brand.capacity}</span>
              </div>

              <div className={styles.highlightsBox}>
                <span className={styles.highlightsTitle}>मुख्य विशेषताएं:</span>
                <ul className={styles.highlightsList}>
                  {brand.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className={styles.checkIcon} aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  onClick={() => handleBrandInquiry(brand.name)}
                  className={styles.inquiryBtn}
                  aria-label={`${brand.name} की जानकारी और कोटेशन प्राप्त करें`}
                >
                  <span>जानकारी प्राप्त करें</span>
                  <span aria-hidden="true">→</span>
                </button>
                <a
                  href={`https://wa.me/919719543259?text=${encodeURIComponent(`नमस्ते शिवआशुतोष सोलर एजेंसी, मुझे ${brand.name} सोलर सिस्टम की कीमत, मॉडल और सब्सिडी विवरण चाहिए।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsappBrand(brand.name)}
                  className={styles.whatsappIconBtn}
                  title={`${brand.name} हेतु WhatsApp पर पूछें`}
                  aria-label={`${brand.name} हेतु WhatsApp पर पूछें`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                    <path fill="#ffffff" d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Value Pillars */}
        <div className={styles.valuePillars}>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🎯</span>
            <div className={styles.pillarContent}>
              <strong>पसंद अनुसार चयन</strong>
              <p>आपकी छत, लोड और बजट के अनुकूल ब्रांड सुझाव</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>⚡</span>
            <div className={styles.pillarContent}>
              <strong>तकनीकी अनुकूलता</strong>
              <p>पैनल, इन्वर्टर और बैटरी का प्रमाणित इंजीनियरिंग मैच</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🛡️</span>
            <div className={styles.pillarContent}>
              <strong>निर्माता वारंटी</strong>
              <p>प्रत्येक उपकरण पर निर्माता शर्तों के अनुसार आधिकारिक वारंटी</p>
            </div>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>📋</span>
            <div className={styles.pillarContent}>
              <strong>पारदर्शी कोटेशन</strong>
              <p>ब्रांड व मॉडल नाम सहित स्पष्ट कंपोनेंट विवरण</p>
            </div>
          </div>
        </div>

        {/* Regulatory & Legal Compliance Note */}
        <p className={styles.disclaimerText}>
          * ब्रांड विकल्प स्थानीय उपलब्धता एवं तकनीकी अनुकूलता के अनुसार उपलब्ध कराए जाते हैं। हम ग्राहकों को उनकी पसंद अनुसार उपकरण चयन में तकनीकी परामर्श एवं इंस्टॉलेशन सहायता प्रदान करते हैं। सभी ट्रेडमार्क, लोगो एवं ब्रांड नाम उनके संबंधित विधिक स्वामियों की संपत्ति हैं।
        </p>
      </div>
    </section>
  );
}
