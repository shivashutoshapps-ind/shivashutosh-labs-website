'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { compressImageStrict } from '@/lib/imageCompression';
import styles from './CompressPdfTool.module.css';

export default function TargetPdfCompressTool({ defaultTarget = 100 }) {
  const [file, setFile] = useState(null);
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef(null);

  // Configure pdf.js worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('pdfjs-dist').then((pdfjsLib) => {
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }
      });
    }
  }, []);

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
    setProgress(0);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      const pdfjsLib = await import('pdfjs-dist');
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      await loadingTask.destroy();
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pageCount,
        arrayBuffer: arrayBuffer
      });
    } catch (err) {
      console.error(err);
      if (err.name === 'PasswordException') {
        setError('यह password-protected PDF है। कृपया पहले पासवर्ड हटाएं।');
      } else {
        setError('PDF को पढ़ने में समस्या आई। यह करप्ट हो सकता है।');
      }
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
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processPDF = async () => {
    if (!fileStats) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    const targetBytes = defaultTarget * 1024;
    // PDF dictionary overhead estimate (base 10KB + 500B per page)
    const overheadEstimate = 10000 + (fileStats.pageCount * 500);
    const remainingBytes = targetBytes - overheadEstimate;

    if (remainingBytes <= 0 || (remainingBytes / fileStats.pageCount) < 5000) {
      setError(`यह PDF (${fileStats.pageCount} पेज) ${defaultTarget}KB के लिए बहुत बड़ी है। इतनी कम साइज में क्वालिटी बिल्कुल खराब हो जाएगी।`);
      setIsProcessing(false);
      return;
    }

    const perPageBudgetKB = (remainingBytes / fileStats.pageCount) / 1024;

    let loadingTask = null;
    let pdf = null;
    try {
      const pdfjsLib = await import('pdfjs-dist');
      loadingTask = pdfjsLib.getDocument({ data: fileStats.arrayBuffer });
      pdf = await loadingTask.promise;

      const newPdf = await PDFDocument.create();

      for (let i = 1; i <= fileStats.pageCount; i++) {
        setProgress(Math.round(((i - 1) / fileStats.pageCount) * 100));
        
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const rawBlob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 1.0));
        page.cleanup();
        canvas.width = 0; canvas.height = 0; // Release memory

        const compressedBlob = await compressImageStrict(rawBlob, perPageBudgetKB);
        const imgBuffer = await compressedBlob.arrayBuffer();
        
        const embeddedImage = await newPdf.embedJpg(imgBuffer);
        const pdfPage = newPdf.addPage([embeddedImage.width, embeddedImage.height]);
        pdfPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      setProgress(99);
      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      const finalBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      if (finalBlob.size > targetBytes) {
        setError(`क्षमा करें, ${defaultTarget}KB का लक्ष्य प्राप्त नहीं किया जा सका (Final size: ${(finalBlob.size/1024).toFixed(1)}KB). यह PDF बहुत जटिल है।`);
        setResult(null);
      } else {
        setResult({
          url: URL.createObjectURL(finalBlob),
          newSize: finalBlob.size,
          oldSize: fileStats.size,
          isSmaller: finalBlob.size < fileStats.size,
          savedBytes: Math.max(0, fileStats.size - finalBlob.size),
          reductionPercent: (((fileStats.size - finalBlob.size) / fileStats.size) * 100).toFixed(1)
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'PDF प्रोसेस करने में त्रुटि हुई।');
    } finally {
      if (loadingTask) {
        try { await loadingTask.destroy(); } catch (e) {}
      }
      setIsProcessing(false);
      setProgress(100);
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
      {/* Important Rasterization Warning */}
      <div className={`${styles.alert} ${styles.alertWarning}`} role="alert" style={{ marginBottom: 'var(--space-4)' }}>
        <span aria-hidden="true">⚠️</span>
        <div>
          <strong lang="hi">महत्वपूर्ण जानकारी:</strong>
          <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
            <li lang="hi">यह टूल PDF के पेजों को Image (फोटो) में बदल कर साइज़ कम करता है।</li>
            <li lang="hi">परिणाम वाली PDF में Text को Select या Search नहीं किया जा सकेगा।</li>
            <li lang="hi">इतने छोटे साइज़ (Target Size) पर क्वालिटी थोड़ी धुंधली (blur) हो सकती है।</li>
          </ul>
        </div>
      </div>

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
          <p className={styles.uploadText} lang="hi">PDF को {defaultTarget} KB तक कम करें</p>
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
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">लक्ष्य (Target)</span>
                <span className={styles.infoValue} style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  ≤ {defaultTarget} KB
                </span>
              </div>
            </div>
          </div>
          
          <div className={styles.fileCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">ऑप्टिमाइज़ेशन (Optimization)</span>
            </div>
            
            <div className={styles.actionArea}>
              {(!result || isProcessing) && (
                <button 
                  className="btn btn--primary btn--lg" 
                  onClick={processPDF}
                  disabled={isProcessing}
                  aria-live="polite"
                  style={{ width: '100%' }}
                >
                  {isProcessing ? 'प्रोसेस किया जा रहा है...' : `${defaultTarget} KB तक Compress करें`}
                </button>
              )}
              
              {isProcessing && (
                <div style={{ marginTop: 'var(--space-4)', width: '100%' }}>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 0.2s' }}></div>
                  </div>
                  <p style={{ textAlign: 'center', marginTop: 'var(--space-2)', fontSize: '0.875rem' }} lang="hi">
                    {progress}% पूर्ण...
                  </p>
                </div>
              )}
            </div>
            
            {result && (
              <div 
                className={`${styles.resultCard} ${result.isSmaller ? styles.resultCardSuccess : styles.resultCardWarning}`}
                aria-live="polite"
              >
                {result.isSmaller ? (
                  <>
                    <span className={styles.resultTitle} lang="hi">सफलता! PDF {defaultTarget}KB के अंदर है 🎉</span>
                    <div className={styles.resultStats}>
                      <div className={styles.statRow}>
                        <span>Original Size:</span>
                        <span>{formatSize(result.oldSize)}</span>
                      </div>
                      <div className={styles.statRow}>
                        <span>Final Size:</span>
                        <span style={{ fontWeight: 700, color: '#15803D' }}>{formatSize(result.newSize)}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={result.url} 
                      download={fileStats.name.replace(/\.pdf$/i, `-${defaultTarget}kb.pdf`)}
                      className="btn btn--accent btn--lg"
                      style={{ marginTop: 'var(--space-2)', textAlign: 'center', width: '100%' }}
                    >
                      PDF डाउनलोड करें
                    </a>
                  </>
                ) : (
                  <>
                    <span className={styles.resultTitle} lang="hi">आकार कम नहीं हुआ</span>
                    <p style={{ fontSize: '0.875rem', textAlign: 'center' }} lang="hi">
                      इस PDF को बिना गुणवत्ता खोए और छोटा करना संभव नहीं है।
                    </p>
                    <div className={styles.resultStats} style={{ marginTop: 'var(--space-2)' }}>
                      <div className={styles.statRow}>
                        <span>Final Size:</span>
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
        <span lang="hi">आपकी PDF आपके डिवाइस पर ही प्रोसेस होती है। फाइल सर्वर पर अपलोड नहीं होती। (100% Client-side Processing)</span>
      </div>
    </div>
  );
}
