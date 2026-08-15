'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCompressTool.module.css';

export default function CropImageTool() {
  const [file, setFile] = useState(null);
  const [originalStats, setOriginalStats] = useState(null);
  
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(undefined); // undefined = free
  
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  
  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [processedStats, setProcessedStats] = useState(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

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
    
    setCrop(undefined);
    setCompletedCrop(null);
    setOriginalStats({ size: selectedFile.size, url: url });
  };

  const handleImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    setOriginalStats(prev => ({
      ...prev,
      width: naturalWidth,
      height: naturalHeight
    }));
    
    // Sensible initial crop (80% centered)
    let cropWidth = width * 0.8;
    let cropHeight = aspect ? cropWidth / aspect : height * 0.8;
    if (cropHeight > height) {
      cropHeight = height * 0.8;
      cropWidth = cropHeight * aspect;
    }
    const x = (width - cropWidth) / 2;
    const y = (height - cropHeight) / 2;
    
    const initialCrop = { unit: 'px', width: cropWidth, height: cropHeight, x, y };
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  };

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect);
    if (!imgRef.current) return;
    
    const { width, height } = imgRef.current;
    if (newAspect) {
      let cropWidth = width * 0.8;
      let cropHeight = cropWidth / newAspect;
      if (cropHeight > height) {
        cropHeight = height * 0.8;
        cropWidth = cropHeight * newAspect;
      }
      const x = (width - cropWidth) / 2;
      const y = (height - cropHeight) / 2;
      const newCrop = { unit: 'px', width: cropWidth, height: cropHeight, x, y };
      setCrop(newCrop);
      setCompletedCrop(newCrop);
    }
  };

  const processImage = async () => {
    if (!file || !originalStats || !completedCrop || !imgRef.current) return;
    
    if (completedCrop.width === 0 || completedCrop.height === 0) {
      setError('अमान्य क्रॉप क्षेत्र। कृपया इमेज का हिस्सा चुनें। (Invalid crop area)');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const imageElement = imgRef.current;
      const scaleX = imageElement.naturalWidth / imageElement.width;
      const scaleY = imageElement.naturalHeight / imageElement.height;
      
      const sourceX = Math.round(completedCrop.x * scaleX);
      const sourceY = Math.round(completedCrop.y * scaleY);
      const sourceWidth = Math.round(completedCrop.width * scaleX);
      const sourceHeight = Math.round(completedCrop.height * scaleY);
      
      if (sourceWidth * sourceHeight > 16777216) {
        setError('यह resolution बहुत बड़ा है। कृपया छोटा हिस्सा चुनें। (Max ~16 Megapixels)');
        setIsProcessing(false);
        return;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      const ctx = canvas.getContext('2d');
      
      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(
        imageElement,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );
      
      const blob = await new Promise((resolve, reject) => {
        const q = outputFormat === 'image/png' ? undefined : 0.92;
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas export failed'));
        }, outputFormat, q);
      });
      
      canvas.width = 0; canvas.height = 0;
      
      const url = URL.createObjectURL(blob);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
      
      setProcessedBlob(blob);
      setProcessedUrl(url);
      setProcessedStats({
        size: blob.size,
        width: sourceWidth,
        height: sourceHeight
      });
      
    } catch (err) {
      console.error(err);
      setError('इमेज क्रॉप करने में समस्या आई। (Crop failed)');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files?.length > 0) handleFileChange({ target: { files: e.dataTransfer.files } });
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
    return `${base}-cropped.${getExtension()}`;
  };

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
        <div className={styles.workspace} style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Settings Card */}
          <div className={styles.settingsArea} style={{ width: '100%' }}>
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
                दूसरी इमेज चुनें (Crop Another)
              </button>
            </div>
            
            <label className={styles.settingsTitle} style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Aspect Ratio (अनुपात):</label>
            <div className={styles.targetSelector} role="radiogroup" aria-label="Crop Aspect Ratio">
              {[
                { label: 'Free', value: undefined },
                { label: 'Square 1:1', value: 1 },
                { label: 'Standard 4:3', value: 4/3 },
                { label: 'Widescreen 16:9', value: 16/9 },
                { label: 'Passport 3.5:4.5', value: 3.5/4.5 }
              ].map((opt, i) => (
                <div key={i}>
                  <input 
                    type="radio" 
                    id={`aspect-${i}`} 
                    name="cropAspect" 
                    className={styles.radioInput} 
                    checked={aspect === opt.value} 
                    onChange={() => handleAspectChange(opt.value)} 
                  />
                  <label htmlFor={`aspect-${i}`} className={styles.radioLabel} lang="hi">{opt.label}</label>
                </div>
              ))}
            </div>

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

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              <div><strong>Original Size:</strong> {formatSize(originalStats.size)}</div>
              {originalStats.width && <div><strong>Dimensions:</strong> {originalStats.width} × {originalStats.height}</div>}
            </div>
            
            <div className={styles.actionArea}>
              <button 
                className="btn btn--primary btn--lg" 
                onClick={processImage}
                disabled={isProcessing}
                style={{ width: '100%', maxWidth: '300px' }}
              >
                {isProcessing ? 'प्रोसेसिंग हो रही है...' : 'इमेज क्रॉप करें (Crop Image)'}
              </button>
            </div>
          </div>

          {/* Grid for Preview & Result */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }} className="crop-result-grid">
            {/* Crop Workspace */}
            <div className={styles.imageCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle} lang="hi">क्रॉप एरिया (Crop Workspace)</span>
              </div>
              <div className={styles.previewContainer} style={{ padding: 0, backgroundColor: 'var(--color-surface-2)', minHeight: '300px' }}>
                <ReactCrop 
                  crop={crop} 
                  onChange={c => setCrop(c)} 
                  onComplete={c => setCompletedCrop(c)} 
                  aspect={aspect}
                  style={{ maxWidth: '100%', maxHeight: '70vh' }}
                >
                  <img 
                    ref={imgRef} 
                    src={originalStats.url} 
                    onLoad={handleImageLoad} 
                    alt="Upload preview" 
                    style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                  />
                </ReactCrop>
              </div>
            </div>

            {/* Result Stats & Download */}
            {processedStats && (
              <div className={styles.imageCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle} lang="hi">परिणाम (Result)</span>
                  <span className={`badge badge--live`}>तैयार (Ready)</span>
                </div>
                
                <div className={styles.previewContainer} style={{ minHeight: '200px' }}>
                  <img src={processedUrl} alt="Cropped preview" className={styles.previewImage} />
                </div>
                
                <div className={styles.statsList} aria-live="polite">
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Cropped Size:</span>
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
                  
                  <div className={styles.actionArea} style={{ marginTop: 'var(--space-4)' }}>
                    <a 
                      href={processedUrl} 
                      download={getDownloadFilename()}
                      className="btn btn--accent btn--lg"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', maxWidth: '300px' }}
                    >
                      <span>इमेज डाउनलोड करें</span>
                      <span style={{ fontSize: '0.85em', opacity: 0.9 }}>(Download Image)</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @media (min-width: 768px) {
              .crop-result-grid {
                grid-template-columns: 1fr 1fr !important;
              }
            }
            .ReactCrop__drag-handle {
              width: 44px !important;
              height: 44px !important;
            }
          `}} />
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
