'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './MergePdfTool.module.css';

export default function MergePdfTool() {
  const [pdfs, setPdfs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const fileInputRef = useRef(null);
  const addMoreInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const handleFiles = async (files) => {
    setError(null);
    setResult(null); // Reset result if new files added
    
    const validFiles = Array.from(files).filter(file => file.type === 'application/pdf');

    if (validFiles.length < files.length) {
      setError('कुछ फाइलें समर्थित नहीं हैं। कृपया केवल PDF फाइल चुनें।');
    }

    if (validFiles.length === 0) return;

    setIsProcessing(true);

    try {
      // Process one by one to get page counts without holding all array buffers in memory simultaneously
      const newPdfs = [];
      for (const file of validFiles) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
          const pageCount = pdfDoc.getPageCount();
          
          newPdfs.push({
            id: Math.random().toString(36).substring(2, 10),
            file: file,
            name: file.name,
            size: file.size,
            pageCount: pageCount
          });
          
        } catch (err) {
          console.error('Error loading PDF:', err);
          setError(`फाइल (${file.name}) पढ़ने में विफल रही। यह करप्ट या सुरक्षित हो सकती है।`);
        }
      }

      if (newPdfs.length > 0) {
        setPdfs(prev => [...prev, ...newPdfs]);
      }
      
    } catch (err) {
      setError('PDF लोड करने में त्रुटि हुई।');
    } finally {
      setIsProcessing(false);
    }
  };

  const removePdf = (idToRemove) => {
    setPdfs(prev => prev.filter(pdf => pdf.id !== idToRemove));
    setResult(null);
  };

  const clearAll = () => {
    setPdfs([]);
    setResult(null);
    setError(null);
  };

  const processMerge = async () => {
    if (pdfs.length < 2) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;

      for (const pdfData of pdfs) {
        const arrayBuffer = await pdfData.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
        
        totalPages += copiedPages.length;
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult({
        url,
        size: blob.size,
        pdfCount: pdfs.length,
        pageCount: totalPages
      });
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'PDF मर्ज करने में त्रुटि हुई।');
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
      handleFiles(e.dataTransfer.files);
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
      {pdfs.length === 0 ? (
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
            onChange={(e) => handleFiles(e.target.files)}
            accept="application/pdf"
            multiple
            className={styles.fileInput}
            aria-hidden="true"
          />
          <span className={styles.uploadIcon} aria-hidden="true">📄</span>
          <p className={styles.uploadText} lang="hi">कई PDF चुनें और उन्हें एक PDF में जोड़ें</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1} disabled={isProcessing}>
            {isProcessing ? 'PDF लोड हो रही है...' : 'PDF चुनें'}
          </button>
        </div>
      ) : (
        <div className={styles.workspace}>
          <div className={styles.fileListCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">चुनी गई PDF ({pdfs.length})</span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={clearAll} 
                disabled={isProcessing}
                aria-label="सभी PDF हटाएं"
              >
                सभी हटाएं
              </button>
            </div>
            
            <div className={styles.fileList}>
              {pdfs.map((pdf, index) => (
                <div key={pdf.id} className={styles.fileItem}>
                  <div className={styles.fileOrder} aria-label={`PDF ${index + 1}`}>
                    {index + 1}.
                  </div>
                  <div className={styles.fileIcon} aria-hidden="true">📄</div>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName} title={pdf.name}>{pdf.name}</span>
                    <span className={styles.fileMeta}>{formatSize(pdf.size)} • {pdf.pageCount} Pages</span>
                  </div>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removePdf(pdf.id)}
                    aria-label={`${pdf.name} को हटाएं`}
                    disabled={isProcessing}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <button 
                className={styles.addMoreBtn}
                onClick={() => addMoreInputRef.current?.click()}
                disabled={isProcessing}
                aria-label="और PDF जोड़ें"
              >
                <input
                  type="file"
                  ref={addMoreInputRef}
                  onChange={(e) => handleFiles(e.target.files)}
                  accept="application/pdf"
                  multiple
                  className={styles.fileInput}
                  disabled={isProcessing}
                />
                <span style={{ fontSize: '1.25rem', marginRight: '8px' }}>+</span>
                <span lang="hi">और PDF जोड़ें</span>
              </button>
            </div>
          </div>
          
          <div className={styles.settingsCard}>
            <div className={styles.cardHeader} style={{ padding: 0, border: 'none' }}>
              <span className={styles.cardTitle} lang="hi">PDF का क्रम (Order)</span>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }} lang="hi">
              आपकी अंतिम PDF ठीक उसी क्रम में बनेगी जो क्रम बाईं ओर सूची में दिखाई दे रहा है।
            </p>
            
            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processMerge}
                disabled={isProcessing || pdfs.length < 2 || result}
                aria-live="polite"
              >
                {isProcessing ? 'PDF को जोड़ा जा रहा है...' : (result ? 'मर्ज हो गया' : 'PDF मर्ज करें')}
              </button>
              
              {pdfs.length === 1 && !result && (
                <p style={{ fontSize: '0.875rem', color: '#92400E', textAlign: 'center', marginTop: 'var(--space-2)' }} lang="hi">
                  Merge करने के लिए कम से कम 2 PDF चुनें।
                </p>
              )}
            </div>
            
            {result && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक PDF बन गया! 🎉</span>
                <p style={{ fontSize: '0.9375rem', color: '#15803D', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }} lang="hi">
                  {result.pdfCount} PDF मिलाकर {result.pageCount} पेज की नई PDF तैयार हुई।
                </p>
                <div className={styles.resultStats}>
                  <span>Total Size: {formatSize(result.size)}</span>
                </div>
                
                <a 
                  href={result.url} 
                  download="merged-pdf.pdf"
                  className="btn btn--accent btn--lg"
                  style={{ width: '100%', marginTop: 'var(--space-4)' }}
                >
                  PDF डाउनलोड करें
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
        <span lang="hi">आपकी PDF आपके डिवाइस पर ही प्रोसेस होती है। फाइल सर्वर पर अपलोड नहीं होती। (100% Secure)</span>
      </div>
    </div>
  );
}
