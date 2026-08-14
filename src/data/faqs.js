/**
 * SLabs AI PDF — FAQ Data
 * Organized by tool slug and by category.
 * Used to populate FAQ sections and generate FAQPage JSON-LD structured data.
 */

/**
 * Global / homepage FAQs
 */
export const homeFAQs = [
  {
    q: 'क्या SLabs AI PDF मुफ़्त है?',
    a: 'हाँ, SLabs AI PDF पर सभी बुनियादी टूल्स बिल्कुल मुफ़्त हैं। कोई छिपे हुए शुल्क नहीं।',
    qEn: 'Is SLabs AI PDF completely free?',
    aEn: 'Yes, all basic tools on SLabs AI PDF are completely free. No hidden charges.',
  },
  {
    q: 'क्या मुझे साइन अप करना होगा?',
    a: 'नहीं। अधिकांश टूल्स बिना किसी अकाउंट के उपयोग किए जा सकते हैं।',
    qEn: 'Do I need to sign up?',
    aEn: 'No. Most tools can be used without creating an account.',
  },
  {
    q: 'क्या मेरी फाइलें सुरक्षित हैं?',
    a: 'हम आपकी गोपनीयता को गंभीरता से लेते हैं। हम एक ऐसी प्रणाली बना रहे हैं जहाँ फाइलें आपके डिवाइस पर ही प्रोसेस होंगी।',
    qEn: 'Are my files safe?',
    aEn: 'We take your privacy seriously. We are building a system where files are processed on your device.',
  },
  {
    q: 'क्या मैं मोबाइल पर इन टूल्स का उपयोग कर सकता हूँ?',
    a: 'हाँ, SLabs AI PDF मोबाइल, टैबलेट और डेस्कटॉप सभी पर काम करता है।',
    qEn: 'Can I use these tools on mobile?',
    aEn: 'Yes, SLabs AI PDF works on mobile, tablet, and desktop.',
  },
  {
    q: 'क्या फाइल साइज़ की कोई सीमा है?',
    a: 'सीमाएं टूल के अनुसार भिन्न होती हैं। हम जल्द ही विस्तृत जानकारी प्रदान करेंगे।',
    qEn: 'Is there a file size limit?',
    aEn: 'Limits vary by tool. We will provide detailed information soon.',
  },
];

/**
 * Tool-specific FAQs indexed by tool slug.
 */
