"use client";

import React, { useState, useEffect } from 'react';
import styles from './GstCalculatorTool.module.css';

const QUICK_RATES = [0, 5, 12, 18, 28];

export default function GstCalculatorTool() {
  const [mode, setMode] = useState('add'); // 'add' or 'remove'
  const [taxType, setTaxType] = useState('intra'); // 'intra' or 'inter'
  const [amountInput, setAmountInput] = useState('');
  const [rateInput, setRateInput] = useState('18');
  
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Format currency in Indian format
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateGST = () => {
    setError('');
    const amount = parseFloat(amountInput);
    const rate = parseFloat(rateInput);

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than 0. / कृपया शून्य से बड़ा सही अमाउंट डालें।');
      setResults(null);
      return;
    }
    
    if (isNaN(rate) || rate < 0) {
      setError('Please enter a valid GST rate. / कृपया सही GST दर डालें।');
      setResults(null);
      return;
    }

    let baseAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (mode === 'add') {
      baseAmount = amount;
      gstAmount = (amount * rate) / 100;
      totalAmount = baseAmount + gstAmount;
    } else {
      // Remove GST
      totalAmount = amount;
      baseAmount = (amount * 100) / (100 + rate);
      gstAmount = totalAmount - baseAmount;
    }

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (taxType === 'intra') {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    setResults({
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      igst,
    });
  };

  const handleReset = () => {
    setAmountInput('');
    setRateInput('18');
    setResults(null);
    setError('');
  };

  return (
    <div className={styles.calculatorContainer}>
      
      {/* Mode Toggle */}
      <div className={styles.modeToggle} role="group" aria-label="Calculator Mode">
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'add' ? styles.active : ''}`}
          onClick={() => setMode('add')}
        >
          Add GST (+GST)
        </button>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'remove' ? styles.active : ''}`}
          onClick={() => setMode('remove')}
        >
          Remove GST (-GST)
        </button>
      </div>

      {/* Tax Type Toggle */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Tax Type / टैक्स का प्रकार</label>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="taxType" 
              value="intra" 
              checked={taxType === 'intra'} 
              onChange={() => setTaxType('intra')} 
            />
            Intra-State (CGST + SGST)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="taxType" 
              value="inter" 
              checked={taxType === 'inter'} 
              onChange={() => setTaxType('inter')} 
            />
            Inter-State (IGST)
          </label>
        </div>
      </div>

      {/* Amount Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount-input">
          {mode === 'add' ? 'Base Amount / मूल राशि' : 'Total Amount (Incl. GST) / कुल राशि (GST सहित)'}
        </label>
        <div className={styles.inputWrapper}>
          <span className={styles.currencySymbol}>₹</span>
          <input
            id="amount-input"
            type="number"
            className={`${styles.input} ${styles.hasIcon}`}
            placeholder="e.g. 10000"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            inputMode="decimal"
            min="0"
          />
        </div>
      </div>

      {/* GST Rate Input */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="rate-input">
          GST Rate (%) / GST दर
        </label>
        
        <div className={styles.rateButtons}>
          {QUICK_RATES.map((rate) => (
            <button
              key={rate}
              type="button"
              className={`${styles.rateBtn} ${parseFloat(rateInput) === rate ? styles.active : ''}`}
              onClick={() => setRateInput(rate.toString())}
            >
              {rate}%
            </button>
          ))}
        </div>
        
        <input
          id="rate-input"
          type="number"
          className={styles.input}
          placeholder="Custom Rate (e.g. 3)"
          value={rateInput}
          onChange={(e) => setRateInput(e.target.value)}
          inputMode="decimal"
          min="0"
          max="100"
          step="any"
        />
        <p className={styles.note}>
          * GST rate depends on the applicable goods/service classification.
        </p>
      </div>

      {error && <span className={styles.errorMsg} role="alert">{error}</span>}

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.btnReset}`} onClick={handleReset}>
          Reset / रीसेट
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={calculateGST}>
          Calculate / गणना करें
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className={styles.resultCard} aria-live="polite">
          <div className={styles.resultHeader}>
            <div className={styles.resultTitle}>
              {mode === 'add' ? 'Total Amount (Incl. GST)' : 'Base Amount (Excl. GST)'}
            </div>
            <div className={styles.resultTotal}>
              {formatINR(mode === 'add' ? results.totalAmount : results.baseAmount)}
            </div>
          </div>
          
          <div className={styles.resultBody}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>
                {mode === 'add' ? 'Base Amount' : 'Total Amount'}
              </span>
              <span>{formatINR(mode === 'add' ? results.baseAmount : results.totalAmount)}</span>
            </div>
            
            {taxType === 'intra' ? (
              <>
                <div className={styles.resultRow}>
                  <span className={styles.resultLabel}>CGST ({(parseFloat(rateInput)/2).toFixed(2)}%)</span>
                  <span>{formatINR(results.cgst)}</span>
                </div>
                <div className={styles.resultRow}>
                  <span className={styles.resultLabel}>SGST ({(parseFloat(rateInput)/2).toFixed(2)}%)</span>
                  <span>{formatINR(results.sgst)}</span>
                </div>
              </>
            ) : (
              <div className={styles.resultRow}>
                <span className={styles.resultLabel}>IGST ({parseFloat(rateInput)}%)</span>
                <span>{formatINR(results.igst)}</span>
              </div>
            )}
            
            <div className={`${styles.resultRow} ${styles.borderTop}`}>
              <span>Total GST Amount</span>
              <span>{formatINR(results.gstAmount)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Examples Section */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(37,99,235,0.03)', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text)' }}>Examples / उदाहरण:</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--color-background)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Add 18% GST to ₹10,000</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <li>Base: ₹10,000.00</li>
              <li>GST Amount: ₹1,800.00</li>
              <li>CGST (9%): ₹900.00</li>
              <li>SGST (9%): ₹900.00</li>
              <li style={{ fontWeight: 600, color: 'var(--color-text)', marginTop: '0.25rem' }}>Total: ₹11,800.00</li>
            </ul>
          </div>
          
          <div style={{ background: 'var(--color-background)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Remove 18% GST from ₹11,800</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              <li>Total: ₹11,800.00</li>
              <li>Base Amount: ₹10,000.00</li>
              <li>GST Amount: ₹1,800.00</li>
              <li>CGST (9%): ₹900.00</li>
              <li style={{ fontWeight: 600, color: 'var(--color-text)', marginTop: '0.25rem' }}>Total GST: ₹1,800.00</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
