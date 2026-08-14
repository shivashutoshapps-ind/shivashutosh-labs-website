/**
 * SLabs AI PDF — Category Definitions
 */

export const categories = [
  {
    slug: 'pdf-tools',
    titleEn: 'PDF Tools',
    titleHi: 'PDF टूल्स',
    descriptionEn: 'Complete set of free PDF tools — merge, split, compress, convert, edit and more.',
    descriptionHi: 'मुफ़्त PDF टूल्स का पूरा सेट — जोड़ें, विभाजित करें, कम्प्रेस करें, कन्वर्ट करें, संपादित करें।',
    icon: 'pdf',
    color: '#E53E3E',
    gradient: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)',
    href: '/pdf-tools',
  },
  {
    slug: 'image-tools',
    titleEn: 'Image Tools',
    titleHi: 'इमेज टूल्स',
    descriptionEn: 'Resize, convert, compress and optimize images for any use case.',
    descriptionHi: 'इमेज को रिसाइज़, कन्वर्ट, कम्प्रेस और ऑप्टिमाइज़ करें।',
    icon: 'image',
    color: '#38A169',
    gradient: 'linear-gradient(135deg, #38A169 0%, #276749 100%)',
    href: '/image-tools',
  },
  {
    slug: 'form-tools',
    titleEn: 'Government Form Tools',
    titleHi: 'फॉर्म टूल्स',
    descriptionEn: 'Compress photos and PDFs to exact sizes required for government and exam portals.',
    descriptionHi: 'सरकारी और परीक्षा पोर्टल के लिए फोटो और PDF को सही साइज़ में करें।',
    icon: 'form',
    color: '#D69E2E',
    gradient: 'linear-gradient(135deg, #D69E2E 0%, #B7791F 100%)',
    href: '/form-tools',
  },
  {
    slug: 'student-tools',
    titleEn: 'Student & Exam Tools',
    titleHi: 'छात्र टूल्स',
    descriptionEn: 'Tools and guides for competitive exam students — admit cards, results, document prep.',
    descriptionHi: 'प्रतियोगी परीक्षा छात्रों के लिए टूल्स और गाइड — एडमिट कार्ड, रिजल्ट, दस्तावेज़।',
    icon: 'student',
    color: '#3182CE',
    gradient: 'linear-gradient(135deg, #3182CE 0%, #2B6CB0 100%)',
    href: '/student-tools',
  },
  {
    slug: 'cyber-cafe-tools',
    titleEn: 'Cyber Café Tools',
    titleHi: 'साइबर कैफे टूल्स',
    descriptionEn: 'Efficient batch tools for cyber café operators handling multiple document tasks.',
    descriptionHi: 'साइबर कैफे ऑपरेटरों के लिए बैच टूल्स — कई दस्तावेज़ एक साथ।',
    icon: 'cafe',
    color: '#805AD5',
    gradient: 'linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)',
    href: '/cyber-cafe-tools',
  },
  {
    slug: 'guides',
    titleEn: 'Helpful Guides',
    titleHi: 'गाइड और मदद',
    descriptionEn: 'Step-by-step guides for document tasks, form submissions, and digital workflows.',
    descriptionHi: 'दस्तावेज़ कार्यों, फॉर्म जमा करने और डिजिटल वर्कफ़्लो के लिए चरण-दर-चरण गाइड।',
    icon: 'guide',
    color: '#319795',
    gradient: 'linear-gradient(135deg, #319795 0%, #2C7A7B 100%)',
    href: '/guides',
  },
];

/**
 * Get a single category by slug.
 * @param {string} slug
 */
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
