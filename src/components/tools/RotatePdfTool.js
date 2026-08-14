'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import styles from './RotatePdfTool.module.css';

export default function RotatePdfTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  // Selection
  const [pageSelection, setPageSelection] = useState('all'); // 'all' or 'selected'
  
  // Parser
  const [rangeInput, setRangeInput] = useState('');
  const [parsedPages, setParsedPages] = useState([]);
  const [parseError, setParseError] = useState(null);
  const [parseWarning, setParseWarning] = useState(null);

  // Rotation State (relative offsets per page index: { "1": 90, "2": -90 })
  const [pendingRotations, setPendingRotations] = useState({});

  const fileInputRef = useRef(null);

  // Cleanup object URLs when results change or unmount
  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
      setFileStats(null); // free buffer
    };
  }, [result]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf') {
      setError('कृपया केवल PDF फाइल चुनें।');
      return;
    }
    
    setError(null);
    setParseError(null);
    setParseWarning(null);
    
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    
    setRangeInput('');
    setParsedPages([]);
    setPendingRotations({});
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      // Load strictly to get metadata and count
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pageCount,
        file: selectedFile,
        arrayBuffer: arrayBuffer
      });
      
    } catch (err) {
      console.error(err);
      setError('यह PDF पढ़ी नहीं जा सकी। कृपया दूसरी PDF चुनें।');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setFileStats(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
    setParseError(null);
    setParseWarning(null);
    setRangeInput('');
    setParsedPages([]);
    setPendingRotations({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Robust Page Range Parser (Reused)
  const parsePageRange = (input, maxPages) => {
    setParseError(null);
    setParseWarning(null);
    setParsedPages([]);
    
    if (!input.trim()) return;

    if (!/^[\d\s,-]+$/.test(input)) {
      setParseError('कृपया सही page range लिखें। (केवल अंक, कॉमा और डैश का उपयोग करें)');
      return;
    }

    const parts = input.split(',').map(p => p.trim()).filter(Boolean);
    const pages = [];

    for (const part of parts) {
      if (part.includes('-')) {
        const bounds = part.split('-');
        if (bounds.length !== 2) {
          setParseError(`अमान्य रेंज: ${part}`);
          return;
        }
        
        const start = parseInt(bounds[0], 10);
        const end = parseInt(bounds[1], 10);
        
        if (isNaN(start) || isNaN(end) || start < 1 || start > end) {
          setParseError(`अमान्य रेंज: ${part}`);
          return;
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (isNaN(pageNum) || pageNum < 1) {
          setParseError(`पेज नंबर ${part} मान्य नहीं है।`);
          return;
        }
        pages.push(pageNum);
      }
    }

    const invalidPages = pages.filter(p => p > maxPages);
    if (invalidPages.length > 0) {
      setParseError(`पेज ${invalidPages[0]} इस PDF में मौजूद नहीं है। कुल ${maxPages} पेज हैं।`);
      return;
    }

    const uniquePages = [...new Set(pages)].sort((a, b) => a - b);
    
    if (uniquePages.length < pages.length) {
      setParseWarning('एक ही पेज दो बार चुना गया था, इसलिए उसे एक बार ही लिया गया।');
    }
    
    if (uniquePages.length === 0) {
      setParseError('कोई मान्य पेज नहीं चुना गया।');
      return;
    }

    setParsedPages(uniquePages);
  };

  const handleRangeChange = (e) => {
    const val = e.target.value;
    setRangeInput(val);
    if (fileStats) {
      parsePageRange(val, fileStats.pageCount);
    }
  };

  const handleSelectionMode = (mode) => {
    setPageSelection(mode);
    setParseError(null);
    if (mode === 'all') {
      setParsedPages([]);
      setRangeInput('');
    }
  };

  const applyRotation = (angle) => {
    if (!fileStats) return;
    
    let targetPages = [];
    if (pageSelection === 'all') {
      for (let i = 1; i <= fileStats.pageCount; i++) {
        targetPages.push(i);
      }
    } else {
      if (parsedPages.length === 0 || parseError) return;
      targetPages = [...parsedPages];
    }
    
    setPendingRotations(prev => {
      const nextState = { ...prev };
      targetPages.forEach(p => {
        const current = nextState[p] || 0;
        let nextAngle = current + angle;
        // Normalize to positive 0-359
        nextAngle = ((nextAngle % 360) + 360) % 360;
        nextState[p] = nextAngle;
      });
      return nextState;
    });
  };

  const resetRotation = () => {
    if (!fileStats) return;
    
    let targetPages = [];
    if (pageSelection === 'all') {
      for (let i = 1; i <= fileStats.pageCount; i++) {
        targetPages.push(i);
      }
    } else {
      if (parsedPages.length === 0 || parseError) return;
      targetPages = [...parsedPages];
    }
    
    setPendingRotations(prev => {
      const nextState = { ...prev };
      targetPages.forEach(p => {
        nextState[p] = 0;
      });
      return nextState;
    });
  };

  const processRotation = async () => {
    if (!fileStats) return;
    
    const pagesToChange = Object.keys(pendingRotations).filter(k => pendingRotations[k] !== 0);
    
    if (pagesToChange.length === 0) {
      setError('कोई page rotation change नहीं किया गया।');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);

    try {
      const pdfDoc = await PDFDocument.load(fileStats.arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();
      
      let rotateCount = 0;
      
      for (let i = 0; i < pages.length; i++) {
        const pageNum = i + 1; // 1-indexed
        const relativeRotation = pendingRotations[pageNum];
        
        if (relativeRotation && relativeRotation !== 0) {
          const currentRotation = pages[i].getRotation().angle;
          let newRotation = currentRotation + relativeRotation;
          
          // Normalize to 0, 90, 180, 270
          newRotation = ((newRotation % 360) + 360) % 360;
          
          pages[i].setRotation(degrees(newRotation));
          rotateCount++;
        }
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const originalName = fileStats.name.replace(/\.pdf$/i, '');
      
      setResult({
        url,
        filename: `${originalName}-rotated.pdf`,
        size: blob.size,
        rotateCount
      });
      
    } catch (err) {
      console.error(err);
      setError('PDF तैयार करने में त्रुटि हुई।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const formatMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const formatKB = (bytes) => (bytes / 1024).toFixed(2);
  
  const formatSize = (bytes) => {
    if (bytes >= 1024 * 1024) return `${formatMB(bytes)} MB`;
    return `${formatKB(bytes)} KB`;
  };
  
  const hasValidSelection = pageSelection === 'all' || (parsedPages.length > 0 && !parseError);
  const pagesPendingChange = Object.keys(pendingRotations).filter(k => pendingRotations[k] !== 0).length;

  return (
    <div className={styles.container}>
      {!fileStats && !isProcessing && (
        <div 
          className={styles.uploadArea}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') fileInputRef.current?.click(); }}
          aria-label="PDF अपलोड करें"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className={styles.fileInput}
            aria-hidden="true"
          />
          <span className={styles.uploadIcon} aria-hidden="true">🔄</span>
          <p className={styles.uploadText} lang="hi">PDF के पेज आसानी से rotate करें</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !fileStats && !result && (
        <div className={styles.uploadArea} style={{ cursor: 'wait' }}>
          <p className={styles.uploadText} lang="hi">PDF पढ़ी जा रही है...</p>
        </div>
      )}

      {fileStats && (
        <div className={styles.workspace}>
          <div className={styles.fileCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">चुनी गई PDF</span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={clearFile} 
                disabled={isProcessing}
                aria-label="नया PDF चुनें"
              >
                हटाएं
              </button>
            </div>
            
            <div className={styles.fileInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">फाइल का नाम</span>
                <span className={styles.infoValue} title={fileStats.name}>{fileStats.name}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">कुल पेज</span>
                <span className={styles.infoValue}>{fileStats.pageCount}</span>
              </div>
              {pagesPendingChange > 0 && !result && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel} lang="hi">Rotate होने वाले पेज</span>
                  <span className={styles.infoValue} style={{ color: 'var(--color-primary)' }}>{pagesPendingChange}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.fileCard}>
            <div className={styles.cardHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className={styles.cardTitle} lang="hi">सेटिंग्स (Settings)</span>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">पेज चुनें</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="pageSelect"
                    checked={pageSelection === 'all'} 
                    onChange={() => handleSelectionMode('all')}
                    disabled={isProcessing || result}
                  />
                  सभी पेज
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="pageSelect"
                    checked={pageSelection === 'selected'} 
                    onChange={() => handleSelectionMode('selected')}
                    disabled={isProcessing || result}
                  />
                  चुने हुए पेज
                </label>
              </div>
            </div>

            {pageSelection === 'selected' && (
              <div className={styles.formGroup} style={{ marginTop: '0' }}>
                <label htmlFor="pageRangeInput" className={styles.label} lang="hi">पेज नंबर / रेंज</label>
                <input 
                  id="pageRangeInput"
                  type="text" 
                  className={styles.input}
                  placeholder="जैसे 1-3, 5, 8-10"
                  value={rangeInput}
                  onChange={handleRangeChange}
                  disabled={isProcessing || result}
                />
                <span className={styles.helperText} lang="hi">कॉमा (,) और डैश (-) का इस्तेमाल करें। कुल {fileStats.pageCount} पेज उपलब्ध हैं।</span>
              </div>
            )}

            {parseError && pageSelection === 'selected' && (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="assertive">
                <span aria-hidden="true">⚠️</span>
                <span lang="hi">{parseError}</span>
              </div>
            )}
            
            {parseWarning && pageSelection === 'selected' && (
              <div className={`${styles.alert} ${styles.alertWarning}`} role="alert" aria-live="polite">
                <span aria-hidden="true">ℹ️</span>
                <span lang="hi">{parseWarning}</span>
              </div>
            )}

            <div className={styles.formGroup} style={{ marginTop: 'var(--space-2)' }}>
              <label className={styles.label} lang="hi">चुने हुए पेज घुमाएँ (Rotation)</label>
              <div className={styles.controlsGrid}>
                <button 
                  className="btn btn--outline" 
                  onClick={() => applyRotation(90)}
                  disabled={!hasValidSelection || isProcessing || result}
                >
                  90° दाईं ओर ↻
                </button>
                <button 
                  className="btn btn--outline" 
                  onClick={() => applyRotation(-90)}
                  disabled={!hasValidSelection || isProcessing || result}
                >
                  90° बाईं ओर ↺
                </button>
                <button 
                  className="btn btn--outline" 
                  onClick={() => applyRotation(180)}
                  disabled={!hasValidSelection || isProcessing || result}
                >
                  180° घुमाएँ ⇅
                </button>
                <button 
                  className="btn btn--ghost" 
                  onClick={resetRotation}
                  disabled={!hasValidSelection || isProcessing || result}
                >
                  Reset ⟲
                </button>
              </div>
            </div>

            <div className={styles.actionArea}>
              {!result && (
                <button 
                  className="btn btn--primary btn--lg" 
                  onClick={processRotation}
                  disabled={isProcessing || pagesPendingChange === 0}
                  aria-live="polite"
                >
                  {isProcessing ? 'PDF तैयार की जा रही है...' : 'PDF तैयार करें'}
                </button>
              )}
            </div>
            
            {result && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक PDF बन गया! 🎉</span>
                <p style={{ fontSize: '0.9375rem', color: '#15803D', textAlign: 'center', margin: 'var(--space-2) 0' }} lang="hi">
                  {result.rotateCount} पेज rotate किए गए।
                </p>
                <div style={{ fontSize: '0.875rem', color: '#15803D', textAlign: 'center' }}>
                  Output Size: {formatSize(result.size)}
                </div>
                
                <a 
                  href={result.url} 
                  download={result.filename}
                  className="btn btn--accent btn--lg"
                  style={{ width: '100%', marginTop: 'var(--space-3)' }}
                >
                  नई PDF डाउनलोड करें
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="assertive">
          <span aria-hidden="true">⚠️</span>
          <span lang="hi">{error}</span>
        </div>
      )}

      <div className={styles.privacyNote} role="note">
        <span aria-hidden="true">🔒</span>
        <span lang="hi">आपकी PDF आपके डिवाइस पर ही प्रोसेस होती है। फाइल सर्वर पर अपलोड नहीं होती।</span>
      </div>
    </div>
  );
}
