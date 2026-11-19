'use client';

import React from 'react';
import styles from './SolarCoverage.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarCoverage() {
  const handleSurveyCta = () => {
    trackEvent('site_survey_click', { location: 'coverage_section' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneCta = () => {
    trackEvent('phone_call_click', { location: 'coverage_section' });
  };

  const coveragePillars = [
    {
      icon: '📍',
      title: 'संपूर्ण उत्तर प्रदेश में सेवा उपलब्धता',
      subtitle: 'Statewide Service Network',
      desc: 'पश्चिमी यूपी (अलीगढ़, आगरा, मथुरा, हाथरस, मेरठ, गाजियाबाद, नोएडा) से लेकर मध्य व पूर्वी यूपी (लखनऊ, कानपुर, प्रयागराज, वाराणसी, गोरखपुर, अयोध्या) तक सभी क्षेत्रों में सेवा।',
    },
    {
      icon: '🏠',
      title: 'घरेलू एवं व्यावसायिक सोलर सिस्टम',
      subtitle: 'Residential & Commercial Systems',
      desc: 'घरों के लिए 1 से 3 KW ऑन-ग्रिड व हाइब्रिड रूफटॉप, दुकानों, स्कूलों, अस्पतालों, पेट्रोल पंप और वाणिज्यिक संस्थानों के लिए 5 से 50 KW+ सिस्टम।',
    },
    {
      icon: '🏛️',
      title: 'सरकारी सब्सिडी आवेदन में सहायता',
      subtitle: 'PM Surya Ghar Subsidy Assistance',
      desc: 'पीएम सूर्य घर योजना (केंद्र ₹78,000) एवं यूपी सरकार (₹30,000) के तहत अधिकतम ₹1,08,000 तक की कुल सब्सिडी हेतु पोर्टल रजिस्ट्रेशन व तकनीकी मार्गदर्शन।',
    },
    {
      icon: '📐',
      title: 'साइट सर्वे और सिस्टम डिजाइन',
      subtitle: 'Technical Survey & Engineering',
      desc: 'छत का क्षेत्रफल, शैडो (छाया) एनालिसिस और आपकी बिजली खपत का अध्ययन कर सबसे उपयुक्त क्षमता एवं ब्रांड का कस्टमाइज्ड सिस्टम डिजाइन।',
    },
    {
      icon: '⚡',
      title: 'मानक इंस्टॉलेशन और कमीशनिंग',
      subtitle: 'Standardized Installation',
      desc: 'एंटी-रस्ट जीआई स्ट्रक्चर, यूवी-प्रोटेक्टेड डीसी केबल्स, लाइटनिंग अरेस्टर, केमिकल अर्थिंग और डिस्कॉम नेट-मीटरिंग के साथ सुरक्षित कमीशनिंग।',
    },
    {
      icon: '🤝',
      title: 'विश्वसनीय आफ्टर-सेल्स सपोर्ट',
      subtitle: 'After-Sales & Maintenance Support',
      desc: 'सिस्टम लगने के बाद भी नियमित परफॉर्मेंस मॉनिटरिंग, वारंटी क्लेम सहायता और त्वरित तकनीकी सेवा का मजबूत आश्वासन।',
    },
  ];

  return (
    <section id="coverage" className={styles.section} aria-labelledby="coverage-heading">
      <div className={styles.container}>
        {/* Header Block */}
        <div className={styles.header}>
          <div className={styles.badgeRow}>
            <span className={styles.upBadge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              उत्तर प्रदेश में अधिकृत सोलर सेवाएँ
            </span>
            <span className={styles.subBadge}>
              अब संपूर्ण उत्तर प्रदेश में सोलर सिस्टम लगवाने की सुविधा!
            </span>
          </div>

          <h2 id="coverage-heading" className={styles.heading}>
            संपूर्ण उत्तर प्रदेश में सोलर समाधान
          </h2>

          <p className={styles.leadText}>
            उत्तर प्रदेश सरकार की UPNEDA एम्पैनल्ड कंपनी <strong>राधा एंटरप्राइजेज (UPNEDA Vendor Code: AGC2609282705) के अधिकृत चैनल पार्टनर</strong> के रूप में प्रमाणित सोलर समाधान।
          </p>

          <p className={styles.description}>
            उत्तर प्रदेश में घरेलू, दुकान, ऑफिस, संस्थान और व्यावसायिक ग्राहकों के लिए सोलर सिस्टम की जानकारी, साइट सर्वे, सिस्टम डिजाइन, इंस्टॉलेशन और सरकारी सब्सिडी आवेदन सहायता।
          </p>

          {/* Prominent Official UPNEDA Vendor & Channel Partner Credential Card */}
          <div className={styles.vendorAuthCard}>
            <div className={styles.authCardTop}>
              <div className={styles.authBadgePill}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span>अधिकृत क्रेडेंशियल एवं व्यावसायिक संबंध विवरण</span>
              </div>
            </div>

            <div className={styles.authGrid}>
              <div className={styles.authCol}>
                <span className={styles.authLabel}>UPNEDA Empanelled Vendor</span>
                <strong className={styles.authValue}>Radha Enterprises (राधा एंटरप्राइजेज)</strong>
                <span className={styles.authSub}>उत्तर प्रदेश नवीन एवं नवीकरणीय ऊर्जा विकास अभिकरण अनुमोदित</span>
              </div>

              <div className={styles.authColHighlight}>
                <span className={styles.authLabel}>UPNEDA Vendor Code</span>
                <div className={styles.codeWrap}>
                  <code className={styles.vendorCode}>AGC2609282705</code>
                </div>
                <span className={styles.authSubCode}>आधिकारिक पंजीकृत वेंडर कोड (Radha Enterprises)</span>
              </div>

              <div className={styles.authCol}>
                <span className={styles.authLabel}>Authorized Channel Partner</span>
                <strong className={styles.authValue}>Shivashutosh Solar Agency</strong>
                <span className={styles.authSub}>अधिकृत चैनल पार्टनर (शिवआशुतोष सोलर एजेंसी)</span>
              </div>
            </div>

            <div className={styles.authStatement}>
              <p className={styles.authEnText}>
                <strong>Shivashutosh Solar Agency</strong> is an <strong>Authorized Channel Partner of Radha Enterprises</strong> (UPNEDA Empanelled Vendor Code: <code>AGC2609282705</code>), providing solar solutions and government subsidy assistance across Uttar Pradesh.
              </p>
              <p className={styles.authHiText}>
                शिवआशुतोष सोलर एजेंसी, UPNEDA एम्पैनल्ड वेंडर <strong>राधा एंटरप्राइजेज</strong> (वेंडर कोड: <strong>AGC2609282705</strong>) की अधिकृत चैनल पार्टनर है। संपूर्ण उत्तर प्रदेश में पीएम सूर्य घर मुफ्त बिजली योजना के अंतर्गत सोलर पैनल स्थापना, तकनीकी सर्वे और डिस्कॉम सब्सिडी प्रक्रिया का संचालन UPNEDA नियमों के तहत अधिकृत वेंडर के माध्यम से सुनिश्चित किया जाता है।
              </p>
            </div>
          </div>
        </div>

        {/* 6 Feature Grid */}
        <div className={styles.grid}>
          {coveragePillars.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconCircle} aria-hidden="true">{item.icon}</span>
                <div className={styles.cardTitleWrap}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardSubtitle}>{item.subtitle}</span>
                </div>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className={styles.actionBanner}>
          <div className={styles.bannerText}>
            <span className={styles.bannerTag}>मुफ्त परामर्श व साइट सर्वे</span>
            <h3 className={styles.bannerTitle}>
              क्या आप उत्तर प्रदेश में अपने घर या दुकान पर सोलर लगवाना चाहते हैं?
            </h3>
            <p className={styles.bannerDesc}>
              हमारे अनुभवी सोलर इंजीनियर से अपने जिले में मुफ्त साइट सर्वे बुक करें और सटीक कोटेशन प्राप्त करें।
            </p>
          </div>

          <div className={styles.bannerActions}>
            <button
              type="button"
              onClick={handleSurveyCta}
              className={styles.bannerPrimaryBtn}
            >
              <span>मुफ्त साइट सर्वे बुक करें</span>
              <span aria-hidden="true">→</span>
            </button>
            <a
              href="tel:7906904706"
              onClick={handlePhoneCta}
              className={styles.bannerPhoneBtn}
            >
              📞 <strong>7906904706</strong>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className={styles.complianceNoteBox}>
          <p className={styles.complianceNote}>
            <strong>* वैधानिक प्रकटीकरण (Statutory Disclosure):</strong> UPNEDA वेंडर कोड <code>AGC2609282705</code> उत्तर प्रदेश सरकार के UPNEDA-एम्पैनल्ड वेंडर <strong>राधा एंटरप्राइजेज (Radha Enterprises)</strong> का आधिकारिक वेंडर कोड है। <strong>शिवआशुतोष सोलर एजेंसी</strong> राधा एंटरप्राइजेज के वैध अधिकृत चैनल पार्टनर (Authorized Channel Partner) के रूप में कार्य करती है। सोलर सिस्टम की स्थापना, नेट-मीटरिंग एवं सब्सिडी की स्वीकृति पीएम सूर्य घर योजना, UPNEDA एवं संबंधित विद्युत वितरण निगम (DISCOM) के नियमों व ग्राहक पात्रता के अधीन है।
          </p>
        </div>
      </div>
    </section>
  );
}
