'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './SplitPdfTool.module.css';

export default function SplitPdfTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const [rangeInput, setRangeInput] = useState('');
  const [parsedPages, setParsedPages] = useState([]);
  const [parseError, setParseError] = useState(null);
  const [parseWarning, setParseWarning] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
      setFileStats(null); // free buffer reference
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
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pageCount,
        file: selectedFile
      });
    } catch (err) {
      console.error(err);
      setError('PDF को पढ़ने में समस्या आई। यह पासवर्ड-प्रोटेक्टेड या करप्ट हो सकता है।');
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Robust Page Range Parser
  const parsePageRange = (input, maxPages) => {
    setParseError(null);
    setParseWarning(null);
    setParsedPages([]);
    
    if (!input.trim()) return;

    // Validate syntax basic characters (only numbers, commas, dashes, spaces)
    if (!/^[\d\s,-]+$/.test(input)) {
      setParseError('कृपया सही page range लिखें। (केवल अंक, कॉमा और डैश का उपयोग करें)');
      return;
    }

    const parts = input.split(',').map(p => p.trim()).filter(Boolean);
    const pages = [];
    let hasDuplicate = false;

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

    // Filter out-of-bounds
    const invalidPages = pages.filter(p => p > maxPages);
    if (invalidPages.length > 0) {
      setParseError(`पेज ${invalidPages[0]} इस PDF में मौजूद नहीं है। कुल ${maxPages} पेज हैं।`);
      return;
    }

    // Remove duplicates and sort
    const uniquePages = [...new Set(pages)].sort((a, b) => a - b);
    
    if (uniquePages.length < pages.length) {
      hasDuplicate = true;
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

  const processSplit = async () => {
    if (!fileStats || parsedPages.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const arrayBuffer = await fileStats.file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      const newPdf = await PDFDocument.create();
      
      // pdf-lib uses 0-indexed pages, our UI uses 1-indexed
      const indicesToCopy = parsedPages.map(pageNum => pageNum - 1);
      
      const copiedPages = await newPdf.copyPages(originalPdf, indicesToCopy);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({
        url,
        size: blob.size,
        selectedCount: parsedPages.length
      });
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'PDF Split करने में त्रुटि हुई।');
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
          <span className={styles.uploadIcon} aria-hidden="true">📄</span>
          <p className={styles.uploadText} lang="hi">एक PDF चुनें और उसके पेज अलग करें</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !fileStats && !result && (
        <div className={styles.uploadArea} style={{ cursor: 'wait' }}>
          <p className={styles.uploadText} lang="hi">PDF पढ़ा जा रहा है...</p>
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
            </div>
          </div>
          
          <div className={styles.fileCard}>
            <div className={styles.cardHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className={styles.cardTitle} lang="hi">पेज सेटिंग्स</span>
            </div>
            
            <div className={styles.formGroup}>
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

            {parseError && (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="assertive">
                <span aria-hidden="true">⚠️</span>
                <span lang="hi">{parseError}</span>
              </div>
            )}
            
            {parseWarning && (
              <div className={`${styles.alert} ${styles.alertWarning}`} role="alert" aria-live="polite">
                <span aria-hidden="true">ℹ️</span>
                <span lang="hi">{parseWarning}</span>
              </div>
            )}

            {parsedPages.length > 0 && !parseError && (
              <div className={styles.previewBox} aria-live="polite">
                <div className={styles.previewTitle} lang="hi">
                  चुने गए पेज (कुल {parsedPages.length} पेज):
                </div>
                <div className={styles.previewPages}>
                  {parsedPages.join(', ')}
                </div>
              </div>
            )}
            
            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processSplit}
                disabled={isProcessing || parsedPages.length === 0 || parseError || result}
                aria-live="polite"
              >
                {isProcessing ? 'PDF तैयार की जा रही है...' : (result ? 'Split हो गया' : 'PDF Split करें')}
              </button>
            </div>
            
            {result && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक PDF बन गया! 🎉</span>
                <p style={{ fontSize: '0.9375rem', color: '#15803D', marginTop: 'var(--space-2)' }} lang="hi">
                  {fileStats.pageCount} पेज की PDF में से {result.selectedCount} पेज निकाले गए।
                </p>
                <div style={{ fontSize: '0.875rem', color: '#15803D', marginTop: 'var(--space-1)' }}>
                  Output Size: {formatSize(result.size)}
                </div>
                
                <a 
                  href={result.url} 
                  download="split-pdf.pdf"
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