export const toolFAQs = {
  'merge-pdf': [
    {
      q: 'PDF जोड़ने के लिए कितनी फाइलें अपलोड कर सकते हैं?',
      a: 'आप कई PDF फाइलें एक साथ जोड़ सकते हैं। सीमाएं जल्द ही अपडेट की जाएंगी।',
      qEn: 'How many files can I merge at once?',
      aEn: 'You can merge multiple PDF files at once. Limits will be updated soon.',
    },
    {
      q: 'क्या पेज का क्रम बदला जा सकता है?',
      a: 'हाँ, जोड़ने से पहले आप फाइलों का क्रम बदल सकते हैं।',
      qEn: 'Can I rearrange the page order?',
      aEn: 'Yes, you can rearrange the order of files before merging.',
    },
  ],
  'compress-pdf': [
    {
      q: 'PDF कम्प्रेस करने के बाद गुणवत्ता कम होती है?',
      a: 'हम गुणवत्ता और फाइल साइज़ के बीच संतुलन बनाए रखते हैं। अधिकांश मामलों में गुणवत्ता स्वीकार्य रहती है।',
      qEn: 'Does compressing a PDF reduce quality?',
      aEn: 'We balance quality and file size. In most cases, quality remains acceptable.',
    },
  ],
  'jpg-to-pdf': [
    {
      q: 'क्या JPG को PDF में बदलना मुफ़्त है?',
      a: 'हाँ, SLabs AI PDF पर JPG को PDF में बदलना बिल्कुल मुफ़्त है।',
      qEn: 'Is it free to convert JPG to PDF?',
      aEn: 'Yes, converting JPG to PDF is completely free on SLabs AI PDF.',
    },
    {
      q: 'क्या मैं कई JPG को एक PDF में जोड़ सकता हूँ?',
      a: 'हाँ, आप एक साथ कई तस्वीरें अपलोड कर सकते हैं और उन्हें एक ही PDF फाइल में जोड़ सकते हैं।',
      qEn: 'Can I combine multiple JPGs into one PDF?',
      aEn: 'Yes, you can upload multiple images and combine them into a single PDF file.',
    },
    {
      q: 'क्या मेरी तस्वीरें सर्वर पर अपलोड होती हैं?',
      a: 'नहीं, आपकी तस्वीरें केवल आपके डिवाइस पर ही प्रोसेस होती हैं। हम आपकी निजता (privacy) का पूरा ध्यान रखते हैं।',
      qEn: 'Are my photos uploaded to a server?',
      aEn: 'No, your photos are processed locally on your device. We respect your privacy.',
    },
    {
      q: 'क्या मैं PDF का पेज आकार (Page Size) चुन सकता हूँ?',
      a: 'हाँ, आप A4, Letter, या Original Image Size जैसे विकल्प चुन सकते हैं।',
      qEn: 'Can I choose the PDF Page Size?',
      aEn: 'Yes, you can select options like A4, Letter, or Original Image Size.',
    },
  ],
  'compress-pdf': [
    {
      q: 'PDF का size कैसे कम करें?',
      a: 'अपना PDF चुनें और "PDF छोटा करें" बटन दबाएं। यह टूल आपकी PDF से अनावश्यक डेटा को हटाकर उसका आकार कम करने का प्रयास करेगा।',
      qEn: 'How to reduce PDF size?',
      aEn: 'Select your PDF and click the optimize button. The tool will attempt to reduce its size by removing unnecessary data.',
    },
    {
      q: 'क्या PDF compress करने के लिए file upload करनी पड़ती है?',
      a: 'नहीं, यह टूल आपके डिवाइस ब्राउज़र में ही PDF को प्रोसेस करता है। आपकी फाइल सुरक्षित रहती है और कहीं अपलोड नहीं होती।',
      qEn: 'Do I need to upload my file to compress the PDF?',
      aEn: 'No, this tool processes the PDF entirely within your device browser. Your file is secure and never uploaded.',
    },
    {
      q: 'क्या PDF compress करने से text खराब होगा?',
      a: 'बिल्कुल नहीं। यह टूल केवल PDF की संरचना (structure) को अनुकूलित करता है, जिससे आपके टेक्स्ट या डिज़ाइन की गुणवत्ता पर कोई असर नहीं पड़ता।',
      qEn: 'Will compressing the PDF degrade the text?',
      aEn: 'Not at all. This tool only optimizes the PDF structure, so the quality of your text and layout is preserved.',
    },
    {
      q: 'क्या हर PDF का size कम किया जा सकता है?',
      a: 'नहीं। यदि आपकी PDF पहले से ही अच्छी तरह से अनुकूलित (optimized) है, तो उसका आकार कम नहीं हो सकता। यह टूल केवल अतिरिक्त डेटा को हटाता है।',
      qEn: 'Can every PDF be reduced in size?',
      aEn: 'No. If your PDF is already highly optimized, its size may not decrease. This tool only removes redundant data.',
    },
    {
      q: 'Compression के बाद PDF कितना छोटा होगा?',
      a: 'यह आपकी मूल PDF पर निर्भर करता है। टूल वास्तविक बाइट (bytes) में कमी की गणना करके आपको सही जानकारी देगा।',
      qEn: 'How small will the PDF be after compression?',
      aEn: 'It depends on your original PDF. The tool will calculate the exact byte reduction and display the accurate result.',
    },
  ],
  'merge-pdf': [
    {
      q: 'कई PDF को एक PDF में कैसे जोड़ें?',
      a: 'बस अपनी सभी PDF फाइलें ऊपर दिए गए बॉक्स में चुनें या खींचें (drag & drop), उनका क्रम सेट करें, और "PDF मर्ज करें" पर क्लिक करें।',
      qEn: 'How to combine multiple PDFs into one?',
      aEn: 'Simply select or drag & drop all your PDF files into the box above, set their order, and click "Merge PDF".',
    },
    {
      q: 'क्या PDF Merge करने के लिए file upload करनी पड़ती है?',
      a: 'नहीं, यह टूल आपके ब्राउज़र में ही काम करता है। कोई भी फाइल हमारे सर्वर पर अपलोड नहीं की जाती, जिससे आपकी प्राइवेसी सुरक्षित रहती है।',
      qEn: 'Do I need to upload files to merge PDFs?',
      aEn: 'No, this tool works entirely within your browser. No files are uploaded to our servers, keeping your privacy secure.',
    },
    {
      q: 'क्या मेरी PDF server पर जाती है?',
      a: 'बिल्कुल नहीं। आपकी सारी प्रोसेसिंग (processing) आपके मोबाइल या कंप्यूटर पर ही होती है।',
      qEn: 'Do my PDFs go to a server?',
      aEn: 'Not at all. All processing happens locally on your mobile or computer.',
    },
    {
      q: 'क्या PDF Merge करने के बाद page order वही रहता है?',
      a: 'हाँ, अंतिम PDF में पेज ठीक उसी क्रम में जुड़ते हैं जिस क्रम में आपने फाइलें सूची में रखी हैं।',
      qEn: 'Does the page order remain the same after merging?',
      aEn: 'Yes, the pages in the final PDF are combined in the exact order you have arranged the files in the list.',
    },
    {
      q: 'एक बार में कितनी PDF जोड़ी जा सकती हैं?',
      a: 'आप अपनी ज़रूरत के अनुसार कई फाइलें जोड़ सकते हैं। हालांकि, बहुत अधिक फाइलें या बहुत बड़ी फाइलें आपके डिवाइस की मेमोरी (memory) पर निर्भर करती हैं।',
      qEn: 'How many PDFs can be merged at once?',
      aEn: 'You can merge many files as needed. However, processing a very large number of files or extremely large files depends on your device\'s memory limits.',
    },
  ],
  'split-pdf': [
    {
      q: 'PDF से कुछ पेज कैसे निकालें?',
      a: 'अपनी PDF फाइल चुनें और उन पेजों का नंबर लिखें जिन्हें आप निकालना चाहते हैं (जैसे 1-3, 5)। फिर "PDF Split करें" पर क्लिक करें।',
      qEn: 'How to extract specific pages from a PDF?',
      aEn: 'Select your PDF file and enter the page numbers you want to extract (e.g., 1-3, 5). Then click "Split PDF".',
    },
    {
      q: 'क्या मैं 1-3 और 7 जैसे page ranges चुन सकता हूँ?',
      a: 'हाँ, आप कॉमा (,) और डैश (-) का उपयोग करके कई अलग-अलग पेज या रेंज एक साथ चुन सकते हैं। उदाहरण: 1-3, 7, 10-12',
      qEn: 'Can I select page ranges like 1-3 and 7?',
      aEn: 'Yes, you can use commas (,) and dashes (-) to select multiple distinct pages or ranges simultaneously. Example: 1-3, 7, 10-12',
    },
    {
      q: 'क्या मेरी PDF server पर upload होती है?',
      a: 'नहीं। आपकी फाइल आपके डिवाइस पर ही सुरक्षित रूप से प्रोसेस होती है। कोई डेटा सर्वर पर नहीं भेजा जाता।',
      qEn: 'Is my PDF uploaded to a server?',
      aEn: 'No. Your file is securely processed directly on your device. No data is sent to any server.',
    },
    {
      q: 'क्या PDF Split करने के बाद page size बदलता है?',
      a: 'बिल्कुल नहीं। निकाले गए पेजों का आकार, क्वालिटी और डिज़ाइन वैसा ही रहता है जैसा मूल PDF में था।',
      qEn: 'Does the page size change after splitting?',
      aEn: 'Not at all. The size, quality, and layout of the extracted pages remain exactly the same as in the original PDF.',
    },
    {
      q: 'क्या original PDF सुरक्षित रहती है?',
      a: 'हाँ, आपकी मूल (original) PDF फाइल में कोई बदलाव नहीं होता। यह टूल केवल एक नई फाइल बनाता है जिसे आप डाउनलोड करते हैं।',
      qEn: 'Does the original PDF remain safe?',
      aEn: 'Yes, your original PDF file is not modified. This tool only creates a new file that you download.',
    },
  ],
  'pdf-to-jpg': [
    {
      q: 'PDF को JPG में कैसे बदलें?',
      a: 'अपनी PDF फाइल अपलोड करें, आउटपुट फॉर्मेट (JPG या PNG) चुनें, और "PDF Convert करें" पर क्लिक करें। आपके पेज हाई-क्वालिटी इमेज में बदल जाएंगे।',
      qEn: 'How to convert PDF to JPG?',
      aEn: 'Upload your PDF, select the output format (JPG or PNG), and click "Convert PDF". Your pages will be converted into high-quality images.',
    },
    {
      q: 'क्या PDF के सभी पेज JPG में बदल सकते हैं?',
      a: 'हाँ, डिफ़ॉल्ट रूप से टूल आपके PDF के सभी पेजों को अलग-अलग JPG या PNG फाइल में बदल देता है।',
      qEn: 'Can I convert all pages of a PDF to JPG?',
      aEn: 'Yes, by default the tool converts all pages of your PDF into separate JPG or PNG files.',
    },
    {
      q: 'क्या मैं केवल कुछ pages convert कर सकता हूँ?',
      a: 'बिल्कुल! आप "चुने हुए पेज" विकल्प को चुनकर विशिष्ट पेज या रेंज (जैसे 1-3, 5) सेट कर सकते हैं।',
      qEn: 'Can I convert only specific pages?',
      aEn: 'Absolutely! You can select "Selected pages" and define specific pages or ranges (like 1-3, 5).',
    },
    {
      q: 'JPG और PNG में क्या चुनना चाहिए?',
      a: 'अगर आपको छोटा फाइल साइज़ चाहिए, तो JPG चुनें। अगर आपको बेहतरीन क्वालिटी और पारदर्शी (transparent) ग्राफिक्स चाहिए, तो PNG चुनें।',
      qEn: 'Should I choose JPG or PNG?',
      aEn: 'If you want a smaller file size, choose JPG. If you need the best quality or transparent graphics, choose PNG.',
    },
    {
      q: 'क्या मेरी PDF server पर upload होती है?',
      a: 'नहीं। आपका दस्तावेज़ आपके डिवाइस (मोबाइल/कंप्यूटर) पर ही प्रोसेस होता है। यह 100% सुरक्षित और प्राइवेट है।',
      qEn: 'Is my PDF uploaded to a server?',
      aEn: 'No. Your document is processed entirely on your device (mobile/computer). It is 100% secure and private.',
    },
    {
      q: 'क्या PDF का original page size/aspect ratio सुरक्षित रहता है?',
      a: 'हाँ, इमेज बिल्कुल आपके PDF पेज जैसी ही दिखेगी। लैंडस्केप (Landscape) और पोर्ट्रेट (Portrait) पेजों का आकार नहीं बिगड़ेगा।',
      qEn: 'Does it preserve the original page aspect ratio?',
      aEn: 'Yes, the image will look exactly like your PDF page. Landscape and portrait dimensions are not distorted.',
    },
  ],
  'rotate-pdf': [
    {
      q: 'PDF के पेज को 90° कैसे rotate करें?',
      a: 'अपनी PDF फाइल अपलोड करें, "90° दाईं ओर" (Right) या "90° बाईं ओर" (Left) बटन पर क्लिक करें, और "PDF तैयार करें" पर क्लिक करें।',
      qEn: 'How to rotate a PDF page by 90°?',
      aEn: 'Upload your PDF file, click the "90° Right" or "90° Left" button, and click "Generate PDF".',
    },
    {
      q: 'क्या केवल कुछ pages rotate कर सकते हैं?',
      a: 'हाँ, आप "चुने हुए पेज" विकल्प से यह तय कर सकते हैं कि आपको कौन से पेज (जैसे 1-3, 5) घुमाने हैं।',
      qEn: 'Can I rotate only specific pages?',
      aEn: 'Yes, you can use the "Selected pages" option to specify which pages (e.g., 1-3, 5) you want to rotate.',
    },
    {
      q: 'क्या सभी pages एक साथ rotate कर सकते हैं?',
      a: 'बिल्कुल! डिफ़ॉल्ट रूप से टूल आपके PDF के सभी पेजों को एक साथ घुमाता है।',
      qEn: 'Can I rotate all pages at once?',
      aEn: 'Absolutely! By default, the tool rotates all pages of your PDF simultaneously.',
    },
    {
      q: 'क्या PDF की original quality बनी रहती है?',
      a: 'हाँ, हम केवल पेज का एंगल बदलते हैं। आपकी इमेज, टेक्स्ट और डिज़ाइन की क्वालिटी वैसी ही रहती है।',
      qEn: 'Does the PDF retain its original quality?',
      aEn: 'Yes, we only change the page angle. The quality of your images, text, and design remains exactly the same.',
    },
    {
      q: 'क्या PDF server पर upload होती है?',
      a: 'नहीं। आपका दस्तावेज़ पूरी तरह से आपके डिवाइस (ब्राउज़र) में प्रोसेस होता है। यह 100% सुरक्षित है।',
      qEn: 'Is the PDF uploaded to a server?',
      aEn: 'No. Your document is processed entirely on your device (browser). It is 100% secure.',
    },
    {
      q: 'क्या existing page rotation सुरक्षित रहती है?',
      a: 'हाँ! यदि आपका पेज पहले से घुमा हुआ है, तो टूल नई रोटेशन को उसमें जोड़ देता है ताकि पेज सही दिशा में आ जाए।',
      qEn: 'Is the existing page rotation preserved?',
      aEn: 'Yes! If your page is already rotated, the tool simply adds the new rotation to it so the page faces the correct direction.',
    },
  ],
  'watermark-pdf': [
    {
      q: 'PDF में watermark कैसे लगाएं?',
      a: 'अपनी PDF फाइल अपलोड करें, अपना Watermark Text टाइप करें, पेज और पोजीशन चुनें, और "Watermark PDF" पर क्लिक करें।',
      qEn: 'How to add a watermark to a PDF?',
      aEn: 'Upload your PDF, type your Watermark Text, select the pages and position, then click "Watermark PDF".',
    },
    {
      q: 'क्या सभी pages पर watermark लगाया जा सकता है?',
      a: 'हाँ! डिफ़ॉल्ट रूप से टूल आपके PDF के सभी पेजों पर एक साथ वॉटरमार्क लगाता है।',
      qEn: 'Can I watermark all pages?',
      aEn: 'Yes! By default, the tool adds the watermark to all pages of your PDF simultaneously.',
    },
    {
      q: 'क्या selected pages पर watermark लगाया जा सकता है?',
      a: 'हाँ, आप "चुने हुए पेज" विकल्प चुनकर यह तय कर सकते हैं कि किन पेजों (जैसे 1-3, 5) पर वॉटरमार्क लगाना है।',
      qEn: 'Can I watermark selected pages?',
      aEn: 'Yes, you can use the "Selected pages" option to specify exactly which pages (e.g., 1-3, 5) you want to watermark.',
    },
    {
      q: 'क्या watermark की position बदल सकते हैं?',
      a: 'बिल्कुल! आप टॉप, सेंटर, बॉटम और कोनों (corners) सहित 9 अलग-अलग पोजीशन में से चुन सकते हैं।',
      qEn: 'Can I change the watermark position?',
      aEn: 'Absolutely! You can choose from 9 different positions including top, center, bottom, and corners.',
    },
    {
      q: 'क्या opacity और rotation बदल सकते हैं?',
      a: 'हाँ, आप ओपेसिटी (पारदर्शिता) स्लाइडर का उपयोग कर सकते हैं और टेक्स्ट को 45°, 90° या किसी भी दिशा में घुमा सकते हैं।',
      qEn: 'Can I change opacity and rotation?',
      aEn: 'Yes, you can use the opacity slider to make it transparent, and rotate the text by 45°, 90°, or other angles.',
    },
    {
      q: 'क्या PDF server पर upload होती है?',
      a: 'नहीं। आपका दस्तावेज़ पूरी तरह से आपके डिवाइस (ब्राउज़र) में ही प्रोसेस होता है। यह 100% सुरक्षित है। (नोट: हिंदी/Devanagari टेक्स्ट अभी समर्थित नहीं है)',
      qEn: 'Is my PDF uploaded to a server?',
      aEn: 'No. Your document is processed entirely locally on your device (browser). It is 100% secure. (Note: Hindi/Devanagari text is currently unsupported)',
    },
  ],
  'photo-20kb': [
    {
      q: 'SSC/UPSC फॉर्म के लिए फोटो किस साइज़ में होनी चाहिए?',
      a: 'अधिकांश SSC और UPSC फॉर्म 20KB से 50KB के बीच फोटो स्वीकार करते हैं। अपना फोटो यहाँ उचित साइज़ में करें।',
      qEn: 'What size photo is required for SSC/UPSC forms?',
      aEn: 'Most SSC and UPSC forms accept photos between 20KB and 50KB. Resize your photo here.',
    },
    {
      q: 'फोटो की गुणवत्ता कितनी बनी रहेगी?',
      a: 'हम आपकी फोटो की गुणवत्ता को जितना संभव हो उतना बनाए रखते हुए साइज़ कम करते हैं।',
      qEn: 'How much quality will be retained?',
      aEn: 'We reduce size while maintaining as much quality as possible.',
    },
  ],
  'signature-20kb': [
    {
      q: 'सरकारी फॉर्म के लिए हस्ताक्षर का सही साइज़ क्या है?',
      a: 'आमतौर पर सरकारी और परीक्षा फॉर्म (जैसे SSC, रेलवे) 10KB से 20KB के बीच के हस्ताक्षर मांगते हैं। निर्देश हमेशा पहले जांच लें।',
      qEn: 'What is the correct signature size for government forms?',
      aEn: 'Usually government and exam forms (like SSC, Railway) require signatures between 10KB and 20KB. Always check instructions first.',
    },
    {
      q: 'क्या यह टूल पारदर्शी (transparent) हस्ताक्षर को सपोर्ट करता है?',
      a: 'हाँ। यदि आप पारदर्शी PNG अपलोड करते हैं, तो टूल स्वचालित रूप से एक सफेद बैकग्राउंड जोड़ देगा ताकि हस्ताक्षर साफ दिखाई दे।',
      qEn: 'Does this tool support transparent signatures?',
      aEn: 'Yes. If you upload a transparent PNG, the tool will automatically add a white background so the signature remains clear.',
    },
  ],
};

