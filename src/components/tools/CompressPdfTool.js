'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './CompressPdfTool.module.css';

export default function CompressPdfTool() {
  const [file, setFile] = useState(null);
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
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
    setFile(selectedFile);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setFileStats(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pageCount,
        arrayBuffer: arrayBuffer // Store to avoid re-reading file
      });
    } catch (err) {
      console.error(err);
      setError('PDF को पढ़ने में समस्या आई। यह पासवर्ड-प्रोटेक्टेड या करप्ट हो सकता है।');
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileStats(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processPDF = async () => {
    if (!fileStats) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Load original document
      const originalPdf = await PDFDocument.load(fileStats.arrayBuffer);
      
      // Create new document for structural optimization (Garbage Collection)
      const newPdf = await PDFDocument.create();
      
      // Copy all pages
      const copiedPages = await newPdf.copyPages(originalPdf, originalPdf.getPageIndices());
      copiedPages.forEach(page => newPdf.addPage(page));
      
      // Save with object streams to compress structure
      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      
      const newSize = pdfBytes.byteLength;
      const oldSize = fileStats.size;
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({
        url,
        newSize,
        oldSize,
        isSmaller: newSize < oldSize,
        savedBytes: oldSize - newSize,
        reductionPercent: oldSize > 0 ? (((oldSize - newSize) / oldSize) * 100).toFixed(1) : 0
      });
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'PDF को Optimize करने में त्रुटि हुई।');
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
      {!file && !isProcessing && (
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
          <p className={styles.uploadText} lang="hi">एक PDF चुनें और उसका आकार कम करें</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !fileStats && (
        <div className={styles.uploadArea} style={{ cursor: 'wait' }}>
          <p className={styles.uploadText} lang="hi">PDF पढ़ा जा रहा है...</p>
        </div>
      )}

      {fileStats && (
        <div className={styles.workspace}>
          <div className={styles.fileCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">PDF तैयार है</span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={clearFile} 
                disabled={isProcessing}
                aria-label="नया PDF चुनें"
              >
                हटाएं (Remove)
              </button>
            </div>
            
            <div className={styles.fileInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">फाइल का नाम</span>
                <span className={styles.infoValue} title={fileStats.name}>{fileStats.name}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">मूल PDF आकार</span>
                <span className={styles.infoValue}>{formatSize(fileStats.size)}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">कुल पेज</span>
                <span className={styles.infoValue}>{fileStats.pageCount}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.fileCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">ऑप्टिमाइज़ेशन (Optimization)</span>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }} lang="hi">
              यह टूल आपकी PDF की संरचना (structure) को सुरक्षित रूप से ऑप्टिमाइज़ करता है ताकि अनावश्यक डेटा हटाया जा सके।
            </p>
            
            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processPDF}
                disabled={isProcessing || result}
                aria-live="polite"
              >
                {isProcessing ? 'PDF को optimize किया जा रहा है...' : (result ? 'ऑप्टिमाइज़ किया गया' : 'PDF छोटा करें (Optimize)')}
              </button>
            </div>
            
            {result && (
              <div 
                className={`${styles.resultCard} ${result.isSmaller ? styles.resultCardSuccess : styles.resultCardWarning}`}
                aria-live="polite"
              >
                {result.isSmaller ? (
                  <>
                    <span className={styles.resultTitle} lang="hi">PDF का आकार कम हुआ! 🎉</span>
                    <div className={styles.resultStats}>
                      <div className={styles.statRow}>
                        <span>Original Size:</span>
                        <span>{formatSize(result.oldSize)}</span>
                      </div>
                      <div className={styles.statRow}>
                        <span>Optimized Size:</span>
                        <span>{formatSize(result.newSize)}</span>
                      </div>
                      <div className={`${styles.statRow} ${styles.reduction}`}>
                        <span>Saved:</span>
                        <span>{formatSize(result.savedBytes)} ({result.reductionPercent}%)</span>
                      </div>
                    </div>
                    
                    <a 
                      href={result.url} 
                      download={fileStats.name.replace(/\.pdf$/i, '-compressed.pdf')}
                      className="btn btn--accent btn--lg"
                      style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
                    >
                      PDF डाउनलोड करें
                    </a>
                  </>
                ) : (
                  <>
                    <span className={styles.resultTitle} lang="hi">आकार कम नहीं हुआ</span>
                    <p style={{ fontSize: '0.875rem', textAlign: 'center' }} lang="hi">
                      इस PDF को बिना गुणवत्ता खोए और छोटा करना संभव नहीं है। यह पहले से ही अनुकूलित (optimized) है।
                    </p>
                    <div className={styles.resultStats} style={{ marginTop: 'var(--space-2)' }}>
                      <div className={styles.statRow}>
                        <span>Original Size:</span>
                        <span>{formatSize(result.oldSize)}</span>
                      </div>
                      <div className={styles.statRow}>
                        <span>Output Size:</span>
                        <span>{formatSize(result.newSize)}</span>
                      </div>
                    </div>
                  </>
                )}
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
