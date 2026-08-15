'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import styles from './WatermarkPdfTool.module.css';

export default function AddPageNumbersTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  
  // Settings
  const [position, setPosition] = useState('bottom-center');
  const [format, setFormat] = useState('1'); // '1', 'page-1-of-n', '1-of-n'
  const [startNumber, setStartNumber] = useState(1);
  const [marginSetting, setMarginSetting] = useState(30);

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
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setFileStats(null);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pdfDoc.getPageCount(),
        arrayBuffer: arrayBuffer
      });
    } catch (err) {
      console.error(err);
      if (err.message && err.message.toLowerCase().includes('encrypted')) {
        setError('यह password-protected PDF है। कृपया इसे पहले अनलॉक करें।');
      } else {
        setError('PDF को पढ़ा नहीं जा सका। फाइल करप्ट हो सकती है।');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
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

    try {
      const pdfDoc = await PDFDocument.load(fileStats.arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;
      
      const fontSize = 12;

      for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        
        // Calculate current page number based on starting number
        const currentNum = Number(startNumber) + i;
        const totalNumber = Number(startNumber) + totalPages - 1;
        
        // Format text
        let text = `${currentNum}`;
        if (format === 'page-1-of-n') {
          text = `Page ${currentNum} of ${totalNumber}`;
        } else if (format === '1-of-n') {
          text = `${currentNum} / ${totalNumber}`;
        }

        const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
        const textHeight = helveticaFont.heightAtSize(fontSize);
        
        let x = 0;
        let y = 0;
        const m = Number(marginSetting);

        // Calculate Y
        if (position.startsWith('bottom')) {
          y = m;
        } else if (position.startsWith('top')) {
          y = height - m - textHeight;
        }

        // Calculate X
        if (position.endsWith('left')) {
          x = m;
        } else if (position.endsWith('center')) {
          x = (width / 2) - (textWidth / 2);
        } else if (position.endsWith('right')) {
          x = width - m - textWidth;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        if (i % 10 === 0 || i === totalPages - 1) {
          setProgress(Math.round(((i + 1) / totalPages) * 100));
          await new Promise(r => setTimeout(r, 0));
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const originalName = fileStats.name.replace(/\.pdf$/i, '');
      
      setResult({
        url,
        filename: `${originalName}-numbered.pdf`,
        size: blob.size,
      });
      
    } catch (err) {
      console.error(err);
      if (err.message && err.message.toLowerCase().includes('encrypted')) {
        setError('यह PDF पासवर्ड से सुरक्षित है। पेज नंबर नहीं डाले जा सकते।');
      } else {
        setError('PDF में पेज नंबर डालने में त्रुटि हुई।');
      }
    } finally {
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

  const formatKB = (bytes) => (bytes / 1024).toFixed(2);
  const formatMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const formatSize = (bytes) => bytes >= 1024 * 1024 ? `${formatMB(bytes)} MB` : `${formatKB(bytes)} KB`;

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
          <p className={styles.uploadText} lang="hi">PDF चुनें / Select PDF</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !fileStats && (
        <div className={styles.uploadArea} style={{ cursor: 'wait' }}>
          <p className={styles.uploadText} lang="hi">PDF लोड हो रही है...</p>
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
                aria-label="नई PDF चुनें"
              >
                हटाएं
              </button>
            </div>
            
            <div className={styles.fileInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel} lang="hi">फाइल</span>
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
              <span className={styles.cardTitle} lang="hi">सेटिंग्स (Settings)</span>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">Page Number Format</label>
              <select 
                className={styles.select} 
                value={format} 
                onChange={(e) => { setFormat(e.target.value); setResult(null); }}
                disabled={isProcessing || result}
              >
                <option value="1">1, 2, 3...</option>
                <option value="page-1-of-n">Page 1 of {Number(startNumber) + fileStats.pageCount - 1}</option>
                <option value="1-of-n">1 / {Number(startNumber) + fileStats.pageCount - 1}</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">Position / स्थिति</label>
              <select 
                className={styles.select} 
                value={position} 
                onChange={(e) => { setPosition(e.target.value); setResult(null); }}
                disabled={isProcessing || result}
              >
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">Starting Number / प्रारंभिक नंबर</label>
              <input 
                type="number"
                className={styles.input}
                value={startNumber}
                onChange={(e) => { setStartNumber(e.target.value); setResult(null); }}
                disabled={isProcessing || result}
                min="1"
              />
            </div>
            
            <div className={styles.actionArea}>
              {!result && (
                <button 
                  className="btn btn--primary btn--lg" 
                  onClick={processPDF}
                  disabled={isProcessing}
                  aria-live="polite"
                  style={{ width: '100%' }}
                >
                  {isProcessing ? 'प्रोसेस किया जा रहा है...' : 'Add Page Numbers / पेज नंबर डालें'}
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
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक पेज नंबर डाले गए! 🎉</span>
                <div className={styles.resultStats} style={{ justifyContent: 'center', gap: 'var(--space-4)' }}>
                  <span>Pages: {fileStats.pageCount}</span>
                  <span>Size: {formatSize(result.size)}</span>
                </div>
                <a 
                  href={result.url} 
                  download={result.filename}
                  className="btn btn--accent btn--lg"
                  style={{ width: '100%', marginTop: 'var(--space-2)', textAlign: 'center' }}
                >
                  Download PDF / PDF डाउनलोड करें
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
        <span lang="hi">आपकी PDF आपके डिवाइस पर ही प्रोसेस होती है। फाइल सर्वर पर अपलोड नहीं होती। (100% Client-side Processing)</span>
      </div>
    </div>
  );
}
