"use client";

import React, { useState, useEffect } from 'react';
import styles from './AgeCalculatorTool.module.css';

const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Helper to create a local Date at midnight from 'YYYY-MM-DD' to avoid timezone shifts
function parseLocalDate(dateString) {
  if (!dateString) return null;
  const [y, m, d] = dateString.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Helper to get number of days in a given month/year
function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function isLeapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export default function AgeCalculatorTool() {
  const [dobInput, setDobInput] = useState('');
  
  // Set default calcDate to today
  const [calcDateInput, setCalcDateInput] = useState('');
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setCalcDateInput(`${yyyy}-${mm}-${dd}`);
  }, []);

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    setError('');
    
    if (!dobInput) {
      setError('Please select your Date of Birth. / कृपया अपनी जन्म तिथि चुनें।');
      setResults(null);
      return;
    }
    
    if (!calcDateInput) {
      setError('Please select the calculation date. / कृपया गणना की तिथि चुनें।');
      setResults(null);
      return;
    }

    const dob = parseLocalDate(dobInput);
    const calcDate = parseLocalDate(calcDateInput);

    if (calcDate < dob) {
      setError('Calculation date cannot be before Date of Birth. / गणना की तिथि जन्म तिथि से पहले नहीं हो सकती।');
      setResults(null);
      return;
    }

    // --- 1. Exact Age (Years, Months, Days) ---
    let d1 = dob.getDate();
    let m1 = dob.getMonth();
    let y1 = dob.getFullYear();

    let d2 = calcDate.getDate();
    let m2 = calcDate.getMonth();
    let y2 = calcDate.getFullYear();

    let years = y2 - y1;
    let months = m2 - m1;
    let days = d2 - d1;

    if (days < 0) {
      months--;
      // Borrow days from the previous month of calcDate
      let prevMonth = m2 - 1;
      let prevYear = y2;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      days += getDaysInMonth(prevYear, prevMonth);
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // --- 2. Total calculations ---
    // Total days is just the timestamp difference in days
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((calcDate - dob) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    
    // Total months: years * 12 + extra months from calc. (Approx if days > 0)
    const totalMonths = (years * 12) + months;
    
    // --- 3. Next Birthday ---
    let nextBdayYear = y2;
    let isLeapBday = (m1 === 1 && d1 === 29); // Born Feb 29
    
    // Determine the birthday date in the calcYear
    let bdayThisYearMonth = m1;
    let bdayThisYearDay = d1;

    // Handle Feb 29 babies in non-leap years (usually celebrated March 1st)
    if (isLeapBday && !isLeapYear(nextBdayYear)) {
      bdayThisYearMonth = 2; // March
      bdayThisYearDay = 1;
    }

    let nextBday = new Date(nextBdayYear, bdayThisYearMonth, bdayThisYearDay);

    // If birthday has already passed this year, it's next year
    // Consider same day as 0 days left
    if (nextBday < calcDate && (nextBday.getTime() !== calcDate.getTime())) {
      nextBdayYear++;
      
      if (isLeapBday && !isLeapYear(nextBdayYear)) {
        nextBday = new Date(nextBdayYear, 2, 1);
      } else {
        nextBday = new Date(nextBdayYear, m1, d1);
      }
    }

    const daysUntilNextBday = Math.floor((nextBday - calcDate) / msPerDay);
    const isBirthdayToday = (daysUntilNextBday === 0 && months === 0 && days === 0);

    setResults({
      years,
      months,
      days,
      totalYears: years, // Same as years for display purposes
      totalMonths,
      totalWeeks,
      totalDays,
      daysUntilNextBday,
      nextBdayDate: nextBday,
      dayOfBirthIndex: dob.getDay(),
      isBirthdayToday
    });
  };

  const handleReset = () => {
    setDobInput('');
    // reset calcDate to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setCalcDateInput(`${yyyy}-${mm}-${dd}`);
    setResults(null);
    setError('');
  };

  return (
    <div className={styles.calculatorContainer}>
      
      {/* DOB Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="dob-input">
          Date of Birth / जन्म तिथि
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="dob-input"
            type="date"
            className={styles.input}
            value={dobInput}
            onChange={(e) => setDobInput(e.target.value)}
            max={calcDateInput || undefined}
          />
        </div>
      </div>

      {/* Calculate On Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="calcdate-input">
          Calculate Age On / इस तिथि तक उम्र निकालें
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="calcdate-input"
            type="date"
            className={styles.input}
            value={calcDateInput}
            onChange={(e) => setCalcDateInput(e.target.value)}
          />
        </div>
      </div>

      {error && <span className={styles.errorMsg} role="alert">{error}</span>}

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.btnReset}`} onClick={handleReset}>
          Reset / रीसेट
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={calculateAge}>
          Calculate / गणना करें
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className={styles.resultCard} aria-live="polite">
          
          <div className={styles.resultHeader}>
            <div className={styles.resultTitle}>Your Exact Age / आपकी सटीक उम्र</div>
            
            <div className={styles.resultAge}>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{results.years}</span>
                <span className={styles.ageLabel}>Years</span>
              </div>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{results.months}</span>
                <span className={styles.ageLabel}>Months</span>
              </div>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{results.days}</span>
                <span className={styles.ageLabel}>Days</span>
              </div>
            </div>
          </div>
          
          <div className={styles.resultBody}>

            {results.isBirthdayToday && (
              <div className={styles.happyBirthday}>
                🎉 Happy Birthday! जन्मदिन मुबारक हो! 🎂
              </div>
            )}

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <div className={styles.statValue}>
                  {new Intl.NumberFormat('en-IN').format(results.totalMonths)}
                </div>
                <div className={styles.statLabel}>Total Months</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statValue}>
                  {new Intl.NumberFormat('en-IN').format(results.totalWeeks)}
                </div>
                <div className={styles.statLabel}>Total Weeks</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statValue}>
                  {new Intl.NumberFormat('en-IN').format(results.totalDays)}
                </div>
                <div className={styles.statLabel}>Total Days</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statValue}>
                  {WEEKDAYS_EN[results.dayOfBirthIndex]}
                  <br/>
                  <span style={{ fontSize: '0.85em', color: 'var(--color-text-secondary)' }}>
                    {WEEKDAYS_HI[results.dayOfBirthIndex]}
                  </span>
                </div>
                <div className={styles.statLabel}>Day of Birth</div>
              </div>
            </div>

            <div className={styles.nextBirthdayBox}>
              <div className={styles.nextBirthdayRow}>
                <span className={styles.nextBirthdayLabel}>Next Birthday / अगला जन्मदिन:</span>
                <span className={styles.nextBirthdayValue}>
                  {results.nextBdayDate.getDate()} {MONTHS[results.nextBdayDate.getMonth()]} {results.nextBdayDate.getFullYear()}
                </span>
              </div>
              <div className={styles.nextBirthdayRow}>
                <span className={styles.nextBirthdayLabel}>Days Remaining / बचे हुए दिन:</span>
                <span className={styles.nextBirthdayValue}>
                  {results.daysUntilNextBday === 0 ? 'Today' : `${results.daysUntilNextBday} days`}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}


      {/* Search-Intent SEO Content */}
      <div className={styles.seoContent}>
        <h2 lang="hi">Age Calculator क्या है? (What is Age Calculator?)</h2>
        <p lang="hi">
          Age Calculator एक बहुत ही उपयोगी ऑनलाइन टूल है, जिससे आप अपनी जन्म तारीख (Date of Birth) डालकर अपनी सटीक उम्र निकाल सकते हैं। यह टूल आपको Years (वर्ष), Months (महीने) और Days (दिन) में Exact Age बताता है। इसके अलावा, आप कुल दिन (Total Days), सप्ताह और अगले जन्मदिन (Next Birthday) की जानकारी भी मुफ्त में प्राप्त कर सकते हैं।
        </p>

        <h2 lang="hi">जन्म तारीख से उम्र कैसे निकालें?</h2>
        <p lang="hi">
          अपनी उम्र (Umar) निकालने के लिए आपको किसी डायरी या पेन की जरूरत नहीं है:
        </p>
        <ul lang="hi">
          <li><strong>Date of Birth:</strong> ऊपर दिए गए बॉक्स में अपनी जन्म तिथि चुनें।</li>
          <li><strong>Calculate Age On:</strong> आप आज की तारीख या भविष्य की कोई भी तारीख (Specific Date) चुन सकते हैं।</li>
          <li><strong>Calculate:</strong> बटन दबाते ही आपको अपनी सटीक उम्र (Exact Age) मिल जाएगी।</li>
        </ul>

        <h2 lang="hi">Government Job / Form में Age Calculation</h2>
        <p lang="hi">
          सरकारी नौकरी (Sarkari Job) या प्रतियोगी परीक्षा (SSC, UPSC, Railway, Police, Army) के फॉर्म भरते समय उम्मीदवारों को एक कटऑफ तारीख (Cutoff Date) दी जाती है (जैसे 1 जनवरी या 1 जुलाई)। आपको यह जांचना होता है कि उस विशेष तारीख पर आपकी उम्र कितनी है।
        </p>
        <p lang="hi">
          <strong>Important Note:</strong> यह calculator आपकी age calculation में मदद करता है। सरकारी भर्ती में eligibility, cutoff date और age relaxation के लिए संबंधित official notification को अंतिम मानें।
        </p>

        <h2 lang="hi">Age as on a Specific Date (किसी तारीख पर उम्र)</h2>
        <p lang="hi">
          कई बार स्कूलों में एडमिशन के लिए भी 31 मार्च तक उम्र जांची जाती है। आप "Calculate Age On" विकल्प में उस कटऑफ डेट को डालकर आसानी से अपनी उम्र चेक कर सकते हैं।
        </p>
        
        <div className={styles.exampleBox}>
          <h3>Age Calculation Example (उदाहरण)</h3>
          <p><strong>Date of Birth:</strong> 15 August 2000</p>
          <p><strong>Age on:</strong> 22 August 2026</p>
          <p><strong>Result:</strong> 26 Years, 0 Months, 7 Days</p>
          <p lang="hi" style={{ fontSize: '0.85rem', marginTop: 'var(--space-2)' }}>इस उदाहरण में देखा जा सकता है कि यह टूल 22 अगस्त 2026 तक व्यक्ति की उम्र ठीक 26 साल और 7 दिन बता रहा है।</p>
        </div>

        <h2 lang="hi">Leap Year / 29 February (लीप ईयर कैलकुलेशन)</h2>
        <p lang="hi">
          उम्र निकालते समय महीनों के अलग-अलग दिन (28, 29, 30 या 31) कन्फ्यूजन पैदा करते हैं। हमारा Age Calculator पूरी तरह से कैलेंडर नियमों पर आधारित है। यदि आपका जन्म 29 फरवरी (Leap Year) को हुआ है, तो सामान्य वर्षों में टूल आपके जन्मदिन को सही तरीके से एडजस्ट (1 मार्च) कर लेता है।
        </p>
      </div>

    </div>
  );
}
