"use client";

import React, { useState } from 'react';
import styles from './SipCalculatorTool.module.css';

const QUICK_OPTIONS = [
  { label: '₹1,000 / mo', amount: '1000', rate: '12', tenure: '10', type: 'years' },
  { label: '₹5,000 / mo', amount: '5000', rate: '12', tenure: '10', type: 'years' },
  { label: '₹10,000 / mo', amount: '10000', rate: '12', tenure: '10', type: 'years' },
  { label: '₹20,000 / mo', amount: '20000', rate: '12', tenure: '10', type: 'years' },
  { label: '₹50,000 / mo', amount: '50000', rate: '12', tenure: '10', type: 'years' }
];

export default function SipCalculatorTool() {
  const [amountInput, setAmountInput] = useState('');
  const [rateInput, setRateInput] = useState('12');
  const [tenureInput, setTenureInput] = useState('10');
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
    }).format(Math.round(value));
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

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setActiveQuickOption(null);
  };

  const calculateSIP = () => {
    setError('');
    const P = parseFloat(amountInput);
    const annualRate = parseFloat(rateInput);
    const tenureValue = parseFloat(tenureInput);

    if (isNaN(P) || P <= 0) {
      setError('Please enter a valid monthly SIP amount greater than 0. / कृपया 0 से अधिक वैध मासिक SIP राशि दर्ज करें।');
      setResults(null);
      return;
    }
    
    if (isNaN(annualRate) || annualRate < 0) {
      setError('Please enter a valid expected return rate (0 or positive). / कृपया वैध अनुमानित रिटर्न दर दर्ज करें।');
      setResults(null);
      return;
    }

    if (isNaN(tenureValue) || tenureValue <= 0) {
      setError('Please enter a valid investment duration. / कृपया निवेश की वैध अवधि दर्ज करें।');
      setResults(null);
      return;
    }

    // Convert tenure to months
    const N = tenureType === 'years' ? tenureValue * 12 : tenureValue;
    
    const totalInvestment = P * N;
    let maturityValue = 0;

    if (annualRate === 0) {
      maturityValue = totalInvestment;
    } else {
      const i = annualRate / 12 / 100;
      maturityValue = P * (((Math.pow(1 + i, N) - 1) / i)) * (1 + i);
    }

    const estimatedReturns = maturityValue - totalInvestment;

    if (!isFinite(maturityValue) || !isFinite(totalInvestment) || maturityValue < 0) {
      setError('Values are too large or unstable to calculate. Please enter sensible numbers.');
      setResults(null);
      return;
    }

    setResults({
      totalInvestment,
      estimatedReturns,
      maturityValue,
      monthlySip: P,
      annualRate,
      durationLabel: `${tenureValue} ${tenureType === 'years' ? 'Years' : 'Months'}`
    });
  };

  const handleReset = () => {
    setAmountInput('');
    setRateInput('12');
    setTenureInput('10');
    setTenureType('years');
    setActiveQuickOption(null);
    setResults(null);
    setError('');
  };

  return (
    <div>
      <div className={styles.calculatorContainer}>
        
        {/* Quick Options */}
        <div className={styles.quickOptions}>
          {QUICK_OPTIONS.map((opt, i) => (
            <button 
              key={i}
              type="button"
              className={`${styles.quickBtn} ${activeQuickOption === i ? styles.active : ''}`}
              onClick={() => handleQuickOption(opt, i)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* SIP Amount Input */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="amount-input">
            Monthly SIP Amount / मासिक निवेश
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.currencySymbol}>₹</span>
            <input
              id="amount-input"
              type="number"
              className={styles.inputWithSymbol}
              placeholder="e.g. 5000"
              value={amountInput}
              onChange={handleInputChange(setAmountInput)}
              inputMode="decimal"
              min="0"
            />
          </div>
        </div>

        {/* Expected Return Input */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="rate-input">
            Expected Annual Return / अनुमानित वार्षिक रिटर्न (%)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="rate-input"
              type="number"
              className={styles.inputWithSymbolRight}
              placeholder="e.g. 12"
              value={rateInput}
              onChange={handleInputChange(setRateInput)}
              inputMode="decimal"
              min="0"
              max="100"
              step="any"
            />
            <span className={styles.percentSymbol}>%</span>
          </div>
        </div>

        {/* Investment Duration Input */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tenure-input">
            Investment Duration / निवेश अवधि
          </label>
          <input
            id="tenure-input"
            type="number"
            className={styles.input}
            placeholder="e.g. 10"
            value={tenureInput}
            onChange={handleInputChange(setTenureInput)}
            inputMode="decimal"
            min="0"
          />
          
          <div className={styles.tenureToggle} role="group" aria-label="Duration Type">
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
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={calculateSIP}>
            Calculate / निकालें
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className={styles.resultCard} aria-live="polite">
            
            <div className={styles.resultHeader}>
              <div className={styles.resultTitle}>Estimated Maturity Value / अनुमानित कुल राशि</div>
              <div className={styles.resultEmi}>{formatINR(results.maturityValue)}</div>
            </div>
            
            <div className={styles.resultBody}>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Monthly SIP</span>
                <span>{formatINR(results.monthlySip)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Total Investment</span>
                <span>{formatINR(results.totalInvestment)}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>Estimated Returns</span>
                <span>{formatINR(results.estimatedReturns)}</span>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div style={{ marginTop: '1.5rem', background: '#e2e8f0', height: '24px', borderRadius: '12px', display: 'flex', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${(results.totalInvestment / results.maturityValue) * 100}%`, 
                  background: 'var(--color-primary)', 
                  height: '100%', 
                  transition: 'width 0.5s ease' 
                }} 
                title="Invested Amount"
              ></div>
              <div 
                style={{ 
                  width: `${(results.estimatedReturns / results.maturityValue) * 100}%`, 
                  background: '#38a169', 
                  height: '100%', 
                  transition: 'width 0.5s ease' 
                }} 
                title="Estimated Returns"
              ></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', background: 'var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Invested Amount
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#38a169', borderRadius: '50%', display: 'inline-block' }}></span>
                Estimated Returns
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderLeft: '4px solid var(--color-primary)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
          <strong>Disclaimer:</strong> This calculator provides an estimate only. Actual returns depend on market performance and are not guaranteed.<br/><br/>
          <strong>अस्वीकरण:</strong> यह कैलकुलेटर केवल अनुमानित गणना के लिए है। वास्तविक रिटर्न बाजार के प्रदर्शन पर निर्भर करता है और इसकी गारंटी नहीं है।
        </div>
      </div>

      {/* SEO Landing Content */}
      <div style={{ marginTop: '3rem' }}>
        <h1 lang="hi" style={{ fontSize: '2rem', marginBottom: '1rem' }}>SIP Calculator</h1>
        <h2 lang="hi" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>SIP कैलकुलेटर</h2>
        
        <div style={{ lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--color-text)' }}>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. SIP Calculator</h3>
          <p>
            Welcome to the free online SIP Calculator by Shivashutosh Labs. This tool helps you estimate the wealth you can create through regular monthly investments in mutual funds. It calculates the future value of your SIP investments based on your monthly investment amount, expected annual return, and investment duration.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. What is SIP?</h3>
          <p>
            SIP or Systematic Investment Plan is a method of investing a fixed sum of money regularly (usually monthly) in a mutual fund. It instills financial discipline and allows you to build wealth over the long term through the power of compounding and rupee cost averaging.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. How SIP Calculator Works</h3>
          <p>
            The SIP calculator uses the compound interest formula to estimate the future value of your investments. You provide the monthly investment amount, the expected rate of return, and the time period. The calculator then computes your total invested amount, the estimated wealth gained (returns), and the final maturity value.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>4. SIP Formula</h3>
          <p>
            The estimated future value of a SIP is calculated using the formula:<br/>
            <strong>FV = P × [((1 + i)^n - 1) / i] × (1 + i)</strong><br/>
            Where:<br/>
            <strong>FV</strong> = Future Value (Maturity Amount)<br/>
            <strong>P</strong> = Monthly investment amount<br/>
            <strong>i</strong> = Expected rate of return per month (Annual Rate / 12 / 100)<br/>
            <strong>n</strong> = Total number of monthly installments
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>5. Example SIP Calculation</h3>
          <p>
            Suppose you invest ₹5,000 every month for 10 years at an expected annual return of 12%.<br/>
            Total Investment = ₹5,000 × 120 months = ₹6,00,000<br/>
            Estimated Returns = ₹5,61,695<br/>
            Estimated Maturity Value = ₹11,61,695
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>6. Total Investment vs Estimated Returns</h3>
          <p>
            Our visual breakdown helps you see the ratio of your own money versus the wealth generated through compounding. Over longer periods, the estimated returns often surpass your total invested amount.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>7. How Monthly SIP Amount Affects Returns</h3>
          <p>
            Increasing your monthly SIP amount directly increases your total investment base, leading to a proportionally larger maturity value over the same period. Even a small increase in your monthly SIP can result in significant wealth creation over the long term.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>8. How Investment Duration Affects Compounding</h3>
          <p>
            Time is the most crucial factor in compounding. The longer you stay invested, the more your money grows. This is because you earn returns not just on your principal amount, but also on the accumulated returns from previous years. Starting early gives you a significant advantage.
          </p>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>9. SIP Calculator for ₹1,000 / ₹5,000 / ₹10,000</h3>
          <p>
            We have provided quick presets for common investment amounts like ₹1,000, ₹5,000, ₹10,000, and more. These are just helpers to quickly fill the form and are not investment recommendations. You can enter any custom amount as per your financial goals.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>10. Frequently Asked Questions</h3>
          <p>Please check the FAQ section below for common queries regarding SIP calculations and returns.</p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>11. Related Calculators</h3>
          <p>Explore our other useful calculators for EMI, Age, GST, and Percentages to manage your day-to-day calculations.</p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>12. Financial Disclaimer</h3>
          <p>
            This calculator provides an estimate only. Actual returns depend on market performance, the specific mutual fund or investment vehicle chosen, expense ratios, and applicable taxes. The results should not be considered as guaranteed returns or personalized financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
