'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './PdfToWordTool.module.css';

export default function PdfToWordTool() {
  const [fileStats, setFileStats] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultName, setResultName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isScanned, setIsScanned] = useState(false);

  const fileInputRef = useRef(null);

  // Configure pdf.js worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('pdfjs-dist').then((pdfjsLib) => {
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size too large. Please select a file under 50MB.');
      return;
    }

    setFileStats({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });
    setError(null);
    setResultUrl(null);
    setIsScanned(false);
  };

  const extractTextFromPage = async (page) => {
    const textContent = await page.getTextContent();
    const items = textContent.items;
    
    if (items.length === 0) {
      return null; // Empty or scanned page
    }

    let pageParagraphs = [];
    let currentLine = [];
    let lastY = null;

    // A very basic heuristic to preserve paragraphs/lines based on Y coordinates
    for (const item of items) {
      const y = Math.round(item.transform[5]); // Y coordinate is the 6th element in transform matrix
      
      if (lastY === null) {
        lastY = y;
        currentLine.push(item.str);
      } else if (Math.abs(y - lastY) > 5) {
        // New line detected
        pageParagraphs.push(currentLine.join(''));
        currentLine = [item.str];
        lastY = y;
      } else {
        // Same line
        currentLine.push(item.hasEOL ? item.str + ' ' : item.str);
      }
    }
    
    if (currentLine.length > 0) {
      pageParagraphs.push(currentLine.join(''));
    }

    // Combine lines into string, we will convert this back to Word paragraphs later
    return pageParagraphs.join('\n');
  };

  const processFile = async () => {
    if (!fileStats) return;

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setIsScanned(false);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      const fileReader = new FileReader();

      fileReader.onload = async function() {
        try {
          const typedarray = new Uint8Array(this.result);
          
          const loadingTask = pdfjsLib.getDocument({ data: typedarray });
          const pdfDocument = await loadingTask.promise;
          const numPages = pdfDocument.numPages;

          let docSections = [];
          let totalExtractedLength = 0;

          for (let i = 1; i <= numPages; i++) {
            setProgress(Math.round(((i - 1) / numPages) * 50));
            const page = await pdfDocument.getPage(i);
            const text = await extractTextFromPage(page);
            
            let paragraphChildren = [];
            
            if (text && text.trim().length > 0) {
              totalExtractedLength += text.trim().length;
              // Split by newlines to preserve basic paragraph structure
              const lines = text.split('\n');
              for (const line of lines) {
                if (line.trim().length > 0) {
                  paragraphChildren.push(
                    new Paragraph({
                      children: [new TextRun(line)],
                    })
                  );
                } else {
                  // Empty line, add a spacer paragraph
                  paragraphChildren.push(new Paragraph(""));
                }
              }
            } else {
              // Page is empty or scanned image
              paragraphChildren.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "[Image or Empty Page Content - Could not extract text]",
                      italics: true,
                      color: "888888"
                    })
                  ],
                  alignment: AlignmentType.CENTER
                })
              );
            }

            // Add page break if it's not the last page
            if (i < numPages) {
              paragraphChildren.push(
                new Paragraph({
                  children: [new PageBreak()],
                })
              );
            }

            docSections.push(...paragraphChildren);
            setProgress(Math.round((i / numPages) * 50));
          }

          if (totalExtractedLength === 0) {
            setIsScanned(true);
          }

          setProgress(75);

          // Dynamically import docx just before generating the document
          const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak } = await import('docx');

          // Create the Word document
          const doc = new Document({
            sections: [
              {
                properties: {},
                children: docSections.length > 0 ? docSections : [new Paragraph("Empty Document")]
              }
            ]
          });

          setProgress(90);

          // Generate DOCX blob
          const blob = await Packer.toBlob(doc);
          const url = URL.createObjectURL(blob);
          
          const baseName = fileStats.name.replace(/\.[^/.]+$/, "");
          setResultName(`${baseName}-converted.docx`);
          setResultUrl(url);
          setProgress(100);
          setIsProcessing(false);

        } catch (err) {
          console.error("Conversion error:", err);
          setError("An error occurred while converting the PDF. The file might be corrupted or password protected.");
          setIsProcessing(false);
        }
      };

      fileReader.readAsArrayBuffer(fileStats.file);
    } catch (err) {
      console.error(err);
      setError("Failed to load PDF processor.");
      setIsProcessing(false);
    }
  };

  const resetTool = () => {
    setFileStats(null);
    setResultUrl(null);
    setError(null);
    setIsScanned(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      {!fileStats ? (
        <div 
          className={styles.uploadArea}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleFileChange({ target: { files: e.dataTransfer.files } });
            }
          }}
        >
          <div className={styles.uploadIcon} aria-hidden="true">📄 ➡ 📝</div>
          <h2 lang="hi">PDF चुनें</h2>
          <p lang="hi">या फाइल को यहाँ खींच कर लाएं</p>
          <button className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
            <span lang="hi">फाइल चुनें</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,application/pdf"
            className="sr-only"
            aria-label="Upload PDF file"
          />
        </div>
      ) : (
        <div className={styles.workspace}>
          <div className={styles.fileCard}>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{fileStats.name}</span>
              <span className={styles.fileSize}>{fileStats.size}</span>
            </div>
            {!isProcessing && !resultUrl && (
              <button 
                className={styles.removeBtn} 
                onClick={resetTool}
                aria-label="Remove file"
              >
                ✕
              </button>
            )}
          </div>

          {error && (
            <div className={styles.errorBox} role="alert">
              <span lang="hi">{error}</span>
            </div>
          )}

          {isScanned && resultUrl && (
            <div className={styles.warningBox} role="alert" style={{ background: '#fff3cd', color: '#856404', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <strong lang="hi">ध्यान दें:</strong> <span lang="hi">आपकी PDF में केवल इमेजेस (Scanned Document) हैं। यह टूल केवल टेक्स्ट वाली PDF को सही से Word में बदल सकता है। इमेजेस को Word में एडिट नहीं किया जा सकता।</span>
            </div>
          )}

          {!isProcessing && !resultUrl && (
            <div className={styles.actions}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processFile}
              >
                <span lang="hi">PDF को Word में बदलें</span>
              </button>
            </div>
          )}

          {isProcessing && (
            <div className={styles.processingState}>
              <div className={styles.spinner} aria-hidden="true"></div>
              <p lang="hi">प्रोसेस हो रहा है... कृपया प्रतीक्षा करें</p>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {resultUrl && !isProcessing && (
            <div className={styles.resultArea}>
              <div className={styles.successMessage} role="status">
                <span aria-hidden="true">✅</span> <span lang="hi">आपकी Word फाइल तैयार है!</span>
              </div>
              <div className={styles.downloadActions}>
                <a 
                  href={resultUrl} 
                  download={resultName}
                  className="btn btn--primary btn--lg"
                >
                  <span lang="hi">Word फाइल डाउनलोड करें</span>
                </a>
                <button 
                  className="btn btn--outline" 
                  onClick={resetTool}
                >
                  <span lang="hi">नई फाइल कन्वर्ट करें</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