/**
 * Category-level FAQs indexed by category slug.
 */
export const categoryFAQs = {
  'pdf-tools': [
    {
      q: 'PDF टूल्स का उपयोग करने के लिए कोई सॉफ्टवेयर इंस्टॉल करना होगा?',
      a: 'नहीं। सभी PDF टूल्स सीधे आपके ब्राउज़र में काम करते हैं।',
      qEn: 'Do I need to install software to use PDF tools?',
      aEn: 'No. All PDF tools work directly in your browser.',
    },
  ],
  'form-tools': [
    {
      q: 'सरकारी फॉर्म के लिए फोटो और हस्ताक्षर किस फॉर्मेट में होने चाहिए?',
      a: 'अधिकांश सरकारी पोर्टल JPG फॉर्मेट में फोटो और PNG में हस्ताक्षर स्वीकार करते हैं।',
      qEn: 'What format should photos and signatures be in for government forms?',
      aEn: 'Most government portals accept JPG for photos and PNG for signatures.',
    },
  ],
};

/**
 * Get FAQs for a given tool slug (falls back to empty array).
 * @param {string} slug
 * @returns {Array}
 */
export function getFAQsByToolSlug(slug) {
  return toolFAQs[slug] || [];
}

/**
 * Get FAQs for a category slug.
 * @param {string} slug
 * @returns {Array}
 */
export function getFAQsByCategorySlug(slug) {
  return categoryFAQs[slug] || [];
}
