/**
 * SLabs AI PDF — Tool Registry
 * Central data file for all tool definitions.
 * Each tool entry drives routing, metadata, category pages, sitemaps, and internal links.
 */

export const TOOL_STATUS = {
  COMING_SOON: 'coming-soon',
  BETA: 'beta',
  LIVE: 'live',
};

/** @type {ToolDefinition[]} */
export const tools = [
  // ─── PDF Tools ─────────────────────────────────────────────────────────────
  {
    slug: 'merge-pdf',
    titleEn: 'Merge PDF',
    titleHi: 'PDF मर्ज करें',
    descriptionEn: 'Combine multiple PDF files into a single document easily.',
    descriptionHi: 'कई PDF फाइलों को आसानी से एक दस्तावेज़ में मिलाएं।',
    category: 'pdf-tools',
    icon: 'merge',
    status: TOOL_STATUS.LIVE,
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'PDF जोड़ें'],
    relatedTools: ['split-pdf', 'compress-pdf', 'jpg-to-pdf'],
  },
  {
    slug: 'split-pdf',
    titleEn: 'Split PDF',
    titleHi: 'PDF स्प्लिट करें',
    descriptionEn: 'Extract specific pages or page ranges from your PDF securely in the browser.',
    descriptionHi: 'अपनी PDF फाइल से विशिष्ट पेजों को निकालकर सुरक्षित रूप से एक नया दस्तावेज़ बनाएं।',
    category: 'pdf-tools',
    icon: 'split',
    status: TOOL_STATUS.LIVE,
    keywords: ['split pdf', 'extract pages', 'separate pdf', 'PDF पेज निकालें'],
    relatedTools: ['merge-pdf', 'compress-pdf', 'jpg-to-pdf'],
  },
  {
    slug: 'compress-pdf',
    titleEn: 'Compress PDF',
    titleHi: 'PDF छोटा करें',
    descriptionEn: 'Reduce the file size of your PDF documents quickly and securely without uploading.',
    descriptionHi: 'बिना अपलोड किए अपने PDF दस्तावेज़ का आकार सुरक्षित रूप से कम करें।',
    category: 'pdf-tools',
    icon: 'compress',
    status: TOOL_STATUS.LIVE,
    keywords: ['compress pdf', 'reduce pdf size', 'pdf size reducer', 'PDF छोटा करें'],
    relatedTools: ['merge-pdf', 'split-pdf', 'jpg-to-pdf'],
  },
  {
    slug: 'pdf-to-word',
    titleEn: 'PDF to Word',
    titleHi: 'PDF को Word में बदलें',
    descriptionEn: 'Convert PDF documents to editable Word files (DOCX). Preserve formatting.',
    descriptionHi: 'PDF दस्तावेज़ को Word फाइल (DOCX) में बदलें। फ़ॉर्मेटिंग सुरक्षित रहती है।',
    category: 'pdf-tools',
    icon: 'pdf-to-word',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf', 'PDF को Word'],
    relatedTools: ['merge-pdf', 'pdf-editor', 'compress-pdf'],
  },
  {
    slug: 'pdf-to-jpg',
    titleEn: 'PDF to JPG',
    titleHi: 'PDF से JPG',
    descriptionEn: 'Convert PDF pages into high-quality JPG or PNG images securely.',
    descriptionHi: 'PDF पेजों को उच्च गुणवत्ता वाली JPG या PNG छवियों में सुरक्षित रूप से बदलें।',
    category: 'pdf-tools',
    icon: 'image',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf to jpg', 'pdf to image', 'pdf to png', 'convert pdf to image', 'PDF को JPG में बदलें'],
    relatedTools: ['jpg-to-pdf', 'compress-pdf', 'merge-pdf'],
  },
  {
    slug: 'jpg-to-pdf',
    titleEn: 'JPG to PDF',
    titleHi: 'JPG को PDF में बदलें',
    descriptionEn: 'Convert JPG images to PDF documents. Combine multiple images into one PDF.',
    descriptionHi: 'JPG इमेज को PDF में बदलें। कई इमेज को एक PDF में जोड़ें।',
    category: 'pdf-tools',
    icon: 'jpg-to-pdf',
    status: TOOL_STATUS.LIVE,
    keywords: ['jpg to pdf', 'image to pdf', 'jpeg to pdf', 'JPG से PDF'],
    relatedTools: ['image-to-pdf', 'pdf-to-jpg', 'merge-pdf'],
  },
  {
    slug: 'image-to-pdf',
    titleEn: 'Image to PDF',
    titleHi: 'इमेज को PDF बनाएं',
    descriptionEn: 'Convert PNG, JPG, WebP images to PDF. Supports multiple images in one document.',
    descriptionHi: 'PNG, JPG, WebP इमेज को PDF में बदलें। कई इमेज एक दस्तावेज़ में।',
    category: 'pdf-tools',
    icon: 'image-to-pdf',
    status: TOOL_STATUS.LIVE,
    keywords: ['image to pdf', 'png to pdf', 'photo to pdf', 'इमेज से PDF'],
    relatedTools: ['jpg-to-pdf', 'pdf-to-jpg', 'compress-pdf'],
  },
  {
    slug: 'pdf-editor',
    titleEn: 'PDF Editor',
    titleHi: 'PDF एडिटर',
    descriptionEn: 'Edit text, add annotations, and modify PDF files directly in your browser.',
    descriptionHi: 'PDF में टेक्स्ट संपादित करें, एनोटेशन जोड़ें, सीधे ब्राउज़र में।',
    category: 'pdf-tools',
    icon: 'edit',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf editor', 'edit pdf online', 'pdf annotation', 'PDF संपादन'],
    relatedTools: ['merge-pdf', 'rotate-pdf', 'watermark-pdf'],
  },
  {
    slug: 'rotate-pdf',
    titleEn: 'Rotate PDF',
    titleHi: 'PDF घुमाएँ',
    descriptionEn: 'Rotate PDF pages securely in your browser. Select specific pages or rotate all.',
    descriptionHi: 'PDF पेजों को सुरक्षित रूप से घुमाएँ। सभी या कुछ चुने हुए पेजों का एंगल बदलें।',
    category: 'pdf-tools',
    icon: 'rotate',
    status: TOOL_STATUS.LIVE,
    keywords: ['rotate pdf', 'turn pdf pages', 'rotate pdf online', 'PDF घुमाएँ'],
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf'],
  },
  {
    slug: 'protect-pdf',
    titleEn: 'Protect PDF',
    titleHi: 'PDF सुरक्षित करें',
    descriptionEn: 'Add password protection to your PDF files. Prevent unauthorized access.',
    descriptionHi: 'PDF फाइल में पासवर्ड लगाएं। अनधिकृत पहुंच रोकें।',
    category: 'pdf-tools',
    icon: 'lock',
    status: TOOL_STATUS.COMING_SOON,
    keywords: ['protect pdf', 'pdf password', 'encrypt pdf', 'PDF सुरक्षा'],
    relatedTools: ['unlock-pdf', 'watermark-pdf', 'pdf-editor'],
  },
  {
    slug: 'unlock-pdf',
    titleEn: 'Unlock PDF',
    titleHi: 'PDF अनलॉक करें',
    descriptionEn: 'Remove password protection from PDF files you own. Free and instant.',
    descriptionHi: 'अपनी PDF फाइल से पासवर्ड हटाएं। मुफ़्त और तत्काल।',
    category: 'pdf-tools',
    icon: 'unlock',
    status: TOOL_STATUS.COMING_SOON,
    keywords: ['unlock pdf', 'remove pdf password', 'pdf unlocker', 'PDF पासवर्ड हटाना'],
    relatedTools: ['protect-pdf', 'pdf-editor', 'compress-pdf'],
  },
  {
    slug: 'watermark-pdf',
    titleEn: 'Watermark PDF',
    titleHi: 'PDF में Watermark जोड़ें',
    descriptionEn: 'Easily add Confidential, Draft, Sample or custom watermarks to any PDF directly in your browser.',
    descriptionHi: 'किसी भी PDF में Confidential, Draft, Sample या अपना Custom Watermark आसानी से जोड़ें।',
    category: 'pdf-tools',
    icon: 'text',
    status: TOOL_STATUS.LIVE,
    keywords: ['watermark pdf', 'add watermark to pdf', 'PDF में watermark लगाएं'],
    relatedTools: ['merge-pdf', 'split-pdf', 'protect-pdf'],
  },
  {
    slug: 'add-page-numbers',
    titleEn: 'Add Page Numbers',
    titleHi: 'पेज नंबर डालें',
    descriptionEn: 'Add page numbers to PDF documents easily.',
    descriptionHi: 'PDF दस्तावेज़ों में आसानी से पेज नंबर डालें।',
    category: 'pdf-tools',
    icon: 'number',
    status: TOOL_STATUS.LIVE,
    keywords: ['add page numbers', 'pdf numbers', 'PDF पेज नंबर'],
    relatedTools: ['watermark-pdf', 'pdf-editor'],
  },
  {
    slug: 'extract-pdf-pages',
    titleEn: 'Extract PDF Pages',
    titleHi: 'PDF पेज निकालें',
    descriptionEn: 'Extract specific pages from a PDF and save them as a new document.',
    descriptionHi: 'PDF से विशेष पेज निकालकर नया दस्तावेज़ बनाएं।',
    category: 'pdf-tools',
    icon: 'extract',
    status: TOOL_STATUS.COMING_SOON,
    keywords: ['extract pdf pages', 'pdf page extractor', 'PDF पेज निकालना'],
    relatedTools: ['split-pdf', 'merge-pdf', 'rotate-pdf'],
  },

  // ─── Image / Form / Exact-Size Tools ─────────────────────────────────────────
  {
    slug: 'image-compressor',
    titleEn: 'Image Compressor',
    titleHi: 'इमेज कंप्रेसर',
    descriptionEn: 'Compress images to reduce file size while controlling quality and dimensions.',
    descriptionHi: 'क्वालिटी और आकार को नियंत्रित करते हुए इमेज का साइज कम करें।',
    category: 'form-tools',
    icon: 'image',
    status: TOOL_STATUS.LIVE,
    keywords: ['image compressor', 'compress image', 'reduce image size', 'इमेज कंप्रेसर'],
    relatedTools: ['resize-image', 'photo-50kb', 'jpg-to-pdf'],
  },
  {
    slug: 'resize-image',
    titleEn: 'Image Resizer',
    titleHi: 'इमेज रिसाइज़र',
    descriptionEn: 'Resize image dimensions by percentage or exact pixels safely and securely.',
    descriptionHi: 'इमेज को प्रतिशत या पिक्सेल में रिसाइज़ करें।',
    category: 'form-tools',
    icon: 'image',
    status: TOOL_STATUS.LIVE,
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'इमेज रिसाइज़र'],
    relatedTools: ['image-compressor', 'photo-50kb', 'jpg-to-pdf', 'crop-image'],
  },
  {
    slug: 'crop-image',
    titleEn: 'Image Cropper',
    titleHi: 'इमेज क्रॉपर',
    descriptionEn: 'Crop an image to the selected area and download the result safely.',
    descriptionHi: 'अपनी इमेज को मनचाहे आकार में क्रॉप (काट) कर डाउनलोड करें।',
    category: 'form-tools',
    icon: 'crop',
    status: TOOL_STATUS.LIVE,
    keywords: ['image cropper', 'crop photo', 'cut image', 'इमेज क्रॉपर', 'फोटो क्रॉप'],
    relatedTools: ['resize-image', 'image-compressor', 'photo-50kb'],
  },
  {
    slug: 'photo-20kb',
    titleEn: 'Compress Photo to 20KB',
    titleHi: 'फोटो 20KB करें',
    descriptionEn: 'Compress your passport or form photo to exactly under 20KB for government form uploads.',
    descriptionHi: 'सरकारी फॉर्म अपलोड के लिए पासपोर्ट या फॉर्म फोटो को 20KB से कम करें।',
    category: 'form-tools',
    icon: 'photo-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['photo 20kb', 'compress photo 20kb', 'passport photo size', 'फोटो 20KB'],
    relatedTools: ['photo-50kb', 'signature-20kb', 'photo-100kb'],
  },
  {
    slug: 'photo-50kb',
    titleEn: 'Compress Photo to 50KB',
    titleHi: 'फोटो 50KB करें',
    descriptionEn: 'Resize and compress photo to exactly 50KB. Perfect for exam and job applications.',
    descriptionHi: 'फोटो को 50KB में संपीड़ित करें। परीक्षा और नौकरी आवेदन के लिए उपयुक्त।',
    category: 'form-tools',
    icon: 'photo-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['photo 50kb', 'compress image 50kb', 'exam photo size', 'फोटो 50KB'],
    relatedTools: ['photo-20kb', 'photo-100kb', 'signature-20kb'],
  },
  {
    slug: 'photo-100kb',
    titleEn: 'Compress Photo to 100KB',
    titleHi: 'फोटो 100KB करें',
    descriptionEn: 'Compress photo to under 100KB without losing quality. For registration forms.',
    descriptionHi: 'फोटो को 100KB से कम करें बिना गुणवत्ता खोए। पंजीकरण फॉर्म के लिए।',
    category: 'form-tools',
    icon: 'photo-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['photo 100kb', 'compress photo 100kb', 'registration photo', 'फोटो 100KB'],
    relatedTools: ['photo-50kb', 'photo-200kb', 'photo-20kb'],
  },
  {
    slug: 'photo-200kb',
    titleEn: 'Compress Photo to 200KB',
    titleHi: 'फोटो 200KB करें',
    descriptionEn: 'Resize photo to under 200KB. Suitable for college and university portals.',
    descriptionHi: 'फोटो को 200KB से कम करें। कॉलेज और विश्वविद्यालय पोर्टल के लिए।',
    category: 'form-tools',
    icon: 'photo-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['photo 200kb', 'compress photo 200kb', 'college portal photo', 'फोटो 200KB'],
    relatedTools: ['photo-100kb', 'pdf-200kb', 'photo-50kb'],
  },
  {
    slug: 'signature-20kb',
    titleEn: 'Compress Signature to 20KB',
    titleHi: 'हस्ताक्षर 20KB करें',
    descriptionEn: 'Compress your signature image to under 20KB for online form submissions.',
    descriptionHi: 'ऑनलाइन फॉर्म के लिए हस्ताक्षर इमेज को 20KB से कम करें।',
    category: 'form-tools',
    icon: 'signature',
    status: TOOL_STATUS.LIVE,
    keywords: ['signature 20kb', 'compress signature', 'online form signature', 'हस्ताक्षर 20KB'],
    relatedTools: ['photo-20kb', 'photo-50kb', 'pdf-100kb'],
  },
  {
    slug: 'pdf-100kb',
    titleEn: 'Compress PDF to 100KB',
    titleHi: 'PDF 100KB करें',
    descriptionEn: 'Reduce PDF file size to under 100KB for online form uploads and portals.',
    descriptionHi: 'ऑनलाइन फॉर्म अपलोड के लिए PDF को 100KB से कम करें।',
    category: 'form-tools',
    icon: 'pdf-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf 100kb', 'compress pdf 100kb', 'PDF 100KB'],
    relatedTools: ['pdf-200kb', 'pdf-500kb', 'compress-pdf'],
  },
  {
    slug: 'pdf-200kb',
    titleEn: 'Compress PDF to 200KB',
    titleHi: 'PDF 200KB करें',
    descriptionEn: 'Reduce your PDF to under 200KB. Suitable for most government portal uploads.',
    descriptionHi: 'PDF को 200KB से कम करें। अधिकांश सरकारी पोर्टल अपलोड के लिए उपयुक्त।',
    category: 'form-tools',
    icon: 'pdf-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf 200kb', 'compress pdf 200kb', 'PDF 200KB'],
    relatedTools: ['pdf-100kb', 'pdf-500kb', 'compress-pdf'],
  },
  {
    slug: 'pdf-500kb',
    titleEn: 'Compress PDF to 500KB',
    titleHi: 'PDF 500KB करें',
    descriptionEn: 'Compress PDF to 500KB or less. Works for most university and exam portal submissions.',
    descriptionHi: 'PDF को 500KB या कम करें। विश्वविद्यालय और परीक्षा पोर्टल के लिए।',
    category: 'form-tools',
    icon: 'pdf-size',
    status: TOOL_STATUS.LIVE,
    keywords: ['pdf 500kb', 'compress pdf 500kb', 'PDF 500KB'],
    relatedTools: ['pdf-200kb', 'pdf-1mb', 'compress-pdf'],
  },
  {
    slug: 'pdf-1mb',
    titleEn: 'Compress PDF to 1MB',
    titleHi: 'PDF 1MB करें',
    descriptionEn: 'Reduce your PDF file to under 1MB. Simple and quick, no signup required.',
    descriptionHi: 'PDF को 1MB से कम करें। सरल और तेज़, साइन-अप की जरूरत नहीं।',
    category: 'form-tools',
    icon: 'pdf-size',
    status: TOOL_STATUS.COMING_SOON,
    keywords: ['pdf 1mb', 'compress pdf 1mb', 'PDF 1MB'],
    relatedTools: ['pdf-500kb', 'pdf-200kb', 'compress-pdf'],
  },
  // ─── Calculators ───────────────────────────────────────────────────────────
  {
    slug: 'gst-calculator',
    titleEn: 'GST Calculator',
    titleHi: 'GST कैलकुलेटर',
    descriptionEn: 'Free GST Calculator for India. Calculate GST-inclusive and exclusive prices with CGST, SGST and IGST instantly.',
    descriptionHi: 'भारत में GST की गणना आसानी से करें। CGST, SGST और IGST के साथ मूल्य निकालें।',
    category: 'calculators',
    icon: 'calculator',
    status: TOOL_STATUS.LIVE,
    keywords: ['gst calculator', 'gst calculator india', 'gst calculation', 'gst calculator online', 'gst calculator with cgst sgst', 'gst calculator with igst', 'gst inclusive calculator', 'gst exclusive calculator', 'calculate gst', 'gst percentage calculator', 'gst calculator hindi', 'gst कैसे calculate करें', 'gst calculation कैसे करें', '18 gst calculator', 'gst सहित कीमत', 'gst हटाकर कीमत'],
    relatedTools: ['emi-calculator', 'age-calculator'],
  },
  {
    slug: 'emi-calculator',
    titleEn: 'EMI Calculator',
    titleHi: 'EMI कैलकुलेटर',
    descriptionEn: 'Free EMI Calculator for India. Calculate monthly loan EMI, total interest and total payment for home, car, personal and other loans.',
    descriptionHi: 'भारत के लिए मुफ़्त EMI कैलकुलेटर। होम, कार, पर्सनल और अन्य लोन के लिए मासिक EMI, कुल ब्याज और कुल भुगतान की गणना करें।',
    category: 'calculators',
    icon: 'calculator',
    status: TOOL_STATUS.LIVE,
    keywords: ['emi calculator', 'emi calculator india', 'loan emi calculator', 'home loan emi calculator', 'car loan emi calculator', 'personal loan emi calculator', 'monthly emi calculator', 'loan calculator', 'emi interest calculator', 'emi calculator hindi', 'emi कैसे calculate करें', 'loan emi कैसे calculate करें'],
    relatedTools: ['gst-calculator', 'age-calculator'],
  },
  {
    slug: 'age-calculator',
    titleEn: 'Age Calculator (उम्र कैलकुलेटर) – Exact Age in Years, Months, Days',
    titleHi: 'उम्र कैलकुलेटर',
    descriptionEn: 'Free Age Calculator to calculate your exact age in years, months and days from your date of birth. Also find total days and your next birthday.',
    descriptionHi: 'अपनी जन्मतिथि से वर्षों, महीनों और दिनों में सटीक उम्र की गणना करें। अगले जन्मदिन और कुल दिनों की जानकारी भी पाएं।',
    category: 'calculators',
    icon: 'calculator',
    status: TOOL_STATUS.LIVE,
    keywords: ['age calculator', 'age calculator india', 'calculate age', 'age from date of birth', 'dob calculator', 'date of birth calculator', 'exact age calculator', 'age calculator online', 'how old am i', 'age in years months days', 'birthday calculator', 'age calculator hindi', 'age कैसे calculate करें', 'जन्म तारीख से उम्र निकालें', 'उम्र कैलकुलेटर', 'जन्म तिथि कैलकुलेटर'],
    relatedTools: ['gst-calculator', 'emi-calculator'],
  },
  {
    slug: 'percentage-calculator',
    titleEn: 'Percentage Calculator (प्रतिशत कैलकुलेटर) – Marks, Increase & Decrease',
    titleHi: 'प्रतिशत कैलकुलेटर',
    descriptionEn: 'Free Percentage Calculator to calculate percentages, percentage increase, decrease, differences and marks percentage quickly and easily.',
    descriptionHi: 'प्रतिशत, प्रतिशत वृद्धि, कमी, अंतर और परीक्षा के अंकों का प्रतिशत जल्दी और आसानी से निकालने के लिए मुफ्त ऑनलाइन कैलकुलेटर।',
    category: 'calculators',
    icon: 'calculator',
    status: TOOL_STATUS.LIVE,
    keywords: ['percentage calculator', 'percentage calculator online', 'percentage calculator india', 'calculate percentage', 'percentage calculation', 'percent calculator', 'percentage increase calculator', 'percentage decrease calculator', 'percentage difference calculator', 'what percentage is x of y', 'x percent of y', 'percentage calculator for marks', 'marks percentage calculator', 'exam percentage calculator', 'percentage calculator hindi', 'प्रतिशत कैलकुलेटर', 'प्रतिशत कैसे निकालें', 'marks percentage कैसे calculate करें'],
        relatedTools: ['gst-calculator', 'emi-calculator', 'age-calculator'],
  },
  {
    slug: 'sip-calculator',
    titleEn: 'SIP Calculator',
    titleHi: 'SIP कैलकुलेटर',
    descriptionEn: 'Free SIP Calculator to estimate your total investment, expected returns and maturity value from monthly SIP investments.',
    descriptionHi: 'SIP (Systematic Investment Plan) से जुड़े निवेश, अनुमानित रिटर्न और मैच्योरिटी वैल्यू की गणना करने के लिए मुफ़्त SIP कैलकुलेटर।',
    category: 'calculators',
    icon: 'calculator',
    status: TOOL_STATUS.LIVE,
    keywords: ['sip calculator', 'sip calculator india', 'sip calculator online', 'monthly sip calculator', 'sip returns calculator', 'sip investment calculator', 'mutual fund sip calculator', 'sip maturity calculator', 'sip return calculator', 'systematic investment plan calculator', 'sip calculator hindi', 'SIP कैलकुलेटर', 'SIP से कितना पैसा बनेगा', 'SIP return कैसे calculate करें', 'मासिक SIP कैलकुलेटर'],
    relatedTools: ['gst-calculator', 'emi-calculator', 'age-calculator', 'percentage-calculator'],
  },
];

/**
 * Get tools by category slug.
 * @param {string} categorySlug
 * @returns {ToolDefinition[]}
 */
export function getToolsByCategory(categorySlug) {
  return tools.filter((t) => t.category === categorySlug);
}

/**
 * Get a single tool by slug.
 * @param {string} slug
 * @returns {ToolDefinition|undefined}
 */
export function getToolBySlug(slug) {
  return tools.find((t) => t.slug === slug);
}

/**
 * Get related tools for a given slug.
 * @param {string} slug
 * @returns {ToolDefinition[]}
 */
export function getRelatedTools(slug) {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedTools
    .map((s) => getToolBySlug(s))
    .filter(Boolean);
}

/**
 * Get all tool slugs (for static route generation).
 * @returns {string[]}
 */
export function getAllToolSlugs() {
  return tools.map((t) => t.slug);
}
