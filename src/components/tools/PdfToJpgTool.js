'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './PdfToJpgTool.module.css';

export default function PdfToJpgTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  
  // Settings
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState('0.92');
  const [pageSelection, setPageSelection] = useState('all'); // 'all' or 'selected'
  
  // Parser
  const [rangeInput, setRangeInput] = useState('');
  const [parsedPages, setParsedPages] = useState([]);
  const [parseError, setParseError] = useState(null);
  const [parseWarning, setParseWarning] = useState(null);

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

  // Cleanup object URLs when results change or unmount
  useEffect(() => {
    return () => {
      results.forEach(res => {
        if (res.url) URL.revokeObjectURL(res.url);
      });
      setFileStats(null); // free buffer
    };
  }, [results]);

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
    
    // Revoke old URLs
    results.forEach(res => {
      if (res.url) URL.revokeObjectURL(res.url);
    });
    setResults([]);
    setProgress(0);
    setRangeInput('');
    setParsedPages([]);
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      setFileStats({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: pageCount,
        file: selectedFile,
        arrayBuffer: arrayBuffer
      });
      
      // Destroy the task properly
      await loadingTask.destroy();
      
    } catch (err) {
      console.error(err);
      if (err.name === 'PasswordException') {
        setError('यह password-protected PDF है और इसे अभी convert नहीं किया जा सकता।');
      } else {
        setError('इस PDF को पढ़ा नहीं जा सका। कृपया दूसरी PDF चुनें।');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setFileStats(null);
    results.forEach(res => {
      if (res.url) URL.revokeObjectURL(res.url);
    });
    setResults([]);
    setError(null);
    setParseError(null);
    setParseWarning(null);
    setRangeInput('');
    setParsedPages([]);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Robust Page Range Parser (Reused pattern from Split PDF)
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

  const processConversion = async () => {
    if (!fileStats) return;
    
    let pagesToConvert = [];
    if (pageSelection === 'all') {
      for (let i = 1; i <= fileStats.pageCount; i++) {
        pagesToConvert.push(i);
      }
    } else {
      if (parsedPages.length === 0 || parseError) return;
      pagesToConvert = [...parsedPages];
    }
    
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    
    results.forEach(res => {
      if (res.url) URL.revokeObjectURL(res.url);
    });
    setResults([]);

    let pdf = null;
    let loadingTask = null;
    const generatedResults = [];

    try {
      const pdfjsLib = await import('pdfjs-dist');
      loadingTask = pdfjsLib.getDocument({ data: fileStats.arrayBuffer });
      pdf = await loadingTask.promise;
      
      const ext = format === 'image/jpeg' ? 'jpg' : 'png';
      const qVal = parseFloat(quality);
      
      for (let i = 0; i < pagesToConvert.length; i++) {
        const pageNum = pagesToConvert[i];
        
        // 1. Fetch Page
        const page = await pdf.getPage(pageNum);
        
        // 2. Setup viewport (1.5x scale for good reading quality without huge memory spikes)
        const viewport = page.getViewport({ scale: 1.5 });
        
        // 3. Prepare canvas preserving exact aspect ratio and orientation
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // 4. Render
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        
        // 5. Convert to Blob securely
        const blob = await new Promise((resolve) => {
          canvas.toBlob(resolve, format, qVal);
        });
        
        const url = URL.createObjectURL(blob);
        const originalName = fileStats.name.replace(/\.pdf$/i, '');
        
        generatedResults.push({
          id: `p${pageNum}`,
          filename: `${originalName}-page-${pageNum}.${ext}`,
          url,
          size: blob.size,
          pageNumber: pageNum
        });
        
        // Update progress safely
        setProgress(Math.round(((i + 1) / pagesToConvert.length) * 100));
        
        // Free resources per page
        page.cleanup();
        canvas.width = 0;
        canvas.height = 0;
      }
      
      setResults(generatedResults);
      
    } catch (err) {
      console.error(err);
      setError('PDF render करने में त्रुटि हुई। डिवाइस की मेमोरी कम हो सकती है।');
    } finally {
      if (loadingTask) {
        try { await loadingTask.destroy(); } catch (e) {}
      }
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
  
  const canConvert = !isProcessing && fileStats && (pageSelection === 'all' || (parsedPages.length > 0 && !parseError));
  
  const pagesCount = pageSelection === 'all' && fileStats ? fileStats.pageCount : parsedPages.length;

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
          <span className={styles.uploadIcon} aria-hidden="true">🖼️</span>
          <p className={styles.uploadText} lang="hi">PDF चुनें और उसे JPG या PNG में बदलें</p>
          <p className={styles.uploadSubText}>केवल PDF फाइल (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !fileStats && results.length === 0 && (
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
              <span className={styles.cardTitle} lang="hi">सेटिंग्स (Settings)</span>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">Output Format</label>
              <select 
                className={styles.select} 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                disabled={isProcessing || results.length > 0}
              >
                <option value="image/jpeg">JPG (छोटी और सामान्य फोटो फाइल के लिए)</option>
                <option value="image/png">PNG (बेहतर quality और transparency के लिए)</option>
              </select>
            </div>

            {format === 'image/jpeg' && (
              <div className={styles.formGroup}>
                <label className={styles.label} lang="hi">Quality (गुणवत्ता)</label>
                <select 
                  className={styles.select} 
                  value={quality} 
                  onChange={(e) => setQuality(e.target.value)}
                  disabled={isProcessing || results.length > 0}
                >
                  <option value="0.92">High (Best Quality)</option>
                  <option value="0.75">Medium (Balanced)</option>
                  <option value="0.5">Low (Smaller File Size)</option>
                </select>
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label className={styles.label} lang="hi">पेज चुनें (Select Pages)</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="pageSelect"
                    checked={pageSelection === 'all'} 
                    onChange={() => handleSelectionMode('all')}
                    disabled={isProcessing || results.length > 0}
                  />
                  सभी पेज
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="pageSelect"
                    checked={pageSelection === 'selected'} 
                    onChange={() => handleSelectionMode('selected')}
                    disabled={isProcessing || results.length > 0}
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
                  disabled={isProcessing || results.length > 0}
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

            {pageSelection === 'selected' && parsedPages.length > 0 && !parseError && (
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
              {(!results || results.length === 0) && (
                <button 
                  className="btn btn--primary btn--lg" 
                  onClick={processConversion}
                  disabled={!canConvert}
                  aria-live="polite"
                >
                  {isProcessing ? 'Convert किया जा रहा है...' : `PDF Convert करें (${pagesCount} पेज)`}
                </button>
              )}
              
              {isProcessing && (
                <>
                  <div className={styles.progressBar} aria-hidden="true">
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className={styles.progressText} aria-live="polite" lang="hi">
                    {Math.round((progress / 100) * pagesCount)} / {pagesCount} पेज तैयार
                  </div>
                </>
              )}
            </div>
            
            {results.length > 0 && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक {format === 'image/jpeg' ? 'JPG' : 'PNG'} बन गए! 🎉</span>
                <p style={{ fontSize: '0.9375rem', color: '#15803D', textAlign: 'center', margin: 'var(--space-2) 0' }} lang="hi">
                  {results.length} पेज {format === 'image/jpeg' ? 'JPG' : 'PNG'} में बदले गए।
                </p>
                
                <div className={styles.resultsGrid}>
                  {results.map(res => (
                    <div key={res.id} className={styles.resultItem}>
                      <span className={styles.resultItemName} title={res.filename}>{res.filename}</span>
                      <span className={styles.resultItemSize}>{formatSize(res.size)}</span>
                      <a 
                        href={res.url} 
                        download={res.filename}
                        className="btn btn--accent btn--sm"
                        style={{ marginTop: 'var(--space-2)' }}
                      >
                        डाउनलोड
                      </a>
                    </div>
                  ))}
                </div>
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
