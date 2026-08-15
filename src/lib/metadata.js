/**
 * SLabs AI PDF — Metadata Generation Helpers
 *
 * Centralizes all metadata creation for consistent SEO across every page.
 * Uses Next.js App Router Metadata API.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
const SITE_URL = rawUrl.includes('localhost') || !rawUrl ? 'https://shivashutoshlabs.com' : rawUrl;
const SITE_NAME = 'Shivashutosh Labs';
const BRAND_FULL = 'Shivashutosh Labs';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Build the base metadata object shared by all pages.
 * Accepts overrides for static pages (about, privacy, etc.)
 * @param {Object} [overrides]
 * @returns {import('next').Metadata}
 */
export function buildBaseMetadata(overrides = {}) {
  const { title, description, path, keywords } = overrides;
  
  const base = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: 'Shivashutosh AI Labs' }],
    creator: 'Shivashutosh AI Labs',
    publisher: 'Shivashutosh AI Labs',
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };

  if (title) base.title = title;
  if (description) base.description = description;
  if (keywords) base.keywords = keywords;

  if (path) {
    const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    base.alternates = { canonical: canonicalUrl };
    
    if (title && description) {
      base.openGraph = {
        title,
        description,
        url: canonicalUrl,
        siteName: BRAND_FULL,
        locale: 'hi_IN',
        alternateLocale: 'en_IN',
        type: 'website',
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
      };
      base.twitter = {
        card: 'summary_large_image',
        title,
        description,
        images: [DEFAULT_OG_IMAGE],
      };
    }
  }

  return base;
}

/**
 * Build per-page metadata for a tool page.
 *
 * @param {{
 *   slug: string,
 *   titleEn: string,
 *   titleHi: string,
 *   descriptionEn: string,
 *   descriptionHi: string,
 *   category: string,
 *   keywords?: string[],
 * }} tool
 * @returns {import('next').Metadata}
 */
export function buildToolMetadata(tool) {
  const title = `${tool.titleEn} – ${tool.titleHi} | ${SITE_NAME}`;
  const description = `${tool.descriptionEn} ${tool.descriptionHi}`;
  const canonicalUrl = `${SITE_URL}/${tool.slug}`;

  return {
    ...buildBaseMetadata(),
    title,
    description,
    keywords: tool.keywords || [],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: tool.descriptionEn,
      url: canonicalUrl,
      siteName: BRAND_FULL,
      locale: 'hi_IN',
      alternateLocale: 'en_IN',
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: tool.descriptionEn,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/**
 * Build per-page metadata for a category page.
 *
 * @param {{
 *   slug: string,
 *   titleEn: string,
 *   titleHi: string,
 *   descriptionEn: string,
 *   descriptionHi: string,
 * }} category
 * @returns {import('next').Metadata}
 */
export function buildCategoryMetadata(category) {
  const title = `${category.titleEn} – ${category.titleHi} | ${SITE_NAME}`;
  const description = `${category.descriptionEn} ${category.descriptionHi}`;
  const canonicalUrl = `${SITE_URL}/${category.slug}`;

  return {
    ...buildBaseMetadata(),
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: category.descriptionEn,
      url: canonicalUrl,
      siteName: BRAND_FULL,
      locale: 'hi_IN',
      alternateLocale: 'en_IN',
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: category.descriptionEn,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/**
 * Build homepage metadata.
 * @returns {import('next').Metadata}
 */
export function buildHomeMetadata() {
  const title = `${SITE_NAME} – Free PDF, Image & Form Tools | मुफ़्त PDF टूल्स`;
  const description =
    'Free PDF tools for everyone. Merge, split, compress, convert PDFs. Resize photos for government forms. Works on mobile. No signup. | मुफ़्त PDF टूल्स — सरकारी फॉर्म, परीक्षा, साइबर कैफे।';

  return {
    ...buildBaseMetadata(),
    title,
    description,
    keywords: [
      'pdf tools', 'free pdf', 'pdf online', 'compress pdf', 'merge pdf',
      'photo 20kb', 'signature 20kb', 'PDF टूल्स', 'मुफ़्त PDF',
      'government form photo', 'exam photo size',
    ],
    alternates: { canonical: SITE_URL },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: BRAND_FULL,
      locale: 'hi_IN',
      alternateLocale: 'en_IN',
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** Site-level constants exported for use in structured data, etc. */
export const siteConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  brandFull: BRAND_FULL,
  defaultOgImage: DEFAULT_OG_IMAGE,
};
