'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ImageCompressTool.module.css';

export default function ResizeImageTool() {
  const [file, setFile] = useState(null);
  const [originalStats, setOriginalStats] = useState(null);
  
  const [mode, setMode] = useState('percentage'); // 'percentage', 'pixels'
  const [percentage, setPercentage] = useState(100);
  
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maintainRatio, setMaintainRatio] = useState(true);
  
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  
  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [processedStats, setProcessedStats] = useState(null);
  
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
    
    if (selectedFile.type === 'image/png') setOutputFormat('image/png');
    else if (selectedFile.type === 'image/webp') setOutputFormat('image/webp');
    else setOutputFormat('image/jpeg');
    
    const url = URL.createObjectURL(selectedFile);
    const img = new Image();
    img.onload = () => {
      setOriginalStats({
        size: selectedFile.size,
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
        url: url
      });
      setWidth(img.width.toString());
      setHeight(img.height.toString());
      setPercentage(100);
    };
    img.onerror = () => {
      setError('इमेज लोड करने में समस्या आई। फाइल करप्ट हो सकती है।');
    };
    img.src = url;
  };

  const handleWidthChange = (val) => {
    setWidth(val);
    const numW = parseInt(val, 10);
    if (!isNaN(numW) && numW > 0 && maintainRatio && originalStats) {
      setHeight(Math.round(numW / originalStats.ratio).toString());
    }
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    const numH = parseInt(val, 10);
    if (!isNaN(numH) && numH > 0 && maintainRatio && originalStats) {
      setWidth(Math.round(numH * originalStats.ratio).toString());
    }
  };

  const toggleRatio = () => {
    const newMaintain = !maintainRatio;
    setMaintainRatio(newMaintain);
    if (newMaintain && originalStats) {
      const numW = parseInt(width, 10);
      if (!isNaN(numW) && numW > 0) {
        setHeight(Math.round(numW / originalStats.ratio).toString());
      }
    }
  };

  const processImage = async () => {
    if (!file || !originalStats) return;
    
    let targetW = 0;
    let targetH = 0;
    
    if (mode === 'percentage') {
      targetW = Math.max(1, Math.round(originalStats.width * (percentage / 100)));
      targetH = Math.max(1, Math.round(originalStats.height * (percentage / 100)));
    } else {
      targetW = parseInt(width, 10);
      targetH = parseInt(height, 10);
      if (isNaN(targetW) || targetW <= 0 || isNaN(targetH) || targetH <= 0) {
        setError('कृपया सही पिक्सेल आयाम (Dimensions) दर्ज करें।');
        return;
      }
    }
    
    if (targetW * targetH > 16777216) { // ~16 MP
      setError('यह resolution बहुत बड़ा है। कृपया छोटा size चुनें। (Max ~16 Megapixels)');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const img = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = targetW;
      canvas.height = targetH;
      
      // Handle transparency safely when converting to JPEG
      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);
      } else {
        ctx.clearRect(0, 0, targetW, targetH);
      }
      
      ctx.drawImage(img, 0, 0, targetW, targetH);
      
      const blob = await new Promise((resolve, reject) => {
        const q = outputFormat === 'image/png' ? undefined : 0.92;
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas export failed'));
        }, outputFormat, q);
      });
      
      img.close(); // Release ImageBitmap memory immediately
      canvas.width = 0; canvas.height = 0; // Clear canvas memory
      
      const url = URL.createObjectURL(blob);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
      
      setProcessedBlob(blob);
      setProcessedUrl(url);
      setProcessedStats({
        size: blob.size,
        width: targetW,
        height: targetH
      });
      
    } catch (err) {
      console.error(err);
      setError('इमेज प्रोसेस करने में समस्या आई।');
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
  
  const formatSize = (bytes) => {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const getExtension = () => {
    if (outputFormat === 'image/png') return 'png';
    if (outputFormat === 'image/webp') return 'webp';
    return 'jpg';
  };

  const getDownloadFilename = () => {
    const base = file.name.replace(/\.[^/.]+$/, "");
    return `${base}-resized.${getExtension()}`;
  };

  const previewW = mode === 'percentage' && originalStats ? Math.max(1, Math.round(originalStats.width * (percentage / 100))) : 0;
  const previewH = mode === 'percentage' && originalStats ? Math.max(1, Math.round(originalStats.height * (percentage / 100))) : 0;

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
          aria-label="इमेज अपलोड करें"
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
          <p className={styles.uploadText} lang="hi">अपनी इमेज यहाँ चुनें या खींचें (Drag & Drop)</p>
          <p className={styles.uploadSubText}>केवल JPG, PNG, WebP स्वीकृत हैं</p>
          <button className="btn btn--primary" tabIndex={-1}>इमेज चुनें</button>
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
                दूसरी इमेज चुनें (New)
              </button>
            </div>
            
            <div className={styles.targetSelector} role="radiogroup" aria-label="Resize Mode Selection">
              <div>
                <input type="radio" id="mode-percentage" name="resizeMode" className={styles.radioInput} checked={mode === 'percentage'} onChange={() => setMode('percentage')} />
                <label htmlFor="mode-percentage" className={styles.radioLabel} lang="hi">प्रतिशत / Percentage</label>
              </div>
              <div>
                <input type="radio" id="mode-pixels" name="resizeMode" className={styles.radioInput} checked={mode === 'pixels'} onChange={() => setMode('pixels')} />
                <label htmlFor="mode-pixels" className={styles.radioLabel} lang="hi">पिक्सेल / Exact Pixels</label>
              </div>
            </div>

            {mode === 'percentage' && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <label htmlFor="percentage-slider" className={styles.settingsTitle}>
                    Scale (आकार):
                  </label>
                  <span style={{ fontWeight: 'bold' }}>{percentage}%</span>
                </div>
                <input 
                  id="percentage-slider"
                  type="range" 
                  min="10" 
                  max="200" 
                  step="5"
                  value={percentage} 
                  onChange={(e) => setPercentage(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
                  New Size: {previewW} × {previewH} px
                </p>
              </div>
            )}

            {mode === 'pixels' && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="pixel-width" style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.875rem', fontWeight: 600 }}>Width (px)</label>
                    <input 
                      id="pixel-width"
                      type="number" 
                      value={width} 
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className={styles.customInput}
                      style={{ width: '100%' }}
                      min="1"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="pixel-height" style={{ display: 'block', marginBottom: 'var(--space-1)', fontSize: '0.875rem', fontWeight: 600 }}>Height (px)</label>
                    <input 
                      id="pixel-height"
                      type="number" 
                      value={height} 
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className={styles.customInput}
                      style={{ width: '100%' }}
                      min="1"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input 
                    id="maintain-ratio"
                    type="checkbox" 
                    checked={maintainRatio} 
                    onChange={toggleRatio} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="maintain-ratio" style={{ cursor: 'pointer', fontSize: '0.875rem' }}>
                    Maintain Aspect Ratio 🔗 (अनुपात बनाए रखें)
                  </label>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label htmlFor="output-format" className={styles.settingsTitle} style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Output Format:</label>
              <select 
                id="output-format"
                value={outputFormat} 
                onChange={(e) => setOutputFormat(e.target.value)}
                style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              >
                <option value="image/jpeg">JPG / JPEG (Best for photos)</option>
                <option value="image/webp">WebP (Modern, highly compressed)</option>
                <option value="image/png">PNG (Preserves transparency)</option>
              </select>
              {outputFormat === 'image/jpeg' && (
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>* JPG में transparency हटकर सफेद background होगा.</p>
              )}
            </div>

            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processImage}
                disabled={isProcessing}
                style={{ width: '100%' }}
              >
                {isProcessing ? 'प्रोसेसिंग हो रही है...' : (processedBlob ? 'फिर से रिसाइज़ करें (Update Preview)' : 'इमेज रिसाइज़ करें (Resize Image)')}
              </button>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <p className={styles.cardTitle} style={{ marginBottom: 'var(--space-2)' }}>Original Image</p>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Size:</span>
                <span className={styles.statValue}>{formatSize(originalStats.size)}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Dimensions:</span>
                <span className={styles.statValue}>{originalStats.width} × {originalStats.height}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Format:</span>
                <span className={styles.statValue}>{file.type.split('/')[1].toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className={styles.imageCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle} lang="hi">परिणाम (Resized Preview)</span>
              {processedBlob && (
                <span className={`badge badge--live`}>तैयार (Ready)</span>
              )}
            </div>
            
            <div className={styles.previewContainer}>
              {processedUrl ? (
                <img src={processedUrl} alt="Resized preview" className={styles.previewImage} />
              ) : (
                originalStats.url && (
                  <img src={originalStats.url} alt="Original preview" className={styles.previewImage} style={{ opacity: 0.5, filter: 'grayscale(50%)' }} />
                )
              )}
              {!processedUrl && !isProcessing && (
                <div style={{ position: 'absolute', color: 'var(--color-text-muted)', fontWeight: 'bold' }} lang="hi">
                  परिणाम देखने के लिए 'रिसाइज़ करें' दबाएं
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
                  <span className={styles.statLabel}>New Size:</span>
                  <span className={`${styles.statValue} ${styles.statValueSuccess}`}>{formatSize(processedStats.size)}</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>New Dimensions:</span>
                  <span className={styles.statValue}>{processedStats.width} × {processedStats.height}</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Output Format:</span>
                  <span className={styles.statValue}>{outputFormat.split('/')[1].toUpperCase()}</span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Saved:</span>
                  <span className={styles.statValue}>
                    {originalStats.size > processedStats.size 
                      ? (((originalStats.size - processedStats.size) / originalStats.size) * 100).toFixed(1) + '%'
                      : 'File size increased'}
                  </span>
                </div>
                
                <div className={styles.actionArea} style={{ marginTop: 'var(--space-4)' }}>
                  <a 
                    href={processedUrl} 
                    download={getDownloadFilename()}
                    className="btn btn--accent btn--lg"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                  >
                    <span>इमेज डाउनलोड करें</span>
                    <span style={{ fontSize: '0.85em', opacity: 0.9 }}>(Download Image)</span>
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
        <span lang="hi">आपकी इमेज आपके डिवाइस पर ही प्रोसेस होती है। फाइल सर्वर पर अपलोड नहीं होती। (100% Client-side Processing)</span>
      </div>
    </div>
  );
}
