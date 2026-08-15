'use client';

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import styles from './PdfEditorTool.module.css';

export default function PdfEditorTool() {
  // Phase 1: Viewer State
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Phase 2: Annotation State
  const [annotations, setAnnotations] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const [activeTool, setActiveTool] = useState('select'); // 'select', 'text', 'rectangle', 'line', 'draw'
  const [selectedId, setSelectedId] = useState(null);
  const [editingTextId, setEditingTextId] = useState(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState(null);
  const [dragState, setDragState] = useState(null);
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const renderTaskRef = useRef(null);
  const pdfjsLibRef = useRef(null);

  // Initialize PDF.js
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('pdfjs-dist').then((pdfjsLib) => {
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        }
        pdfjsLibRef.current = pdfjsLib;
      });
    }
    return () => {
      if (pdfDoc) pdfDoc.destroy().catch(() => {});
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
    };
  }, [pdfDoc]);

  // Handle Keyboard (Undo/Redo/Delete)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          commitAction(annotations.filter(a => a.id !== selectedId));
          setSelectedId(null);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, annotations, history, historyIndex]);

  // Commit history step
  const commitAction = (newAnnotations) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newHistory[newHistory.length - 1]);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnnotations(history[historyIndex - 1]);
      setSelectedId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnnotations(history[historyIndex + 1]);
      setSelectedId(null);
    }
  };

  // Load PDF
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setError('कृपया केवल PDF फाइल चुनें।');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    if (pdfDoc) {
      await pdfDoc.destroy().catch(() => {});
      setPdfDoc(null);
    }
    
    setFile(selectedFile);
    setCurrentPage(1);
    setScale(1.0);
    setAnnotations([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setSelectedId(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      if (!pdfjsLibRef.current) throw new Error('PDF viewer engine not loaded yet. Please try again.');
      
      const loadingTask = pdfjsLibRef.current.getDocument({ data: arrayBuffer });
      const loadedPdf = await loadingTask.promise;
      
      setPdfDoc(loadedPdf);
      setNumPages(loadedPdf.numPages);
    } catch (err) {
      console.error(err);
      if (err.name === 'PasswordException' || (err.message && err.message.toLowerCase().includes('password'))) {
        setError('This PDF is password protected. Please unlock it first.');
      } else {
        setError('PDF को लोड करने में समस्या आई। फाइल करप्ट हो सकती है या ब्राउज़र इसे सपोर्ट नहीं करता।');
      }
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Render Page
  const renderPage = async (pageNum, currentScale) => {
    if (!pdfDoc || !canvasRef.current) return;
    if (renderTaskRef.current) await renderTaskRef.current.cancel().catch(() => {});

    try {
      const page = await pdfDoc.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      setPageDimensions({ width: baseViewport.width, height: baseViewport.height });

      const viewport = page.getViewport({ scale: currentScale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const outputScale = window.devicePixelRatio || 1;
      
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

      renderTaskRef.current = page.render({ canvasContext: ctx, transform, viewport });
      await renderTaskRef.current.promise;
      page.cleanup();
    } catch (err) {
      if (err.name !== 'RenderingCancelledException') console.error('Render error:', err);
    }
  };

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage, scale);
  }, [pdfDoc, currentPage, scale]);

  // ---------------------------------------------------------
  // Overlay Drawing Interaction
  // ---------------------------------------------------------
  const handleOverlayPointerDown = (e) => {
    if (activeTool === 'select' || e.button !== 0) {
       // if we click empty space in select mode, clear selection
       if (e.target === overlayRef.current) setSelectedId(null);
       return;
    }
    
    const rect = overlayRef.current.getBoundingClientRect();
    const docX = (e.clientX - rect.left) / scale;
    const docY = (e.clientY - rect.top) / scale;
    
    setIsDrawing(true);
    const newId = Math.random().toString(36).substr(2, 9);
    
    if (activeTool === 'text') {
      const newAnn = {
        id: newId, pageIndex: currentPage, type: 'text',
        x: docX, y: docY, text: 'Text', fontSize: 18, color: '#000000'
      };
      commitAction([...annotations, newAnn]);
      setSelectedId(newId);
      setEditingTextId(newId);
      setActiveTool('select');
      setIsDrawing(false);
    } else if (activeTool === 'rectangle') {
      setCurrentPath({
        id: newId, pageIndex: currentPage, type: 'rectangle',
        x: docX, y: docY, width: 0, height: 0, color: '#e53e3e', borderWidth: 2
      });
    } else if (activeTool === 'line') {
      setCurrentPath({
        id: newId, pageIndex: currentPage, type: 'line',
        x: docX, y: docY, x2: docX, y2: docY, color: '#e53e3e', borderWidth: 2
      });
    } else if (activeTool === 'draw') {
      setCurrentPath({
        id: newId, pageIndex: currentPage, type: 'freehand',
        path: [{x: docX, y: docY}], color: '#e53e3e', borderWidth: 2
      });
    }
  };

  const handleOverlayPointerMove = (e) => {
    if (!isDrawing || !currentPath) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const docX = (e.clientX - rect.left) / scale;
    const docY = (e.clientY - rect.top) / scale;
    
    if (currentPath.type === 'rectangle') {
      setCurrentPath({ ...currentPath, width: docX - currentPath.x, height: docY - currentPath.y });
    } else if (currentPath.type === 'line') {
      setCurrentPath({ ...currentPath, x2: docX, y2: docY });
    } else if (currentPath.type === 'freehand') {
      setCurrentPath({ ...currentPath, path: [...currentPath.path, {x: docX, y: docY}] });
    }
  };

  const handleOverlayPointerUp = () => {
    if (!isDrawing || !currentPath) return;
    setIsDrawing(false);
    
    let finalAnn = { ...currentPath };
    if (finalAnn.type === 'rectangle') {
      if (finalAnn.width < 0) { finalAnn.x += finalAnn.width; finalAnn.width = Math.abs(finalAnn.width); }
      if (finalAnn.height < 0) { finalAnn.y += finalAnn.height; finalAnn.height = Math.abs(finalAnn.height); }
      if (finalAnn.width < 5 && finalAnn.height < 5) { setCurrentPath(null); return; }
    }
    if (finalAnn.type === 'line') {
      const dx = finalAnn.x2 - finalAnn.x;
      const dy = finalAnn.y2 - finalAnn.y;
      if (Math.sqrt(dx*dx + dy*dy) < 5) { setCurrentPath(null); return; }
    }
    
    commitAction([...annotations, finalAnn]);
    setSelectedId(finalAnn.id);
    setCurrentPath(null);
    setActiveTool('select');
  };

  // ---------------------------------------------------------
  // Annotation Dragging Interaction
  // ---------------------------------------------------------
  const handleAnnPointerDown = (e, ann) => {
    if (activeTool !== 'select' || e.button !== 0) return;
    e.stopPropagation();
    setSelectedId(ann.id);
    e.target.setPointerCapture(e.pointerId);

    const rect = overlayRef.current.getBoundingClientRect();
    const docX = (e.clientX - rect.left) / scale;
    const docY = (e.clientY - rect.top) / scale;
    
    setDragState({
      id: ann.id,
      startX: docX,
      startY: docY,
      currentX: docX,
      currentY: docY
    });
  };

  const handleAnnPointerMove = (e) => {
    if (!dragState) return;
    e.stopPropagation();
    const rect = overlayRef.current.getBoundingClientRect();
    const docX = (e.clientX - rect.left) / scale;
    const docY = (e.clientY - rect.top) / scale;
    setDragState(prev => ({ ...prev, currentX: docX, currentY: docY }));
  };

  const handleAnnPointerUp = (e, ann) => {
    if (!dragState) return;
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    
    const dx = dragState.currentX - dragState.startX;
    const dy = dragState.currentY - dragState.startY;
    
    if (dx !== 0 || dy !== 0) {
      let movedAnn = { ...ann, x: ann.x + dx, y: ann.y + dy };
      if (movedAnn.type === 'line') {
        movedAnn.x2 = ann.x2 + dx;
        movedAnn.y2 = ann.y2 + dy;
      }
      commitAction(annotations.map(a => a.id === ann.id ? movedAnn : a));
    }
    setDragState(null);
  };

  const hexToRgbPdf = (hex) => {
    if (!hex) return rgb(0, 0, 0);
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return rgb(r, g, b);
  };

  const handleExport = async () => {
    if (!file) return;
    setIsExporting(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();

      for (const ann of annotations) {
        if (ann.pageIndex < 1 || ann.pageIndex > pages.length) continue;
        const page = pages[ann.pageIndex - 1];
        const { width: pageW, height: pageH } = page.getSize();
        const pdfColor = hexToRgbPdf(ann.color || '#000000');

        if (ann.type === 'text') {
           page.drawText(ann.text, {
             x: ann.x,
             y: pageH - ann.y - (ann.fontSize * 0.8),
             size: ann.fontSize,
             font: helveticaFont,
             color: pdfColor
           });
        } else if (ann.type === 'rectangle') {
           page.drawRectangle({
             x: ann.x,
             y: pageH - ann.y - ann.height,
             width: ann.width,
             height: ann.height,
             borderColor: pdfColor,
             borderWidth: ann.borderWidth
           });
        } else if (ann.type === 'line') {
           page.drawLine({
             start: { x: ann.x, y: pageH - ann.y },
             end: { x: ann.x2, y: pageH - ann.y2 },
             color: pdfColor,
             thickness: ann.borderWidth
           });
        } else if (ann.type === 'freehand') {
           const points = ann.path;
           if (points && points.length > 1) {
             for (let i = 0; i < points.length - 1; i++) {
                page.drawLine({
                  start: { x: points[i].x, y: pageH - points[i].y },
                  end: { x: points[i+1].x, y: pageH - points[i+1].y },
                  color: pdfColor,
                  thickness: ann.borderWidth
                });
             }
           }
        }
      }

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const originalName = file.name.replace(/\.pdf$/i, '');
      
      setExportResult({
        url,
        filename: `${originalName}-edited.pdf`
      });
    } catch (err) {
      console.error(err);
      setError('PDF Export failed. The document might be corrupted.');
    } finally {
      setIsExporting(false);
    }
  };

  const clearFile = () => {
    if (pdfDoc) pdfDoc.destroy().catch(() => {});
    setPdfDoc(null); setFile(null); setNumPages(0); setCurrentPage(1); setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setAnnotations([]); setHistory([[]]); setHistoryIndex(0); setSelectedId(null);
  };

  const pageAnns = annotations.filter(a => a.pageIndex === currentPage);

  return (
    <div className={styles.container}>
      {!pdfDoc && !isProcessing && (
        <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()} onDragOver={(e)=>e.preventDefault()} onDrop={handleFileChange} role="button" tabIndex={0}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className={styles.fileInput} />
          <span className={styles.uploadIcon} aria-hidden="true">📄</span>
          <p className={styles.uploadText} lang="hi">PDF चुनें / Select PDF</p>
          <button className="btn btn--primary" tabIndex={-1}>PDF चुनें</button>
        </div>
      )}

      {isProcessing && !pdfDoc && (
        <div className={styles.uploadArea} style={{ cursor: 'wait' }}><p className={styles.uploadText} lang="hi">PDF लोड हो रही है...</p></div>
      )}

      {pdfDoc && (
        <div className={styles.workspace}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarGroup}>
              <button className="btn btn--ghost btn--sm" onClick={clearFile}>नया PDF (Close)</button>
            </div>
            
            <div className={styles.toolbarGroup} style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-2)' }}>
              <button className={styles.iconBtn} data-active={activeTool === 'select'} onClick={() => setActiveTool('select')} title="चुनें / Select">👆</button>
              <button className={styles.iconBtn} data-active={activeTool === 'text'} onClick={() => setActiveTool('text')} title="टेक्स्ट / Text">T</button>
              <button className={styles.iconBtn} data-active={activeTool === 'rectangle'} onClick={() => setActiveTool('rectangle')} title="आयत / Rectangle">⬜</button>
              <button className={styles.iconBtn} data-active={activeTool === 'line'} onClick={() => setActiveTool('line')} title="लाइन / Line">╱</button>
              <button className={styles.iconBtn} data-active={activeTool === 'draw'} onClick={() => setActiveTool('draw')} title="ड्रा / Draw">✏️</button>
            </div>

            <div className={styles.toolbarGroup} style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-2)' }}>
              <button className={styles.iconBtn} onClick={handleUndo} disabled={historyIndex === 0} title="Undo">↩</button>
              <button className={styles.iconBtn} onClick={handleRedo} disabled={historyIndex === history.length - 1} title="Redo">↪</button>
              <button className={styles.iconBtn} onClick={() => {if(selectedId) commitAction(annotations.filter(a=>a.id!==selectedId)); setSelectedId(null);}} disabled={!selectedId} title="Delete Selected">🗑️</button>
            </div>
            
            <div className={styles.toolbarGroup} style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-2)' }}>
              {!exportResult ? (
                 <button 
                   className="btn btn--primary btn--sm" 
                   onClick={handleExport}
                   disabled={isExporting || annotations.length === 0}
                 >
                   {isExporting ? 'Exporting...' : 'Download PDF'}
                 </button>
              ) : (
                 <a 
                   href={exportResult.url} 
                   download={exportResult.filename}
                   className="btn btn--accent btn--sm"
                   onClick={() => setExportResult(null)}
                 >
                   Save File ⬇
                 </a>
              )}
            </div>

            <div className={styles.toolbarGroup} style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-2)' }}>
              <button className={styles.iconBtn} onClick={() => setCurrentPage(p=>Math.max(p-1, 1))} disabled={currentPage <= 1}>◀</button>
              <span className={styles.pageLabel}>{currentPage} / {numPages}</span>
              <button className={styles.iconBtn} onClick={() => setCurrentPage(p=>Math.min(p+1, numPages))} disabled={currentPage >= numPages}>▶</button>
            </div>
            
            <div className={styles.toolbarGroup} style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-2)' }}>
              <button className={styles.iconBtn} onClick={() => setScale(s=>Math.max(s-0.25, 0.5))} disabled={scale <= 0.5}>−</button>
              <span className={styles.zoomLabel}>{Math.round(scale * 100)}%</span>
              <button className={styles.iconBtn} onClick={() => setScale(s=>Math.min(s+0.25, 2.0))} disabled={scale >= 2.0}>+</button>
            </div>
          </div>
          
          <div className={styles.editorBody}>
            <div className={styles.thumbnailsSidebar}>
              {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                <div key={pageNum} className={styles.thumbnailWrapper} data-active={currentPage === pageNum} onClick={() => setCurrentPage(pageNum)}>
                  <div className={styles.thumbnailImage} style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
                  <span className={styles.thumbnailLabel}>Page {pageNum}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.mainViewer}>
              <div className={styles.pageContainer} style={{ width: `${pageDimensions.width * scale}px`, height: `${pageDimensions.height * scale}px` }}>
                <canvas ref={canvasRef} className={styles.pageCanvas}></canvas>
                
                {/* INTERACTIVE OVERLAY */}
                <div 
                  ref={overlayRef}
                  className={styles.overlay}
                  onPointerDown={handleOverlayPointerDown}
                  onPointerMove={handleOverlayPointerMove}
                  onPointerUp={handleOverlayPointerUp}
                  style={{
                    width: '100%', height: '100%',
                    touchAction: activeTool !== 'select' ? 'none' : 'auto',
                    cursor: activeTool === 'select' ? 'default' : 'crosshair'
                  }}
                >
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {pageAnns.map(ann => {
                      const isSelected = selectedId === ann.id;
                      const isDragging = dragState && dragState.id === ann.id;
                      const dx = isDragging ? dragState.currentX - dragState.startX : 0;
                      const dy = isDragging ? dragState.currentY - dragState.startY : 0;
                      
                      const filter = isSelected ? 'drop-shadow(0 0 2px var(--color-primary))' : 'none';
                      const cursor = activeTool === 'select' ? 'move' : 'crosshair';

                      if (ann.type === 'line') {
                        return (
                          <line key={ann.id} x1={(ann.x + dx) * scale} y1={(ann.y + dy) * scale} x2={(ann.x2 + dx) * scale} y2={(ann.y2 + dy) * scale}
                            stroke={ann.color} strokeWidth={ann.borderWidth * scale} pointerEvents="visiblePainted"
                            onPointerDown={(e) => handleAnnPointerDown(e, ann)} onPointerMove={handleAnnPointerMove} onPointerUp={(e) => handleAnnPointerUp(e, ann)}
                            style={{ cursor, filter }}
                          />
                        );
                      }
                      if (ann.type === 'freehand') {
                        const d = ann.path.map((p, i) => `${i===0?'M':'L'} ${(p.x+dx)*scale} ${(p.y+dy)*scale}`).join(' ');
                        return (
                          <path key={ann.id} d={d} fill="none" stroke={ann.color} strokeWidth={ann.borderWidth * scale} strokeLinecap="round" strokeLinejoin="round"
                            pointerEvents="visiblePainted"
                            onPointerDown={(e) => handleAnnPointerDown(e, ann)} onPointerMove={handleAnnPointerMove} onPointerUp={(e) => handleAnnPointerUp(e, ann)}
                            style={{ cursor, filter }}
                          />
                        );
                      }
                      return null;
                    })}
                    
                    {/* Live Drawing Preview */}
                    {currentPath && currentPath.type === 'line' && (
                      <line x1={currentPath.x * scale} y1={currentPath.y * scale} x2={currentPath.x2 * scale} y2={currentPath.y2 * scale} stroke={currentPath.color} strokeWidth={currentPath.borderWidth * scale} />
                    )}
                    {currentPath && currentPath.type === 'freehand' && (
                      <path d={currentPath.path.map((p, i) => `${i===0?'M':'L'} ${p.x*scale} ${p.y*scale}`).join(' ')} fill="none" stroke={currentPath.color} strokeWidth={currentPath.borderWidth * scale} strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>

                  {pageAnns.map(ann => {
                    const isSelected = selectedId === ann.id;
                    const isDragging = dragState && dragState.id === ann.id;
                    const dx = isDragging ? dragState.currentX - dragState.startX : 0;
                    const dy = isDragging ? dragState.currentY - dragState.startY : 0;
                    const finalX = (ann.x + dx) * scale;
                    const finalY = (ann.y + dy) * scale;
                    const cursor = activeTool === 'select' ? 'move' : 'crosshair';
                    const outline = isSelected ? '2px dashed var(--color-primary)' : 'none';

                    if (ann.type === 'text') {
                      if (editingTextId === ann.id) {
                        return (
                          <textarea
                            key={`edit-${ann.id}`}
                            autoFocus
                            defaultValue={ann.text}
                            onBlur={(e) => {
                              if (e.target.value !== ann.text) {
                                commitAction(annotations.map(a => a.id === ann.id ? { ...a, text: e.target.value } : a));
                              }
                              setEditingTextId(null);
                            }}
                            onPointerDown={e => e.stopPropagation()} // Let user click inside textarea
                            style={{
                              position: 'absolute', left: finalX, top: finalY,
                              fontSize: `${ann.fontSize * scale}px`, color: ann.color,
                              background: 'transparent', border: '1px dashed var(--color-primary)', outline: 'none', resize: 'none',
                              whiteSpace: 'pre', fontFamily: 'sans-serif', zIndex: 10, minWidth: '100px', overflow: 'hidden'
                            }}
                          />
                        );
                      }
                      return (
                        <div key={ann.id}
                          onPointerDown={(e) => handleAnnPointerDown(e, ann)} onPointerMove={handleAnnPointerMove} onPointerUp={(e) => handleAnnPointerUp(e, ann)}
                          onDoubleClick={() => { if(activeTool === 'select') setEditingTextId(ann.id); }}
                          style={{
                            position: 'absolute', left: finalX, top: finalY,
                            fontSize: `${ann.fontSize * scale}px`, color: ann.color,
                            whiteSpace: 'pre', fontFamily: 'sans-serif', userSelect: 'none',
                            outline, cursor, touchAction: 'none'
                          }}>
                          {ann.text}
                        </div>
                      );
                    }
                    if (ann.type === 'rectangle') {
                      return (
                        <div key={ann.id}
                          onPointerDown={(e) => handleAnnPointerDown(e, ann)} onPointerMove={handleAnnPointerMove} onPointerUp={(e) => handleAnnPointerUp(e, ann)}
                          style={{
                            position: 'absolute', left: finalX, top: finalY,
                            width: `${ann.width * scale}px`, height: `${ann.height * scale}px`,
                            border: `${ann.borderWidth * scale}px solid ${ann.color}`, background: 'transparent',
                            outline, cursor, touchAction: 'none'
                          }}
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Live Rectangle Preview */}
                  {currentPath && currentPath.type === 'rectangle' && (
                    <div style={{
                      position: 'absolute',
                      left: (currentPath.width < 0 ? currentPath.x + currentPath.width : currentPath.x) * scale,
                      top: (currentPath.height < 0 ? currentPath.y + currentPath.height : currentPath.y) * scale,
                      width: Math.abs(currentPath.width) * scale, height: Math.abs(currentPath.height) * scale,
                      border: `${currentPath.borderWidth * scale}px solid ${currentPath.color}`, pointerEvents: 'none'
                    }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
