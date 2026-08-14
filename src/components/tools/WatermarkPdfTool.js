'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import styles from './WatermarkPdfTool.module.css';

export default function WatermarkPdfTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  // Watermark State
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [pageSelection, setPageSelection] = useState('all'); // 'all' or 'selected'
  const [rangeInput, setRangeInput] = useState('');
  const [parsedPages, setParsedPages] = useState([]);
  const [parseError, setParseError] = useState(null);
  
  const [position, setPosition] = useState('center');
  const [rotation, setRotation] = useState(45);
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(72);
  const [color, setColor] = useState('#666666');

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
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    
    setRangeInput('');
    setParsedPages([]);
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
    setRangeInput('');
    setParsedPages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Robust Page Range Parser (Reused)
  const parsePageRange = (input, maxPages) => {
    setParseError(null);
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

  // Check for non-Latin characters
  const hasUnsupportedCharacters = (text) => {
    // pdf-lib StandardFonts basically support WinAnsi (ASCII + some extended Latin).
    // Devanagari Unicode block is \u0900-\u097F
    // We will do a broad check for non-Latin to be safe.
    // Allow Basic Latin (0x00-0x7F) and Latin-1 Supplement (0x80-0xFF).
    return /[^\x00-\xFF]/.test(text);
  };

  const hexToRgb = (hex) => {
    let c = hex.substring(1);      // strip #
    let rgbArr = parseInt(c, 16);
    let r = (rgbArr >> 16) & 255;
    let g = (rgbArr >> 8) & 255;
    let b = rgbArr & 255;
    return rgb(r / 255, g / 255, b / 255);
  };

  const processWatermark = async () => {
    if (!fileStats) return;
    
    if (!watermarkText.trim()) {
      setError('कृपया Watermark Text दर्ज करें।');
      return;
    }

    if (hasUnsupportedCharacters(watermarkText)) {
      setError('हिंदी watermark अभी उपलब्ध नहीं है। कृपया English characters का उपयोग करें। (Hindi/Devanagari text is not supported with the current standard PDF font.)');
      return;
    }
    
    let targetPages = [];
    if (pageSelection === 'all') {
      for (let i = 1; i <= fileStats.pageCount; i++) {
        targetPages.push(i);
      }
    } else {
      if (parsedPages.length === 0 || parseError) {
        setError('कृपया सही पेज चुनें।');
        return;
      }
      targetPages = [...parsedPages];
    }
    
    setIsProcessing(true);
    setError(null);
    
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);

    try {
      const pdfDoc = await PDFDocument.load(fileStats.arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();
      
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
      const textHeight = font.heightAtSize(fontSize);
      
      const textColor = hexToRgb(color);

      for (let i = 0; i < pages.length; i++) {
        const pageNum = i + 1;
        if (!targetPages.includes(pageNum)) continue;

        const page = pages[i];
        const { width, height } = page.getSize();
        
        let x = 0;
        let y = 0;
        const padding = 50;
        
        // Very basic positional calculation (treating x/y as bottom-left of text box roughly)
        switch (position) {
          case 'top-left':
            x = padding;
            y = height - padding - textHeight;
            break;
          case 'top-center':
            x = (width / 2) - (textWidth / 2);
            y = height - padding - textHeight;
            break;
          case 'top-right':
            x = width - padding - textWidth;
            y = height - padding - textHeight;
            break;
          case 'center-left':
            x = padding;
            y = (height / 2) - (textHeight / 2);
            break;
          case 'center':
            x = (width / 2) - (textWidth / 2);
            y = (height / 2) - (textHeight / 2);
            break;
          case 'center-right':
            x = width - padding - textWidth;
            y = (height / 2) - (textHeight / 2);
            break;
          case 'bottom-left':
            x = padding;
            y = padding;
            break;
          case 'bottom-center':
            x = (width / 2) - (textWidth / 2);
            y = padding;
            break;
          case 'bottom-right':
            x = width - padding - textWidth;
            y = padding;
            break;
          default:
            x = (width / 2) - (textWidth / 2);
            y = (height / 2) - (textHeight / 2);
        }

        // Draw watermark
        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font,
          color: textColor,
          opacity: opacity,
          rotate: degrees(rotation),
        });
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const originalName = fileStats.name.replace(/\.pdf$/i, '');
      
      setResult({
        url,
        filename: `${originalName}-watermarked.pdf`,
        size: blob.size,
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
          <span className={styles.uploadIcon} aria-hidden="true">🔤</span>
          <p className={styles.uploadText} lang="hi">PDF में Watermark जोड़ें</p>
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
            </div>

            <div className={styles.formGroup} style={{ marginTop: 'var(--space-4)' }}>
              <label htmlFor="watermarkText" className={styles.label} lang="hi">Watermark Text</label>
              <input 
                id="watermarkText"
                type="text" 
                className={styles.input}
                placeholder="उदा. CONFIDENTIAL"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                disabled={isProcessing || result}
              />
              <span className={styles.helperText} lang="hi">अंग्रेजी (English) characters का उपयोग करें।</span>
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
                  placeholder="जैसे 1-3, 5"
                  value={rangeInput}
                  onChange={handleRangeChange}
                  disabled={isProcessing || result}
                />
              </div>
            )}

            {parseError && pageSelection === 'selected' && (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="assertive">
                <span aria-hidden="true">⚠️</span>
                <span lang="hi">{parseError}</span>
              </div>
            )}

            <div className={styles.controlsGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="positionSelect" className={styles.label} lang="hi">Position</label>
                <select 
                  id="positionSelect"
                  className={styles.select}
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  disabled={isProcessing || result}
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="center-left">Center Left</option>
                  <option value="center">Center</option>
                  <option value="center-right">Center Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rotationSelect" className={styles.label} lang="hi">Rotation</label>
                <select 
                  id="rotationSelect"
                  className={styles.select}
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  disabled={isProcessing || result}
                >
                  <option value="0">0°</option>
                  <option value="45">45°</option>
                  <option value="-45">-45°</option>
                  <option value="90">90°</option>
                  <option value="-90">-90°</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fontSizeSelect" className={styles.label} lang="hi">Font Size</label>
                <select 
                  id="fontSizeSelect"
                  className={styles.select}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  disabled={isProcessing || result}
                >
                  <option value="24">Small</option>
                  <option value="48">Medium</option>
                  <option value="72">Large</option>
                  <option value="120">Extra Large</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="colorInput" className={styles.label} lang="hi">Color</label>
                <input 
                  id="colorInput"
                  type="color" 
                  className={styles.colorInput}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  disabled={isProcessing || result}
                  aria-label="Watermark color"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="opacityInput" className={styles.label} lang="hi">Opacity: {Math.round(opacity * 100)}%</label>
              <input 
                id="opacityInput"
                type="range"
                className={styles.rangeInput}
                min="0.1"
                max="0.9"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                disabled={isProcessing || result}
              />
            </div>

            <div className={styles.actionArea}>
              {!result && (
                <button 
                  className="btn btn--primary btn--lg" 
                  onClick={processWatermark}
                  disabled={isProcessing || !hasValidSelection || !watermarkText.trim()}
                  aria-live="polite"
                >
                  {isProcessing ? 'Watermark जोड़ा जा रहा है...' : 'Watermark PDF'}
                </button>
              )}
            </div>
            
            {result && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">Watermark successfully added! 🎉</span>
                <div style={{ fontSize: '0.875rem', color: '#15803D', textAlign: 'center', marginTop: 'var(--space-2)' }}>
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
