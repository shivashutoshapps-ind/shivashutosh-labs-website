"use client";

import React, { useState } from 'react';
import styles from './PercentageCalculatorTool.module.css';

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState('percentage-of');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 4,
    }).format(value);
  };

  const handleReset = () => {
    setVal1('');
    setVal2('');
    setResults(null);
    setError('');
  };

  const calculate = () => {
    setError('');
    setResults(null);

    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);

    if (isNaN(v1) || isNaN(v2)) {
      setError('Please enter valid numeric values. / कृपया सही संख्या दर्ज करें।');
      return;
    }

    if (mode === 'percentage-of') {
      // What is X% of Y?
      if (v2 === 0) {
        setError('Total value cannot be zero for this calculation. / कुल संख्या शून्य नहीं हो सकती।');
        return;
      }
      const res = (v1 * v2) / 100;
      setResults({
        label1: `${v1}% of ${formatNumber(v2)}`,
        value1: formatNumber(res),
      });
    } else if (mode === 'what-percentage') {
      // X is what percentage of Y?
      if (v2 === 0) {
        setError('Total value (denominator) cannot be zero. / कुल संख्या (Denominator) शून्य नहीं हो सकती।');
        return;
      }
      const res = (v1 / v2) * 100;
      setResults({
        label1: `${formatNumber(v1)} is what percentage of ${formatNumber(v2)}?`,
        value1: `${formatNumber(res)}%`,
      });
    } else if (mode === 'increase') {
      // Percentage increase from X to Y
      if (v1 === 0) {
        setError('Original value cannot be zero. / प्रारंभिक संख्या शून्य नहीं हो सकती।');
        return;
      }
      const increaseAmt = v2 - v1;
      const res = (increaseAmt / Math.abs(v1)) * 100;
      setResults({
        label1: 'Percentage Increase',
        value1: `${formatNumber(res)}%`,
        label2: 'Increase Amount',
        value2: formatNumber(increaseAmt),
      });
    } else if (mode === 'decrease') {
      // Percentage decrease from X to Y
      if (v1 === 0) {
        setError('Original value cannot be zero. / प्रारंभिक संख्या शून्य नहीं हो सकती।');
        return;
      }
      const decreaseAmt = v1 - v2;
      const res = (decreaseAmt / Math.abs(v1)) * 100;
      setResults({
        label1: 'Percentage Decrease',
        value1: `${formatNumber(res)}%`,
        label2: 'Decrease Amount',
        value2: formatNumber(decreaseAmt),
      });
    } else if (mode === 'difference') {
      // Difference between two values
      if (v1 === 0) {
        setError('Original value cannot be zero to calculate percentage change. / प्रतिशत परिवर्तन के लिए प्रारंभिक संख्या शून्य नहीं हो सकती।');
        return;
      }
      const diff = Math.abs(v1 - v2);
      const pctChange = ((v2 - v1) / Math.abs(v1)) * 100;
      setResults({
        label1: 'Percentage Change',
        value1: `${formatNumber(pctChange)}%`,
        label2: 'Absolute Difference',
        value2: formatNumber(diff),
      });
    }
  };

  const modeOptions = [
    { value: 'percentage-of', label: 'What is X% of Y? (X% of Y)', hint1: 'Percentage (X%)', hint2: 'Number (Y)' },
    { value: 'what-percentage', label: 'X is what percentage of Y?', hint1: 'Part (X)', hint2: 'Total (Y)' },
    { value: 'increase', label: 'Percentage Increase', hint1: 'Original Value', hint2: 'New Value' },
    { value: 'decrease', label: 'Percentage Decrease', hint1: 'Original Value', hint2: 'New Value' },
    { value: 'difference', label: 'Difference / Change', hint1: 'Original Value', hint2: 'New Value' },
  ];

  const currentModeOption = modeOptions.find(m => m.value === mode);

  return (
    <div>
      <div className={styles.calculatorContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="calcMode" className={styles.label}>Select Calculation Mode / गणना का प्रकार चुनें</label>
          <select 
            id="calcMode" 
            className={styles.input} 
            value={mode} 
            onChange={(e) => {
              setMode(e.target.value);
              handleReset();
            }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem', marginBottom: '1.5rem', background: 'var(--color-background)' }}
          >
            {modeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="val1" className={styles.label}>{currentModeOption.hint1}</label>
          <input
            id="val1"
            type="number"
            className={styles.input}
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            placeholder="Enter value"
            inputMode="decimal"
            step="any"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem' }}
          />
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
          <label htmlFor="val2" className={styles.label}>{currentModeOption.hint2}</label>
          <input
            id="val2"
            type="number"
            className={styles.input}
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            placeholder="Enter value"
            inputMode="decimal"
            step="any"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem' }}
          />
        </div>

        {error && <span className={styles.errorMsg} style={{ color: '#E53E3E', display: 'block', marginTop: '1rem', fontSize: '0.9rem' }} role="alert">{error}</span>}

        <div className={styles.actions} style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" className={styles.btn} onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: 'var(--color-border)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Reset / रीसेट
          </button>
          <button type="button" className={styles.btn} onClick={calculate} style={{ flex: 1, padding: '0.75rem', background: '#3182CE', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Calculate / निकालें
          </button>
        </div>

        {results && (
          <div className={styles.resultCard} aria-live="polite" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: results.label2 ? '1rem' : '0' }}>
              <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>{results.label1}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text)' }}>{results.value1}</div>
            </div>
            
            {results.label2 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>{results.label2}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text)' }}>{results.value2}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search-Intent SEO Content */}
      <div className={styles.seoContent}>
        <h2 lang="hi">Percentage Calculator (प्रतिशत कैलकुलेटर) क्या है?</h2>
        <p lang="hi">
          यह एक मुफ़्त ऑनलाइन टूल है जो आपको किसी भी संख्या का प्रतिशत (Percentage) निकालने, प्रतिशत बढ़ोतरी (Percentage Increase), प्रतिशत कमी (Percentage Decrease) और परीक्षा के अंकों (Exam Marks) का प्रतिशत आसानी से कैलकुलेट करने में मदद करता है।
        </p>

        <h2 lang="hi">Exam Marks का Percentage कैसे निकालें?</h2>
        <p lang="hi">
          अगर आप छात्र हैं और अपने स्कूल, कॉलेज या बोर्ड परीक्षा (Board Exams) के अंकों का प्रतिशत निकालना चाहते हैं, तो यह बहुत आसान है। जहाँ कुल अंकों और प्राप्त अंकों से सामान्य percentage निकालना हो, आप इस टूल का दूसरा मोड ("X is what percentage of Y?") इस्तेमाल कर सकते हैं।
        </p>
        <div className={styles.exampleBox}>
          <h3>उदाहरण 1: 500 में से 425 अंक</h3>
          <p>अगर किसी छात्र ने 500 में से 425 अंक प्राप्त किए:</p>
          <p><strong>Percentage</strong> = (425 ÷ 500) × 100 = <strong>85%</strong></p>
        </div>
        <div className={styles.exampleBox}>
          <h3>उदाहरण 2: 600 में से 468 अंक</h3>
          <p><strong>Percentage</strong> = (468 ÷ 600) × 100 = <strong>78%</strong></p>
        </div>

        <h2 lang="hi">Practical Percentage Examples</h2>
        <p lang="hi">दैनिक जीवन में प्रतिशत का उपयोग कई जगह होता है। नीचे कुछ प्रमुख उदाहरण दिए गए हैं:</p>
        <ul lang="hi">
          <li><strong>Percentage of a number (किसी संख्या का प्रतिशत):</strong> 500 रुपये का 20% = ₹100</li>
          <li><strong>Exam marks (अंकों का प्रतिशत):</strong> 425 / 500 = 85%</li>
          <li><strong>Percentage Increase (प्रतिशत बढ़ोतरी):</strong> ₹500 से बढ़कर ₹600 हो गया। Increase = 20%</li>
          <li><strong>Percentage Decrease (प्रतिशत कमी):</strong> ₹1,000 से घटकर ₹800 हो गया। Decrease = 20%</li>
        </ul>

        <h2 lang="hi">Percentage Formulas (प्रतिशत के फॉर्मूले)</h2>
        <ul lang="hi">
          <li><strong>Percentage of:</strong> (X ÷ 100) × Y</li>
          <li><strong>What percentage:</strong> (X ÷ Y) × 100</li>
          <li><strong>Percentage increase:</strong> ((New − Old) ÷ Old) × 100</li>
          <li><strong>Percentage decrease:</strong> ((Old − New) ÷ Old) × 100</li>
          <li><strong>Percentage difference:</strong> |A − B| ÷ ((A + B) ÷ 2) × 100</li>
        </ul>

        <h2 lang="hi">Government Form / Application Forms</h2>
        <p lang="hi">
          प्रतियोगी परीक्षाओं (Competitive Exams), स्कॉलरशिप (Scholarship Forms) और सरकारी फॉर्म भरते समय सही प्रतिशत डालना अनिवार्य होता है। यह कैलकुलेटर सटीक गणना में आपकी मदद करता है।
        </p>
        <p lang="hi">
          <strong>Important Note:</strong> Admission, recruitment, scholarship या institution-specific percentage rules के लिए संबंधित official notification/institution instructions को अंतिम मानें। कुछ संस्थाएं CGPA या विशेष फॉर्मूले का उपयोग करती हैं।
        </p>
      </div>
    </div>
  );
}
