'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ImageCompressTool.module.css';
import { compressImageStrict } from '@/lib/imageCompression';

export default function PhotoCompressTool({ defaultTarget = 20 }) {
  const [file, setFile] = useState(null);
  const [originalStats, setOriginalStats] = useState(null);
  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [processedStats, setProcessedStats] = useState(null);
  
  const [targetKB, setTargetKB] = useState(defaultTarget);
  const [isCustomTarget, setIsCustomTarget] = useState(false);
  const [customKB, setCustomKB] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (processedUrl) URL.revokeObjectURL(processedUrl);
      if (originalStats?.url) URL.revokeObjectURL(originalStats.url);
    };
  }, [processedUrl, originalStats]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.startsWith('image/')) {
      setError('कृपया केवल इमेज (JPG, PNG, WebP) फाइल चुनें।');
      return;
    }
    
    setError(null);
    setFile(selectedFile);
    setProcessedBlob(null);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setProcessedUrl(null);
    
    const url = URL.createObjectURL(selectedFile);
    const img = new Image();
    img.onload = () => {
      setOriginalStats({
        size: selectedFile.size,
        width: img.width,
        height: img.height,
        url: url
      });
    };
    img.onerror = () => {
      setError('इमेज लोड करने में समस्या आई।');
    };
    img.src = url;
  };

  const processImage = async () => {
    if (!file || !originalStats) return;
    
    let target = isCustomTarget ? parseInt(customKB, 10) : targetKB;
    if (isNaN(target) || target <= 0) {
      setError('कृपया सही लक्ष्य आकार (Target KB) दर्ज करें।');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const bestBlob = await compressImageStrict(file, target);
      
      const url = URL.createObjectURL(bestBlob);
      setProcessedBlob(bestBlob);
      setProcessedUrl(url);
      setProcessedStats({
        size: bestBlob.size,
        width: bestBlob.width,
        height: bestBlob.height
      });
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'प्रोसेसिंग में त्रुटि हुई।');
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
  
  const formatKB = (bytes) => (bytes / 1024).toFixed(2);

  return (
    <div className={styles.container}>
      {/* Upload Area */}
      {!file && (
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
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className={styles.fileInput}
            aria-hidden="true"
          />
          <span className={styles.uploadIcon} aria-hidden="true">📸</span>
          <p className={styles.uploadText} lang="hi">अपनी फोटो यहाँ चुनें या खींचें (Drag & Drop)</p>
          <p className={styles.uploadSubText}>केवल JPG, PNG, WebP स्वीकृत हैं</p>
          <button className="btn btn--primary" tabIndex={-1}>फोटो चुनें</button>
        </div>
      )}

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`} role="alert" aria-live="assertive">
          <span aria-hidden="true">⚠️</span>
          <span lang="hi">{error}</span>
        </div>
      )}

      {/* Workspace */}
      {file && originalStats && (
        <div className={styles.workspace}>
          
          {/* Settings & Original */}
          <div className={styles.settingsArea}>
            <div className={styles.cardHeader} style={{ margin: 'calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) var(--space-4)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
              <span className={styles.cardTitle} lang="hi">सेटिंग्स (Settings)</span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={() => {
                  setFile(null);
                  setProcessedBlob(null);
                  setProcessedUrl(null);
                  setOriginalStats(null);
                }}
              >
                नई फोटो (New)
              </button>
            </div>
            
            <p className={styles.settingsTitle} lang="hi">लक्ष्य आकार (Target Size):</p>
            <div className={styles.targetSelector} role="radiogroup" aria-label="Target Size Selection">
              {[20, 50, 100, 200].map(kb => (
                <div key={kb}>
                  <input
                    type="radio"
                    id={`target-${kb}`}
                    name="targetKB"
                    className={styles.radioInput}
                    checked={!isCustomTarget && targetKB === kb}
                    onChange={() => {
                      setIsCustomTarget(false);
                      setTargetKB(kb);
                    }}
                  />
                  <label htmlFor={`target-${kb}`} className={styles.radioLabel}>{kb} KB</label>
                </div>
              ))}
              <div>
                <input
                  type="radio"
                  id="target-custom"
                  name="targetKB"
                  className={styles.radioInput}
                  checked={isCustomTarget}
                  onChange={() => setIsCustomTarget(true)}
                />
                <label htmlFor="target-custom" className={styles.radioLabel} lang="hi">अन्य (Custom)</label>
              </div>
            </div>
            
            {isCustomTarget && (
              <div className={styles.customTarget}>
                <input
                  type="number"
                  value={customKB}
                  onChange={(e) => setCustomKB(e.target.value)}
                  placeholder="उदा. 40"
                  className={styles.customInput}
                  aria-label="Custom Target KB"
                  min="1"
                />
                <span lang="hi">KB</span>
              </div>
            )}

            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processImage}
                disabled={isProcessing}
                style={{ width: '100%' }}
              >
                {isProcessing ? 'प्रोसेसिंग हो रही है...' : (processedBlob ? 'फिर से प्रोसेस करें (Reprocess)' : 'कम्प्रेस करें (Compress)')}
              </button>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <p className={styles.cardTitle} style={{ marginBottom: 'var(--space-2)' }}>Original Image</p>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Size:</span>
                <span className={styles.statValue}>{formatKB(originalStats.size)} KB</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Dimensions:</span>
                <span className={styles.statValue}>{originalStats.width} × {originalStats.height}</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className={styles.imageCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">परिणाम (Result)</span>
              {processedBlob && (
                <span className={`badge badge--live`}>सफल (Success)</span>
              )}
            </div>
            
            <div className={styles.previewContainer}>
              {processedUrl ? (
                <img src={processedUrl} alt="Processed preview" className={styles.previewImage} />
              ) : (
                originalStats.url && (
                  <img src={originalStats.url} alt="Original preview" className={styles.previewImage} style={{ opacity: 0.5 }} />
                )
              )}
              {!processedUrl && !isProcessing && (
                <div style={{ position: 'absolute', color: 'var(--color-text-muted)' }} lang="hi">
                  परिणाम देखने के लिए 'कम्प्रेस करें' दबाएं
                </div>
              )}
              {isProcessing && (
                <div style={{ position: 'absolute' }}>
                  <div className="badge badge--coming-soon">प्रोसेसिंग...</div>
                </div>
              )}
            </div>

            {processedStats && (
              <div className={styles.statsList} aria-live="polite">
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Final Size:</span>
                  <span className={`${styles.statValue} ${styles.statValueSuccess}`}>{formatKB(processedStats.size)} KB</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Final Dimensions:</span>
                  <span className={styles.statValue}>{processedStats.width} × {processedStats.height}</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Reduction:</span>
                  <span className={styles.statValue}>
                    {(((originalStats.size - processedStats.size) / originalStats.size) * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className={styles.actionArea} style={{ marginTop: 'var(--space-2)' }}>
                  <a 
                    href={processedUrl} 
                    download={`photo-${isCustomTarget ? customKB : targetKB}kb.jpg`}
                    className="btn btn--accent btn--lg"
                    style={{ width: '100%' }}
                  >
                    डाउनलोड करें (Download)
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy Note */}
      <div className={styles.privacyNote} role="note">
        <span aria-hidden="true">🔒</span>
        <span lang="hi">आपकी फोटो आपके डिवाइस पर ही प्रोसेस होती है। फोटो सर्वर पर अपलोड नहीं होती। (100% Client-side Processing)</span>
      </div>
    </div>
  );
}
