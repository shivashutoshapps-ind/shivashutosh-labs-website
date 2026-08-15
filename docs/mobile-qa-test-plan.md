# Shivashutosh Labs Mobile QA Test Plan

## Overview
This artifact serves as the master manual QA plan for verifying mobile responsiveness and touch-target usability across the Shivashutosh Labs website.

## Step 1: Tool Inventory
Total LIVE tools: **21**

| Route | Tool Name | Category | Status | Primary Action |
|-------|-----------|----------|--------|----------------|
| /merge-pdf | Merge PDF | pdf-tools | LIVE | Upload, Reorder, Merge |
| /split-pdf | Split PDF | pdf-tools | LIVE | Upload, Select Pages, Split |
| /compress-pdf | Compress PDF | pdf-tools | LIVE | Upload, Compress |
| /pdf-to-jpg | PDF to JPG | pdf-tools | LIVE | Upload, Convert |
| /jpg-to-pdf | JPG to PDF | pdf-tools | LIVE | Upload, Convert |
| /image-to-pdf | Image to PDF | pdf-tools | LIVE | Upload, Reorder, Convert |
| /pdf-editor | PDF Editor | pdf-tools | LIVE | Upload, Annotate, Export |
| /rotate-pdf | Rotate PDF | pdf-tools | LIVE | Upload, Rotate, Export |
| /watermark-pdf | Watermark PDF | pdf-tools | LIVE | Upload, Add Text, Export |
| /add-page-numbers | Add Page Numbers | pdf-tools | LIVE | Upload, Configure, Export |
| /image-compressor | Image Compressor | form-tools | LIVE | Upload, Tune, Compress |
| /resize-image | Image Resizer | form-tools | LIVE | Upload, Configure, Resize |
| /crop-image | Image Cropper | form-tools | LIVE | Upload, Crop, Export |
| /photo-20kb | Compress Photo to 20KB | form-tools | LIVE | Upload, Compress |
| /photo-50kb | Compress Photo to 50KB | form-tools | LIVE | Upload, Compress |
| /photo-100kb | Compress Photo to 100KB | form-tools | LIVE | Upload, Compress |
| /photo-200kb | Compress Photo to 200KB | form-tools | LIVE | Upload, Compress |
| /signature-20kb | Compress Signature to 20KB | form-tools | LIVE | Upload, Compress |
| /pdf-100kb | Compress PDF to 100KB | form-tools | LIVE | Upload, Compress |
| /pdf-200kb | Compress PDF to 200KB | form-tools | LIVE | Upload, Compress |
| /pdf-500kb | Compress PDF to 500KB | form-tools | LIVE | Upload, Compress |

*(Note: COMING_SOON tools like /protect-pdf, /unlock-pdf, /extract-pdf-pages, /pdf-to-word, and /pdf-1mb are excluded from this manual test plan until they are LIVE.)*

## Step 2: Mobile Viewport Matrix
Test across the following viewports (using browser devtools or real devices):
- **Small mobile:** 320 × 568 (e.g., iPhone SE / old Androids)
- **Common Android:** 360 × 800 (Portrait & Landscape)
- **Larger Android:** 412 × 915
- **iPhone-style:** 390 × 844

## Step 3: Global Responsiveness Tests
For each viewport, verify:
1. [ ] Page loads without horizontal overflow.
2. [ ] Header remains usable.
3. [ ] Logo/branding remains visible.
4. [ ] Navigation is accessible.
5. [ ] Mobile menu (hamburger), if present, works.
6. [ ] Main content fits viewport.
7. [ ] Tool cards do not overflow.
8. [ ] Buttons remain visible.
9. [ ] Inputs remain visible when the keyboard opens.
10. [ ] Footer remains usable.
11. [ ] Dark mode works (if supported).
12. [ ] Light mode works.
13. [ ] Hindi text does not overflow.
14. [ ] English text does not overflow.
15. [ ] Mixed Hindi + English labels remain readable.
16. [ ] Long filenames do not break layout.
17. [ ] Error messages remain visible.
18. [ ] Success messages remain visible.
19. [ ] Loading/progress states remain usable.
20. [ ] Download controls remain accessible.

## Step 4: Touch Target QA
For every interactive control, manually verify dimensions against the minimum 44×44 CSS pixel guideline:
- [ ] Buttons (Submit, Download, Cancel)
- [ ] Icon buttons (Delete, Add, Zoom)
- [ ] Navigation items
- [ ] Form controls (Radios, Checkboxes, Selects, Sliders)
- [ ] PDF editor & Image crop controls
*Record actual observed dimensions. Classify as PASS (>= 44px), WARN (< 44px but secondary/acceptable), or FAIL (< 44px and causes misclicks).*

