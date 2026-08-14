'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import styles from './JpgToPdfTool.module.css';

const PAGE_SIZE_OPTIONS = {
  A4: [PageSizes.A4[0], PageSizes.A4[1]],
  'A4 Landscape': [PageSizes.A4[1], PageSizes.A4[0]],
  Letter: [PageSizes.Letter[0], PageSizes.Letter[1]],
  Original: 'Original',
};

const MARGIN_OPTIONS = {
  None: 0,
  Small: 20,
  Normal: 40,
};

const FIT_OPTIONS = {
  'Fit to Page': 'fit',
  'Fill Page': 'fill',
};

export default function JpgToPdfTool() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('A4');
  const [margin, setMargin] = useState('Small');
  const [fitOption, setFitOption] = useState('Fit to Page');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [pdfResult, setPdfResult] = useState(null);
  
  const fileInputRef = useRef(null);
  const addMoreInputRef = useRef(null);

  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url));
      if (pdfResult?.url) URL.revokeObjectURL(pdfResult.url);
    };
  }, []);

  const handleFiles = (files) => {
    setError(null);
    setPdfResult(null); // Reset result if new files added
    
    const validFiles = Array.from(files).filter(file => {
      const type = file.type;
      return type === 'image/jpeg' || type === 'image/png';
    });

    if (validFiles.length < files.length) {
      setError('कुछ फाइलें समर्थित नहीं हैं। कृपया केवल JPG या PNG चुनें।');
    }

    if (validFiles.length === 0) return;

    // Load dimensions for preview and generate unique IDs
    const newImagesPromises = validFiles.map(file => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            file,
            url,
            width: img.width,
            height: img.height,
            name: file.name
          });
        };
        img.onerror = () => {
          resolve(null); // Skip broken images
        };
        img.src = url;
      });
    });

    Promise.all(newImagesPromises).then(results => {
      const successfulImages = results.filter(Boolean);
      setImages(prev => [...prev, ...successfulImages]);
    });
  };

  const removeImage = (idToRemove) => {
    setImages(prev => {
      const imgToRemove = prev.find(img => img.id === idToRemove);
      if (imgToRemove) URL.revokeObjectURL(imgToRemove.url);
      return prev.filter(img => img.id !== idToRemove);
    });
    setPdfResult(null);
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);
    setPdfResult(null);
    setError(null);
  };

  const processPDF = async () => {
    if (images.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    setPdfResult(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgData of images) {
        const imageBytes = await imgData.file.arrayBuffer();
        let pdfImage;
        
        try {
          if (imgData.file.type === 'image/jpeg') {
            pdfImage = await pdfDoc.embedJpg(imageBytes);
          } else if (imgData.file.type === 'image/png') {
            pdfImage = await pdfDoc.embedPng(imageBytes);
          } else {
            continue;
          }
        } catch (err) {
          throw new Error(`फोटो (${imgData.name}) को PDF में एम्बेड करने में विफल रहा। यह करप्ट हो सकती है।`);
        }

        let pageWidth, pageHeight;
        if (pageSize === 'Original') {
          pageWidth = pdfImage.width;
          pageHeight = pdfImage.height;
        } else {
          [pageWidth, pageHeight] = PAGE_SIZE_OPTIONS[pageSize];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const m = MARGINS[margin];
        
        const maxWidth = Math.max(1, pageWidth - m * 2);
        const maxHeight = Math.max(1, pageHeight - m * 2);

        let finalW, finalH;
        
        // If image is smaller than max area and Fit Option is Fit, don't necessarily enlarge it if we don't want to?
        // Wait, standard JPG to PDF tools usually enlarge to fill the page as much as possible while respecting aspect ratio.
        if (FIT_OPTIONS[fitOption] === 'fit') {
          const scale = Math.min(maxWidth / pdfImage.width, maxHeight / pdfImage.height);
          finalW = pdfImage.width * scale;
          finalH = pdfImage.height * scale;
        } else {
          // Fill (may crop). But pdf-lib's drawImage draws the whole image into the given width/height rectangle.
          // If we want it to "fill", we scale by max and it will stretch if we don't preserve aspect ratio.
          // To "fill" while preserving aspect ratio, we scale by Math.max. But drawing it will draw the whole image, 
          // effectively drawing *outside* the page bounds if it's too big, which is the equivalent of cropping!
          const scale = Math.max(maxWidth / pdfImage.width, maxHeight / pdfImage.height);
          finalW = pdfImage.width * scale;
          finalH = pdfImage.height * scale;
        }

        const x = (pageWidth - finalW) / 2;
        const y = (pageHeight - finalH) / 2;

        page.drawImage(pdfImage, {
          x,
          y,
          width: finalW,
          height: finalH,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfResult({
        url,
        size: blob.size,
        pageCount: images.length
      });
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'PDF बनाने में त्रुटि हुई।');
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

  const formatKB = (bytes) => (bytes / 1024).toFixed(2);

  return (
    <div className={styles.container}>
      {images.length === 0 ? (
        <div 
          className={styles.uploadArea}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') fileInputRef.current?.click(); }}
          aria-label="फोटो अपलोड करें"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
            accept="image/jpeg,image/png"
            multiple
            className={styles.fileInput}
            aria-hidden="true"
          />
          <span className={styles.uploadIcon} aria-hidden="true">🖼️</span>
          <p className={styles.uploadText} lang="hi">एक या अधिक फोटो चुनें और PDF बनाएं</p>
          <p className={styles.uploadSubText}>JPG, JPEG, PNG (Drag & Drop Supported)</p>
          <button className="btn btn--primary" tabIndex={-1}>फोटो चुनें</button>
        </div>
      ) : (
        <div className={styles.workspace}>
          <div className={styles.imageListCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">चुनी गई तस्वीरें ({images.length})</span>
              <button className="btn btn--ghost btn--sm" onClick={clearAll} disabled={isProcessing}>
                सभी फोटो हटाएं
              </button>
            </div>
            
            <div className={styles.imageList}>
              {images.map(img => (
                <div key={img.id} className={styles.imageItem}>
                  <img src={img.url} alt={img.name} className={styles.thumbnail} />
                  <div className={styles.imageLabel}>{img.name}</div>
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removeImage(img.id)}
                    aria-label={`${img.name} को हटाएं`}
                    disabled={isProcessing}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div 
                className={styles.addMoreBtn}
                onClick={() => addMoreInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') addMoreInputRef.current?.click(); }}
                aria-disabled={isProcessing}
              >
                <input
                  type="file"
                  ref={addMoreInputRef}
                  onChange={(e) => handleFiles(e.target.files)}
                  accept="image/jpeg,image/png"
                  multiple
                  className={styles.fileInput}
                  disabled={isProcessing}
                />
                <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>+</span>
                <span lang="hi">और फोटो जोड़ें</span>
              </div>
            </div>
          </div>
          
          <div className={styles.settingsCard}>
            <div className={styles.settingsGroup}>
              <label htmlFor="pageSizeSelect" className={styles.settingsLabel} lang="hi">पेज का आकार (Page Size)</label>
              <select 
                id="pageSizeSelect"
                className={styles.selectInput} 
                value={pageSize} 
                onChange={(e) => { setPageSize(e.target.value); setPdfResult(null); }}
                disabled={isProcessing}
              >
                {Object.keys(PAGE_SIZE_OPTIONS).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.settingsGroup}>
              <label htmlFor="marginSelect" className={styles.settingsLabel} lang="hi">मार्जिन (Margin)</label>
              <select 
                id="marginSelect"
                className={styles.selectInput} 
                value={margin} 
                onChange={(e) => { setMargin(e.target.value); setPdfResult(null); }}
                disabled={isProcessing}
              >
                {Object.keys(MARGINS).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.settingsGroup}>
              <label htmlFor="fitSelect" className={styles.settingsLabel} lang="hi">फिट (Fit)</label>
              <select 
                id="fitSelect"
                className={styles.selectInput} 
                value={fitOption} 
                onChange={(e) => { setFitOption(e.target.value); setPdfResult(null); }}
                disabled={isProcessing}
              >
                {Object.keys(FIT_OPTIONS).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processPDF}
                disabled={isProcessing || images.length === 0}
                aria-live="polite"
              >
                {isProcessing ? 'PDF बनाया जा रहा है...' : (pdfResult ? 'फिर से बनाएं' : 'PDF बनाएं')}
              </button>
            </div>
            
            {pdfResult && (
              <div className={styles.resultCard} aria-live="polite">
                <span className={styles.resultTitle} lang="hi">सफलतापूर्वक PDF बन गया!</span>
                <div className={styles.resultStats}>
                  <span>Pages: {pdfResult.pageCount}</span> • <span>Size: {formatKB(pdfResult.size)} KB</span>
                </div>
                <a 
                  href={pdfResult.url} 
                  download="jpg-to-pdf.pdf"
                  className="btn btn--accent btn--lg"
                  style={{ width: '100%', marginTop: 'var(--space-2)' }}
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
        <span lang="hi">आपकी तस्वीरें आपके डिवाइस पर ही PDF में बदली जाती हैं। फाइल सर्वर पर अपलोड नहीं होती। (100% Client-side)</span>
      </div>
    </div>
  );
}
