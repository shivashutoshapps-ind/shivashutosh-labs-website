'use client';

import React from 'react';
import styles from './SolarSubsidy.module.css';
import { trackEvent } from '@/lib/solar/tracking';

export default function SolarSubsidy() {
  const handlePortalClick = (portalName) => {
    trackEvent('outbound_portal_click', { destination: portalName });
  };

  const handleFormScroll = () => {
    trackEvent('site_survey_click', { location: 'subsidy_section' });
    const target = document.getElementById('enquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="subsidy" className={styles.section} aria-label="सरकारी सोलर सब्सिडी विवरण">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badgeWrap}>
            <span className={styles.badge}>सरकारी योजना सब्सिडी विवरण</span>
            <span className={styles.officialTag}>केंद्र सरकार (MNRE) + उत्तर प्रदेश सरकार (UPNEDA)</span>
          </div>
          <h2 className={styles.heading}>
            उत्तर प्रदेश में Rooftop Solar लगवाने पर अधिकतम ₹1,08,000 तक की सब्सिडी – प्रभावी लागत ₹0 तक!
          </h2>
          <p className={styles.subtext}>
            पीएम सूर्य घर: मुफ्त बिजली योजना (केंद्र सरकार) एवं उत्तर प्रदेश सौर ऊर्जा नीति (राज्य सरकार) के अंतर्गत पात्र आवासीय उपभोक्ताओं को मिलने वाली संभावित अधिकतम सब्सिडी का विस्तृत एवं पारदर्शी विवरण।
          </p>
        </div>

        {/* Zero Cost Formula Banner */}
        <div className={styles.zeroCostFormulaBanner}>
          <div className={styles.zeroCostFormulaTitle}>
            💡 सरकारी सब्सिडी (₹1,08,000 तक) + Zero Down Payment = <strong>प्रभावी लागत ₹0!</strong>
          </div>
          <p className={styles.zeroCostFormulaText}>
            केंद्र सरकार की ₹78,000 तक सब्सिडी + यूपी सरकार की ₹30,000 तक अतिरिक्त सहायता (कुल ₹1,08,000) तथा उपलब्ध आसान वित्तीय/EMI विकल्पों के संयोजन से आपके घर पर सोलर सिस्टम लगवाने की <strong>प्रभावी लागत ₹0 तक</strong> संभव है!
          </p>
        </div>

        {/* 1. Main Subsidy Highlight Banner (Central + UP State = Total) */}
        <div className={styles.highlightBanner}>
          <div className={styles.bannerHeader}>
            <span className={styles.bannerBadge}>🌟 राज्यस्तरीय अधिकतम सब्सिडी लाभ</span>
            <h3 className={styles.bannerTitle}>
              केंद्र एवं उत्तर प्रदेश सरकार की संयुक्त सब्सिडी संरचना
            </h3>
            <p className={styles.bannerSubtitle}>
              घरेलू (Residential) ऑन-ग्रिड रूफटॉप सोलर सिस्टम पर केंद्र सरकार की ₹78,000 तक की वित्तीय सहायता के साथ-साथ उत्तर प्रदेश सरकार द्वारा ₹30,000 तक की अतिरिक्त राज्य सब्सिडी प्रदान की जाती है।
            </p>
          </div>

          <div className={styles.breakdownGrid}>
            {/* Box 1: Central */}
            <div className={styles.breakdownCard}>
              <div className={styles.cardScope}>केंद्र सरकार सब्सिडी</div>
              <div className={styles.schemeName}>पीएम सूर्य घर: मुफ्त बिजली योजना (MNRE)</div>
              <div className={styles.breakdownAmount}>
                अधिकतम ₹78,000 <span className={styles.amountSuffix}>तक</span>
              </div>
              <p className={styles.breakdownDesc}>
                3 kW या अधिक क्षमता के पात्र आवासीय रूफटॉप सोलर सिस्टम पर केंद्र सरकार द्वारा डीबीटी (DBT) के माध्यम से देय।
              </p>
            </div>

            <div className={styles.plusSymbol} aria-hidden="true">+</div>

            {/* Box 2: UP State */}
            <div className={styles.breakdownCard}>
              <div className={styles.cardScope}>उत्तर प्रदेश सरकार अतिरिक्त सब्सिडी</div>
              <div className={styles.schemeName}>उत्तर प्रदेश सौर ऊर्जा नीति (UPNEDA)</div>
              <div className={styles.breakdownAmount}>
                अधिकतम ₹30,000 <span className={styles.amountSuffix}>तक</span>
              </div>
              <p className={styles.breakdownDesc}>
                उत्तर प्रदेश सरकार द्वारा ₹15,000 प्रति kW (अधिकतम ₹30,000 प्रति उपभोक्ता) की दर से देय अतिरिक्त राज्य सहायता।
              </p>
            </div>

            <div className={styles.equalSymbol} aria-hidden="true">=</div>

            {/* Box 3: Total Combined */}
            <div className={`${styles.breakdownCard} ${styles.breakdownTotalCard}`}>
              <div className={styles.totalBadge}>कुल संभावित सब्सिडी</div>
              <div className={styles.schemeName}>केंद्र सरकार + उत्तर प्रदेश सरकार</div>
              <div className={styles.breakdownAmountTotal}>
                अधिकतम ₹1,08,000 <span className={styles.amountSuffixTotal}>तक*</span>
              </div>
              <p className={styles.breakdownDescTotal}>
                पात्र घरेलू उपभोक्ताओं के लिए 3 kW सिस्टम पर केंद्र (₹78,000) + यूपी सरकार (₹30,000) की कुल संभावित अधिकतम सब्सिडी।
              </p>
            </div>
          </div>
        </div>

        {/* 2. Capacity-Wise Subsidy Table (Hindi-First) */}
        <div className={styles.tableSection}>
          <div className={styles.tableHeaderArea}>
            <h3 className={styles.tableHeading}>
              📊 क्षमतावार सब्सिडी विवरण तालिका (Capacity-Wise Subsidy Breakdown)
            </h3>
            <p className={styles.tableSubhead}>
              पात्र आवासीय ग्रिड-कनेक्टेड रूफटॉप सोलर उपभोक्ताओं के लिए सांकेतिक सब्सिडी गणना:
            </p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.subsidyTable}>
              <thead>
                <tr>
                  <th scope="col">सोलर सिस्टम क्षमता<br/><span className={styles.thEn}>(Solar Capacity)</span></th>
                  <th scope="col">केंद्र सरकार सब्सिडी<br/><span className={styles.thEn}>(Central Subsidy)</span></th>
                  <th scope="col">उत्तर प्रदेश राज्य सब्सिडी<br/><span className={styles.thEn}>(UP State Subsidy)</span></th>
                  <th scope="col">कुल संभावित सब्सिडी<br/><span className={styles.thEn}>(Total Subsidy)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdCapacity}>
                    <strong>1 kW</strong>
                    <span className={styles.tdSub}>छोटे परिवार (2-3 पंखे + लाइट)</span>
                  </td>
                  <td className={styles.tdAmount}>₹30,000</td>
                  <td className={styles.tdAmount}>₹15,000</td>
                  <td className={styles.tdTotal}>₹45,000</td>
                </tr>
                <tr>
                  <td className={styles.tdCapacity}>
                    <strong>2 kW</strong>
                    <span className={styles.tdSub}>मध्यम परिवार (फ्रिज + टीवी + पंखे)</span>
                  </td>
                  <td className={styles.tdAmount}>₹60,000</td>
                  <td className={styles.tdAmount}>₹30,000</td>
                  <td className={styles.tdTotal}>₹90,000</td>
                </tr>
                <tr className={styles.trHighlight}>
                  <td className={styles.tdCapacity}>
                    <div className={styles.popularRowTag}>सर्वाधिक लोकप्रिय</div>
                    <strong>3 kW</strong>
                    <span className={styles.tdSub}>1.5 टन एसी + फ्रिज + वाशिंग मशीन</span>
                  </td>
                  <td className={styles.tdAmount}>₹78,000</td>
                  <td className={styles.tdAmount}>₹30,000</td>
                  <td className={styles.tdTotalHighlight}>
                    <strong>₹1,08,000</strong>
                    <span className={styles.maxTag}>अधिकतम सीमा</span>
                  </td>
                </tr>
                <tr className={styles.trCaps}>
                  <td className={styles.tdCapacity}>
                    <strong>3 kW से अधिक</strong>
                    <span className={styles.tdSub}>4 kW, 5 kW, 10 kW+ आवासीय</span>
                  </td>
                  <td className={styles.tdAmount}>₹78,000 <span className={styles.capLabel}>(अधिकतम सीमा)</span></td>
                  <td className={styles.tdAmount}>₹30,000 <span className={styles.capLabel}>(अधिकतम सीमा)</span></td>
                  <td className={styles.tdTotal}>
                    ₹1,08,000 <span className={styles.capLabel}>(अधिकतम कैप)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.tableNotesBox}>
            <p className={styles.tableNoteText}>
              <strong>📌 महत्वपूर्ण नियम (Scheme Caps):</strong> 3 kW से अधिक क्षमता वाले आवासीय सिस्टम पर भी केंद्र सरकार की अधिकतम वित्तीय सहायता (CFA) ₹78,000 तथा उत्तर प्रदेश राज्य सरकार की अधिकतम सब्सिडी ₹30,000 ही अनुमन्य है। अतः 3 kW से बड़े आवासीय सिस्टम पर भी कुल सब्सिडी ₹1,08,000 की अधिकतम सीमा पर स्थिर रहती है।
            </p>
          </div>
        </div>

        {/* 3. Three Indicative Slab Cards */}
        <div className={styles.slabsGrid}>
          <div className={styles.slabCard}>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>1 kW सिस्टम</span>
              <span className={styles.loadType}>छोटे परिवार / 2-3 पंखे + लाइट</span>
            </div>
            <div className={styles.slabAmount}>
              ₹45,000 <span className={styles.slabLabel}>तक कुल संभावित सब्सिडी*</span>
            </div>
            <div className={styles.slabMiniBreakdown}>
              <span>केंद्र: ₹30,000</span> + <span>यूपी राज्य: ₹15,000</span>
            </div>
            <p className={styles.slabDesc}>
              आवासीय ऑन-ग्रिड रूफटॉप सोलर पर 1 kW क्षमता के लिए केंद्र और उत्तर प्रदेश सरकार की संयुक्त डीबीटी सब्सिडी।
            </p>
          </div>

          <div className={styles.slabCard}>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>2 kW सिस्टम</span>
              <span className={styles.loadType}>मध्यम परिवार / फ्रिज + टीवी + पंखे</span>
            </div>
            <div className={styles.slabAmount}>
              ₹90,000 <span className={styles.slabLabel}>तक कुल संभावित सब्सिडी*</span>
            </div>
            <div className={styles.slabMiniBreakdown}>
              <span>केंद्र: ₹60,000</span> + <span>यूपी राज्य: ₹30,000</span>
            </div>
            <p className={styles.slabDesc}>
              2 किलोवाट ऑन-ग्रिड आवासीय सिस्टम पर केंद्र (₹60,000) तथा राज्य सरकार (₹30,000) द्वारा देय मानक सब्सिडी दर।
            </p>
          </div>

          <div className={`${styles.slabCard} ${styles.slabHighlight}`}>
            <div className={styles.popularBadge}>सर्वाधिक लोकप्रिय</div>
            <div className={styles.slabHeader}>
              <span className={styles.kwBadge}>3 kW सिस्टम</span>
              <span className={styles.loadType}>1.5 टन एसी + फ्रिज + वाशिंग मशीन</span>
            </div>
            <div className={styles.slabAmountHighlight}>
              ₹1,08,000 <span className={styles.slabLabelHighlight}>तक अधिकतम कुल सब्सिडी*</span>
            </div>
            <div className={styles.slabMiniBreakdownHighlight}>
              <span>केंद्र: ₹78,000</span> + <span>यूपी राज्य: ₹30,000</span>
            </div>
            <p className={styles.slabDesc}>
              3 किलोवाट ऑन-ग्रिड आवासीय रूफटॉप सोलर पर केंद्र व उत्तर प्रदेश सरकार द्वारा देय अधिकतम संयुक्त वित्तीय सहायता।
            </p>
          </div>
        </div>

        {/* 4. Information Grid: What, Who, Documents, Process */}
        <div className={styles.infoGrid}>
          {/* Box 1: What & Who */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>❓</span> पीएम सूर्य घर एवं यूपी सौर नीति क्या है?
            </h3>
            <p className={styles.infoText}>
              <strong>पीएम सूर्य घर: मुफ्त बिजली योजना</strong> भारत सरकार द्वारा 1 करोड़ घरों को सौर ऊर्जा से जोड़ने हेतु प्रारंभ की गई राष्ट्रीय योजना है। इसके साथ ही, <strong>उत्तर प्रदेश सौर ऊर्जा नीति 2022</strong> के तहत यूपी सरकार प्रति किलोवाट ₹15,000 (अधिकतम ₹30,000) की अतिरिक्त राज्य सब्सिडी प्रदान कर रही है।
            </p>
            <h4 className={styles.infoSubhead}>पात्रता शर्तें:</h4>
            <ul className={styles.infoList}>
              <li>आवेदक उत्तर प्रदेश का स्थायी निवासी एवं वैध नागरिक हो।</li>
              <li>स्वयं का पक्का आवासीय मकान या छत का स्वामित्व हो।</li>
              <li>आवेदक के नाम पर सक्रिय घरेलू (Residential / LMVI) बिजली कनेक्शन हो।</li>
              <li>छत पर सोलर पैनल लगाने हेतु पर्याप्त छाया-रहित (Shadow-free) स्थान उपलब्ध हो।</li>
            </ul>
          </div>

          {/* Box 2: Required Documents */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>📑</span> आवश्यक दस्तावेज (Required Documents)
            </h3>
            <p className={styles.infoText}>
              पीएम सूर्य घर राष्ट्रीय पोर्टल पर पंजीकरण एवं यूपी डिस्कॉम नेट-मीटरिंग के लिए आवश्यक प्राथमिक दस्तावेज:
            </p>
            <ul className={styles.infoList}>
              <li><strong>नवीनतम बिजली बिल</strong> (Electricity Consumer Account No. / CA Number सहित)</li>
              <li><strong>आधार कार्ड</strong> (बिजली बिल पर दर्ज नाम से मिलान आवश्यक)</li>
              <li><strong>बैंक पासबुक या कैंसिल्ड चेक</strong> (सब्सिडी की राशि सीधे डीबीटी द्वारा इसी खाते में आती है)</li>
              <li><strong>छत की वर्तमान फोटो</strong> तथा आधार से लिंक सक्रिय मोबाइल नंबर (ओटीपी हेतु)</li>
            </ul>
          </div>

          {/* Box 3: Application Process */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>⚙️</span> 5-चरणीय सरकारी सब्सिडी प्रक्रिया
            </h3>
            <ol className={styles.processSteps}>
              <li>
                <strong>पोर्टल पर रजिस्ट्रेशन:</strong> pmsuryaghar.gov.in पर राज्य (उत्तर प्रदेश), डिस्कॉम (DVVNL/PVVNL/MVVNL/PuVVNL) एवं बिजली खाता संख्या दर्ज कर पंजीकरण करें।
              </li>
              <li>
                <strong>तकनीकी स्वीकृति (Feasibility):</strong> डिस्कॉम द्वारा लोड और ग्रिड तकनीकी व्यवहार्यता की ऑनलाइन जांच व स्वीकृति।
              </li>
              <li>
                <strong>सिस्टम इंस्टॉलेशन:</strong> मानक नियमों एवं घरेलू (DCR) सोलर पैनल्स के साथ सिस्टम की स्थापना।
              </li>
              <li>
                <strong>नेट मीटरिंग व इंस्पेक्शन:</strong> डिस्कॉम टीम द्वारा नेट-मीटर लगाया जाता है और कमीशनिंग सर्टिफिकेट जारी होता है।
              </li>
              <li>
                <strong>डीबीटी सब्सिडी ट्रांसफर:</strong> कमीशनिंग रिपोर्ट सबमिट होने के बाद केंद्र सरकार (MNRE) एवं राज्य सरकार (UPNEDA) द्वारा सीधे बैंक खाते में सब्सिडी भेजी जाती है।
              </li>
            </ol>
          </div>

          {/* Box 4: How Shivashutosh Helps */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>🤝</span> शिवआशुतोष सोलर एजेंसी आपकी कैसे सहायता करती है?
            </h3>
            <p className={styles.infoText}>
              सरकारी पोर्टल पर आवेदन करने से लेकर नेट-मीटर चालू होने तक हमारी तकनीकी टीम आपके साथ रहती है:
            </p>
            <ul className={styles.infoList}>
              <li>मुफ्त साइट सर्वे करके छत के क्षेत्रफल एवं बिजली खपत अनुसार सही क्षमता का निर्धारण।</li>
              <li>पीएम सूर्य घर राष्ट्रीय पोर्टल पर रजिस्ट्रेशन एवं दस्तावेज अपलोड में पूर्ण तकनीकी सहायता।</li>
              <li>यूपीनेडा-एम्पैनल्ड वेंडर मानकों के अनुसार टियर-1 पैनल्स एवं इनवर्टर का सुरक्षित इंस्टॉलेशन।</li>
              <li>डिस्कॉम नेट-मीटरिंग, इंस्पेक्शन एवं कमीशनिंग फॉलो-अप में निरंतर सहयोग।</li>
            </ul>
            <div className={styles.cardCtaWrap}>
              <button type="button" onClick={handleFormScroll} className={styles.inlineCta}>
                सब्सिडी सहायता एवं मुफ्त साइट सर्वे बुक करें
              </button>
            </div>
          </div>
        </div>

        {/* 5. Mandatory Eligibility and Legal Disclosure Box */}
        <div className={styles.mandatoryDisclaimerBox}>
          <div className={styles.disclaimerHeader}>
            <span className={styles.disclaimerIcon}>⚖️</span>
            <div>
              <h4 className={styles.disclaimerTitle}>
                पात्रता, सब्सिडी सीमा एवं विधिक अस्वीकरण (Legal & Eligibility Disclosure)
              </h4>
              <p className={styles.disclaimerSubtitle}>
                कृपया सरकारी सब्सिडी से संबंधित निम्नलिखित वैधानिक एवं तकनीकी नियमों को ध्यानपूर्वक पढ़ें:
              </p>
            </div>
          </div>

          <div className={styles.primaryNoticeQuote}>
            <p>
              &ldquo;₹1,08,000 तक की कुल सब्सिडी पात्र घरेलू (Residential) Rooftop Solar उपभोक्ताओं के लिए लागू सरकारी योजनाओं के अंतर्गत संभावित अधिकतम राशि है। केंद्र एवं उत्तर प्रदेश सरकार की सब्सिडी ग्राहक की पात्रता, स्वीकृत सोलर क्षमता, लागू योजना के नियमों, आवश्यक अनुमोदन, DISCOM सत्यापन तथा अन्य शर्तों पर निर्भर करती है। वास्तविक स्वीकृत राशि इससे कम भी हो सकती है। सब्सिडी की गारंटी नहीं दी जाती।&rdquo;
            </p>
          </div>

          <div className={styles.disclaimerList}>
            <div className={styles.disclaimerItem}>
              <strong>1. व्यावसायिक / गैर-घरेलू उपभोक्ता:</strong>
              <span>
                वाणिज्यिक (Commercial), औद्योगिक (Industrial) अथवा गैर-घरेलू कनेक्शन वाले उपभोक्ता आवासीय रूफटॉप सब्सिडी के पात्र नहीं होते। वे बिजली बिल में भारी बचत एवं आयकर डेप्रिसिएशन लाभ प्राप्त कर सकते हैं।
              </span>
            </div>
            <div className={styles.disclaimerItem}>
              <strong>2. आवश्यक तकनीकी एवं वेंडर मानक:</strong>
              <span>
                सब्सिडी केवल राष्ट्रीय पोर्टल (pmsuryaghar.gov.in) पर पंजीकृत आवेदनों, एम्पैनल्ड वेंडर के माध्यम से स्थापित सिस्टम, तथा प्रमाणित घरेलू विनिर्मित (DCR) सोलर मॉड्यूल्स पर ही अनुमन्य है।
              </span>
            </div>
            <div className={styles.disclaimerItem}>
              <strong>3. स्वतंत्र अनुमोदन एवं डीबीटी प्रक्रिया:</strong>
              <span>
                केंद्रीय एवं राज्य सरकार की सब्सिडी उनके संबंधित मंत्रालयों (MNRE / UPNEDA) एवं डिस्कॉम द्वारा तकनीकी निरीक्षण, नेट-मीटरिंग तथा बजट आवंटन के अनुसार सीधे उपभोक्ता के बैंक खाते में DBT द्वारा हस्तांतरित की जाती है।
              </span>
            </div>
            <div className={styles.disclaimerItem}>
              <strong>4. कोई मुफ्त स्थापना या गारंटीकृत दावा नहीं:</strong>
              <span>
                शिवआशुतोष सोलर एजेंसी एक तकनीकी इंस्टॉलेशन व कंसल्टिंग चैनल पार्टनर है। हम किसी भी ग्राहक को मुफ्त सोलर स्थापना या गारंटीकृत सरकारी स्वीकृति का भ्रामक दावा नहीं करते।
              </span>
            </div>
          </div>
        </div>

        {/* 6. Official Government Source Verification */}
        <div className={styles.officialSourcesBox}>
          <h4 className={styles.sourcesHeading}>
            🏛️ आधिकारिक सरकारी स्रोत एवं सत्यापन लिंक (Official Government Sources)
          </h4>
          <p className={styles.sourcesSub}>
            सब्सिडी दरों, दिशा-निर्देशों एवं नियमों के आधिकारिक सत्यापन हेतु सरकारी पोर्टल्स:
          </p>
          <div className={styles.sourcesGrid}>
            <a
              href="https://pmsuryaghar.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePortalClick('pmsuryaghar.gov.in')}
              className={styles.sourceCard}
            >
              <div className={styles.sourceName}>PM Surya Ghar National Portal</div>
              <div className={styles.sourceDesc}>नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE), भारत सरकार</div>
              <span className={styles.sourceLinkText}>pmsuryaghar.gov.in ↗</span>
            </a>

            <a
              href="https://mnre.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePortalClick('mnre.gov.in')}
              className={styles.sourceCard}
            >
              <div className={styles.sourceName}>MNRE Official Website</div>
              <div className={styles.sourceDesc}>Ministry of New and Renewable Energy, Government of India</div>
              <span className={styles.sourceLinkText}>mnre.gov.in ↗</span>
            </a>

            <a
              href="https://www.upneda.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handlePortalClick('upneda.org.in')}
              className={styles.sourceCard}
            >
              <div className={styles.sourceName}>UPNEDA Official Portal</div>
              <div className={styles.sourceDesc}>उत्तर प्रदेश नवीन एवं नवीकरणीय ऊर्जा विकास अभिकरण (यूपी सौर ऊर्जा नीति)</div>
              <span className={styles.sourceLinkText}>upneda.org.in ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