## Step 5: Tool-Specific Tests (To be executed per tool)
| Route | Test Coverage | Status (PASS/WARN/FAIL) | Notes |
|-------|--------------|-------------------------|-------|
| /merge-pdf | Upload, Reorder (touch drag), Merge, Download, Error handling, Horizontal overflow | | |
| /split-pdf | Upload, Select Pages (checkbox/range), Split, Download | | |
| /compress-pdf| Upload, Select preset, Compress, Download | | |
| /pdf-to-jpg | Upload, Convert, Download | | |
| /jpg-to-pdf | Upload, Convert, Download | | |
| /image-to-pdf| Upload, Reorder images, Convert, Download | | |
| /pdf-editor | Upload, Annotate, Zoom, Pan, Export, Touch conflicts | | |
| /rotate-pdf | Upload, Select pages, Rotate, Export | | |
| /watermark-pdf| Upload, Configure text/position, Export | | |
| /add-page-numbers| Upload, Configure position/format, Export | | |
| /image-compressor| Upload, Tune settings, Compress, Download | | |
| /resize-image| Upload, Configure dimensions, Resize, Download | | |
| /crop-image | Upload, Drag crop handles, Aspect ratio, Crop, Download | | |
| /photo-20kb | Upload, Process, Download | | |
| /photo-50kb | Upload, Process, Download | | |
| /photo-100kb| Upload, Process, Download | | |
| /photo-200kb| Upload, Process, Download | | |
| /signature-20kb| Upload, Process, Download | | |
| /pdf-100kb | Upload, Process, Download | | |
| /pdf-200kb | Upload, Process, Download | | |
| /pdf-500kb | Upload, Process, Download | | |

## Step 6: File Input Testing
- [ ] Tap upload (Primary mobile flow)
- [ ] Android file picker / Image picker
- [ ] Multiple file selection (where supported)
- [ ] Invalid file type rejection
- [ ] Large file handling
- [ ] Filename with spaces and Hindi characters
- [ ] Remove selected file
- [ ] Re-select another file

## Step 7: PDF Editor Mobile Testing (/pdf-editor)
- [ ] PDF upload & page rendering
- [ ] Page navigation & viewport scrolling
- [ ] Zoom interaction
- [ ] Annotation selection (Text, Rectangle, Line, Freehand)
- [ ] Delete annotation, Undo, Redo
- [ ] Export & Download
- [ ] Touch conflicts (Verify drawing doesn't accidentally scroll page)

## Step 8: Image Tool Mobile Testing (/crop-image, /resize-image, etc.)
- [ ] Camera/photo picker support
- [ ] Image preview visibility
- [ ] Crop handles can be touched comfortably
- [ ] Crop area accessible at 320x568
- [ ] Aspect ratio controls usable
- [ ] Resize/compression controls usable
- [ ] Final action buttons remain visible

## Step 9: Keyboard & Safe-Area Testing
- [ ] Tap every text input; verify keyboard doesn't cover active input.
- [ ] Verify user can scroll to active field.
- [ ] Verify submit buttons remain reachable.
- [ ] Inspect bottom navigation/sticky controls for overlap with browser safe areas.

## Step 10: Performance/UX Observation
*Record reproducible issues only:*
- [ ] Page freezes
- [ ] Spinner never finishes
- [ ] Controls unresponsive
- [ ] Browser tab crashes on large preview

## Step 11: Test Data
- **PDF:** 1-page, Multi-page, Mixed-size pages
- **Images:** JPG, PNG, WEBP, Portrait, Landscape, Square, Large image
- **Text:** English filename, Hindi filename, Long filename

## Step 12: Defect Classification
- **P0 — Critical:** Core workflow unusable/app-breaking.
- **P1 — High:** Important mobile workflow seriously impaired.
- **P2 — Medium:** Usability/layout problem, workaround exists.
- **P3 — Low:** Minor visual/polish issue.

*Log format:* [Severity] Route - Viewport: Expected vs Actual. Steps to reproduce.

## Step 13: Final Test Checklist
- [ ] Global navigation
- [ ] Homepage
- [ ] Category pages
- [ ] Every LIVE tool (21 tools)
- [ ] Upload flow
- [ ] Processing flow
- [ ] Result flow
- [ ] Download flow
- [ ] Error handling
- [ ] Hindi UI
- [ ] English UI
- [ ] Dark mode / Light mode
- [ ] Touch targets
- [ ] Keyboard behavior
- [ ] Horizontal overflow
- [ ] PDF Editor touch interactions
- [ ] Image Cropper touch interactions
- [ ] Mobile browser safe-area behavior

## Step 14: Mobile Release Gate
**PASS only when:**
- No P0 defects.
- No unresolved P1 defects.
- No major horizontal overflow.
- Core upload → process → download workflow works on mobile.
- Primary touch controls are usable.
- Hindi and English layouts remain readable.
- PDF Editor remains usable.
- Image Cropper remains usable.