"use client";

import React, { useState, useEffect } from 'react';
import styles from './EmiCalculatorTool.module.css';

const QUICK_OPTIONS = [
  { label: 'Home Loan', amount: '5000000', rate: '8.5', tenure: '20', type: 'years' },
  { label: 'Car Loan', amount: '800000', rate: '9.0', tenure: '5', type: 'years' },
  { label: 'Personal Loan', amount: '500000', rate: '12.0', tenure: '3', type: 'years' },
  { label: 'Education Loan', amount: '1500000', rate: '10.5', tenure: '7', type: 'years' },
  { label: 'Business Loan', amount: '2000000', rate: '14.0', tenure: '5', type: 'years' }
];

export default function EmiCalculatorTool() {
  const [amountInput, setAmountInput] = useState('');
  const [rateInput, setRateInput] = useState('');
  const [tenureInput, setTenureInput] = useState('');
  const [tenureType, setTenureType] = useState('years'); // 'years' or 'months'
  const [activeQuickOption, setActiveQuickOption] = useState(null);
  
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Format currency in Indian format
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleQuickOption = (option, index) => {
    setAmountInput(option.amount);
    setRateInput(option.rate);
    setTenureInput(option.tenure);
    setTenureType(option.type);
    setActiveQuickOption(index);
    setResults(null);
    setError('');
  };

  // Clear active quick option if user manually edits
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setActiveQuickOption(null);
  };

  const calculateEMI = () => {
    setError('');
    
    const principal = parseFloat(amountInput);
    const annualRate = parseFloat(rateInput);
    const tenureValue = parseFloat(tenureInput);

    if (isNaN(principal) || principal <= 0) {
      setError('Please enter a valid loan amount greater than 0. / कृपया शून्य से बड़ा सही अमाउंट डालें।');
      setResults(null);
      return;
    }
    
    if (isNaN(annualRate) || annualRate < 0) {
      setError('Please enter a valid interest rate. / कृपया सही ब्याज दर डालें।');
      setResults(null);
      return;
    }

    if (isNaN(tenureValue) || tenureValue <= 0) {
      setError('Please enter a valid loan tenure. / कृपया सही लोन अवधि डालें।');
      setResults(null);
      return;
    }

    // Convert tenure to months
    const tenureInMonths = tenureType === 'years' ? tenureValue * 12 : tenureValue;
    
    let emi = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (annualRate === 0) {
      // Zero interest edge case
      emi = principal / tenureInMonths;
      totalPayment = principal;
      totalInterest = 0;
    } else {
      // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const monthlyRate = annualRate / (12 * 100);
      const mathPower = Math.pow(1 + monthlyRate, tenureInMonths);
      
      emi = principal * monthlyRate * (mathPower / (mathPower - 1));
      totalPayment = emi * tenureInMonths;
      totalInterest = totalPayment - principal;
    }

    // Protection against infinite/NaN results due to extremely large values
    if (!isFinite(emi) || !isFinite(totalPayment)) {
      setError('Values are too large to calculate. Please enter smaller amounts.');
      setResults(null);
      return;
    }

    setResults({
      emi: Math.round(emi),
      principal: principal,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercentage: (principal / totalPayment) * 100,
      interestPercentage: (totalInterest / totalPayment) * 100
    });
  };

  const handleReset = () => {
    setAmountInput('');
    setRateInput('');
    setTenureInput('');
    setTenureType('years');
    setActiveQuickOption(null);
    setResults(null);
    setError('');
  };

  return (
    <div className={styles.calculatorContainer}>
      
      {/* Quick Options */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Quick Select (Example) / त्वरित चयन</label>
        <div className={styles.quickOptions}>
          {QUICK_OPTIONS.map((option, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.quickOptionBtn} ${activeQuickOption === idx ? styles.active : ''}`}
              onClick={() => handleQuickOption(option, idx)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loan Amount Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount-input">
          Loan Amount / लोन राशि
        </label>
        <div className={styles.inputWrapper}>
          <span className={styles.currencySymbol}>₹</span>
          <input
            id="amount-input"
            type="number"
            className={`${styles.input} ${styles.hasIcon}`}
            placeholder="e.g. 1000000"
            value={amountInput}
            onChange={handleInputChange(setAmountInput)}
            inputMode="decimal"
            min="0"
          />
        </div>
      </div>

      {/* Interest Rate Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="rate-input">
          Interest Rate (%) / ब्याज दर (वार्षिक)
        </label>
        <input
          id="rate-input"
          type="number"
          className={styles.input}
          placeholder="e.g. 8.5"
          value={rateInput}
          onChange={handleInputChange(setRateInput)}
          inputMode="decimal"
          min="0"
          step="0.1"
        />
      </div>

      {/* Loan Tenure Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="tenure-input">
          Loan Tenure / लोन अवधि
        </label>
        <input
          id="tenure-input"
          type="number"
          className={styles.input}
          placeholder="e.g. 5"
          value={tenureInput}
          onChange={handleInputChange(setTenureInput)}
          inputMode="decimal"
          min="0"
        />
        
        <div className={styles.tenureToggle} role="group" aria-label="Tenure Type">
          <button
            type="button"
            className={`${styles.tenureBtn} ${tenureType === 'years' ? styles.active : ''}`}
            onClick={() => { setTenureType('years'); setActiveQuickOption(null); }}
          >
            Years (वर्ष)
          </button>
          <button
            type="button"
            className={`${styles.tenureBtn} ${tenureType === 'months' ? styles.active : ''}`}
            onClick={() => { setTenureType('months'); setActiveQuickOption(null); }}
          >
            Months (महीने)
          </button>
        </div>
      </div>

      {error && <span className={styles.errorMsg} role="alert">{error}</span>}

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.btnReset}`} onClick={handleReset}>
          Reset / रीसेट
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={calculateEMI}>
          Calculate / गणना करें
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className={styles.resultCard} aria-live="polite">
          <div className={styles.resultHeader}>
            <div className={styles.resultTitle}>
              Monthly EMI / मासिक EMI
            </div>
            <div className={styles.resultTotal}>
              {formatINR(results.emi)}
            </div>
          </div>
          
          <div className={styles.resultBody}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Principal Amount (मूल राशि)</span>
              <span>{formatINR(results.principal)}</span>
            </div>
            
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Total Interest (कुल ब्याज)</span>
              <span>{formatINR(results.totalInterest)}</span>
            </div>
            
            <div className={`${styles.resultRow} ${styles.borderTop} ${styles.bold}`}>
              <span>Total Payment (कुल भुगतान)</span>
              <span>{formatINR(results.totalPayment)}</span>
            </div>

            {/* Visual Bar */}
            <div className={styles.visualBarContainer}>
              <div className={styles.visualTitle}>Principal vs Interest</div>
              <div className={styles.visualBar}>
                <div 
                  className={styles.barPrincipal} 
                  style={{ width: `${results.principalPercentage}%` }}
                  title={`Principal: ${results.principalPercentage.toFixed(1)}%`}
                ></div>
                <div 
                  className={styles.barInterest} 
                  style={{ width: `${results.interestPercentage}%` }}
                  title={`Interest: ${results.interestPercentage.toFixed(1)}%`}
                ></div>
              </div>
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <div className={`${styles.dot} ${styles.dotPrincipal}`}></div>
                  <span>Principal ({results.principalPercentage.toFixed(1)}%)</span>
                </div>
                <div className={styles.legendItem}>
                  <div className={`${styles.dot} ${styles.dotInterest}`}></div>
                  <span>Interest ({results.interestPercentage.toFixed(1)}%)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        <strong>Disclaimer / अस्वीकरण:</strong> These calculations are estimates and provided for general information purposes only. Actual interest rates, processing fees, taxes, and other charges by lenders may vary. Please consult with your financial institution before making any loan decisions. This tool does not provide financial advice.
      </div>

    {/* Search-Intent SEO Content */}
      <div className={styles.seoContent}>
        <h2 lang="hi">EMI Calculator क्या है?</h2>
        <p lang="hi">
          EMI (Equated Monthly Instalment) एक तय राशि (fixed amount) होती है जिसे आप हर महीने अपने लोन (Loan) को चुकाने के लिए देते हैं। इस EMI में <strong>मूलधन (Principal Amount)</strong> और <strong>ब्याज (Interest)</strong> दोनों शामिल होते हैं।
        </p>

        <h2 lang="hi">EMI कैसे Calculate करें? (EMI Formula)</h2>
        <p lang="hi">
          EMI निकालने के लिए reducing-balance formula का इस्तेमाल किया जाता है:
        </p>
        <div className={styles.exampleBox}>
          <h3>EMI Formula</h3>
          <p><strong>EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]</strong></p>
          <ul style={{ marginTop: '0.5rem', marginBottom: '0' }}>
            <li><strong>P</strong> = Loan Principal (लोन की राशि)</li>
            <li><strong>r</strong> = Monthly Interest Rate (वार्षिक ब्याज दर ÷ 12 ÷ 100)</li>
            <li><strong>n</strong> = Tenure in Months (लोन की अवधि महीनों में)</li>
          </ul>
        </div>

        <h2 lang="hi">Practical EMI Calculation Example</h2>
        <div className={styles.exampleBox}>
          <h3>Example: ₹5 Lakh Loan</h3>
          <p><strong>Loan Amount:</strong> ₹5,00,000</p>
          <p><strong>Interest Rate:</strong> 10% (Annual)</p>
          <p><strong>Tenure:</strong> 5 Years (60 Months)</p>
          <hr style={{ margin: '0.5rem 0', borderColor: 'var(--color-border)', opacity: 0.5 }} />
          <p><strong>Monthly EMI:</strong> ₹10,624</p>
          <p><strong>Total Interest:</strong> ₹1,37,411</p>
          <p><strong>Total Payment:</strong> ₹6,37,411</p>
        </div>

        <h2 lang="hi">EMI किन चीज़ों पर निर्भर करती है? (Factors affecting EMI)</h2>
        <ul lang="hi">
          <li><strong>Loan Amount (लोन राशि):</strong> लोन जितना ज्यादा होगा, EMI भी उतनी ही ज्यादा होगी।</li>
          <li><strong>Interest Rate (ब्याज दर):</strong> ब्याज दर बढ़ने से EMI का अमाउंट भी बढ़ जाता है।</li>
          <li><strong>Loan Tenure (लोन अवधि):</strong> लोन की अवधि (Years/Months) जितनी लंबी होगी, <em>Monthly EMI</em> उतनी ही कम होगी, लेकिन अंत में <em>Total Interest</em> ज़्यादा चुकाना पड़ेगा।</li>
        </ul>

        <h2 lang="hi">Total Interest (कुल ब्याज) कैसे निकालें?</h2>
        <p lang="hi">
          कैलकुलेटर <strong>Total Payment</strong> (Monthly EMI × Number of Months) में से <strong>Principal Amount</strong> (मूल लोन राशि) को घटाकर <strong>Total Interest</strong> निकालता है। लोन की तुलना (compare) करते समय सिर्फ EMI न देखें, Total Interest पर भी ध्यान दें।
        </p>

        <h2 lang="hi">0% Interest पर EMI कैसे निकलेगी?</h2>
        <p lang="hi">
          अगर गणितीय रूप (mathematically) से ब्याज दर (Interest Rate) 0% हो, तो EMI बहुत आसानी से निकलती है:
          <br/><strong>EMI = Loan Amount ÷ Number of Months</strong>
          <br/>(उदाहरण: ₹1,20,000 का 0% ब्याज पर 12 महीने के लिए लोन = ₹10,000 हर महीने।)
        </p>

        <h2 lang="hi">Loan Use Cases (उपयोग)</h2>
        <ul lang="hi">
          <li><strong>Personal Loan EMI:</strong> पर्सनल ज़रूरतों के लिए लिए गए लोन की किश्त।</li>
          <li><strong>Home Loan EMI:</strong> घर खरीदने या बनाने वाले लंबी अवधि के लोन।</li>
          <li><strong>Car/Vehicle Loan EMI:</strong> वाहन खरीदने के लिए लोन।</li>
          <li><strong>Education / Business Loan:</strong> पढ़ाई या व्यापार के लिए।</li>
        </ul>

        <div className={styles.disclaimerBox}>
          <p lang="hi">
            <strong>Important Note:</strong> यह EMI calculator अनुमानित गणना (estimation) के लिए है। Actual EMI lender की interest rate, processing fees, insurance, rounding, rate changes (floating rates) और loan terms के कारण अलग हो सकती है। Loan लेने से पहले संबंधित बैंक/lender की official terms और repayment schedule ज़रूर देखें।
          </p>
        </div>
      </div>
</div>
  );
}
