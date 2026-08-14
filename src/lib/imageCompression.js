/**
 * Shared utility for strictly bounded client-side image compression.
 * Ensures the output Blob is mathematically <= maxBytes using a combination
 * of JPEG quality binary search and progressive dimension reduction.
 * 
 * @param {File|Blob} file - The original image file
 * @param {number} targetKB - The strict maximum size in KB
 * @returns {Promise<Blob>} - The compressed image as a JPEG Blob
 */
export async function compressImageStrict(file, targetKB) {
  const maxBytes = targetKB * 1024;
  const img = await createImageBitmap(file);
  const width = img.width;
  const height = img.height;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const getBlob = (w, h, q) => {
    canvas.width = w;
    canvas.height = h;
    // Always clear and fill white to safely handle transparent PNGs
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', q);
    });
  };

  let bestBlob = null;
  let scale = 1.0;
  
  // Outer loop: dimension reduction
  for (let attempt = 0; attempt < 6; attempt++) {
    const curW = Math.max(1, Math.floor(width * scale));
    const curH = Math.max(1, Math.floor(height * scale));
    
    let low = 0.05;
    let high = 1.0;
    let q = 0.8;
    
    // Inner loop: JPEG quality binary search
    for (let i = 0; i < 7; i++) {
      const blob = await getBlob(curW, curH, q);
      if (blob.size <= maxBytes) {
        // Valid blob found, keep track of the largest valid one
        if (!bestBlob || blob.size > bestBlob.size || bestBlob.size > maxBytes) {
          bestBlob = blob;
          // Store dimension metadata on the blob for convenience
          bestBlob.width = curW;
          bestBlob.height = curH;
        }
        low = q; // Try higher quality
      } else {
        high = q; // Try lower quality
      }
      q = (low + high) / 2;
    }
    
    // If we found a good blob that is reasonably large (> 60% of target) 
    // or we're running out of attempts, stop reducing dimensions.
    if (bestBlob && bestBlob.size <= maxBytes) {
      if (bestBlob.size > maxBytes * 0.6 || attempt >= 3) {
        break;
      }
    }
    
    scale *= 0.75; // Reduce dimensions by 25% and retry
  }
  
  if (!bestBlob || bestBlob.size > maxBytes) {
    throw new Error(`इमेज को ${targetKB}KB से कम नहीं किया जा सका। कृपया छोटी फाइल चुनें या लक्ष्य बढ़ाएं।`);
  }
  
  return bestBlob;
}
