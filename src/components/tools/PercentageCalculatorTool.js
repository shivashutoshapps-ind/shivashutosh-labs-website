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

      {/* SEO Landing Content */}
      <div style={{ marginTop: '3rem' }}>
        <h1 lang="hi" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Percentage Calculator</h1>
        <h2 lang="hi" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>प्रतिशत कैलकुलेटर</h2>
        
        <div style={{ lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--color-text)' }}>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. Percentage Calculator</h3>
          <p>
            Welcome to the free online Percentage Calculator by Shivashutosh Labs. This tool helps you quickly calculate percentages, percentage increase/decrease, differences, and marks percentage. Whether you are a student calculating exam marks, or a professional checking a discount, our tool provides exact results instantly without any signup.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. How to Calculate Percentage</h3>
          <p>
            Percentage means &quot;out of 100&quot;. To calculate the percentage of any number, you multiply the number by the percentage rate and divide by 100.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. Percentage Formula</h3>
          <p>
            The basic formula for finding X% of Y is: <strong>Result = (X × Y) / 100</strong>
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>4. What is X% of Y?</h3>
          <p>
            If you want to find out what 20% of 500 is, use Mode 1 in our calculator. (20 × 500) / 100 = 100.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>5. How to Find What Percentage X is of Y</h3>
          <p>
            To find what percentage 50 is of 200, use Mode 2. Formula: (50 / 200) × 100 = 25%.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>6. Percentage Increase</h3>
          <p>
            Percentage increase is useful for calculating salary hikes or price inflations. Formula: ((New Value - Original Value) / Original Value) × 100.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>7. Percentage Decrease</h3>
          <p>
            Percentage decrease helps in finding discount values or price drops. Formula: ((Original Value - New Value) / Original Value) × 100.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>8. Percentage Calculator for Exam Marks</h3>
          <p>
            If a student scores 420 out of 500: Percentage = (420 / 500) × 100 = 84%. Simply use the &quot;X is what percentage of Y?&quot; mode to find your marks percentage.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>9. Real-Life Examples</h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Discount percentage:</strong> Find out how much you save during a sale.</li>
            <li><strong>Salary increase:</strong> Know your precise increment percentage during appraisals.</li>
            <li><strong>Profit/Loss percentage:</strong> Easily compute your business margins.</li>
            <li><strong>GST-related calculation:</strong> Quickly figure out the tax portion of a bill.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
