/**
 * SLabs AI PDF — Structured Data (JSON-LD) Component
 *
 * Renders JSON-LD structured data in a <script> tag.
 * This is a Server Component — no 'use client' needed.
 */

/**
 * @param {{ data: object | object[] }} props
 */
export default function StructuredData({ data }) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// ─── Schema Builders ───────────────────────────────────────────────────────────
import { siteConfig } from '@/lib/metadata';

const SITE_URL = siteConfig.siteUrl;

/**
 * WebSite schema for the homepage.
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shivashutosh Labs',
    alternateName: 'Shivashutosh Labs',
    url: SITE_URL,
  };
}

/**
 * Organization schema.
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shivashutosh Labs',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
  };
}

/**
 * BreadcrumbList schema.
 * @param {{ label: string, href: string }[]} items
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * FAQPage schema.
 * @param {{ q: string, a: string }[]} faqs  (use English q/a for structured data)
 */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.qEn || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.aEn || faq.a,
      },
    })),
  };
}

/**
 * HowTo schema for tool usage instructions.
 * @param {{
 *   name: string,
 *   description: string,
 *   steps: { name: string, text: string }[],
 * }} params
 */
export function buildHowToSchema({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * SoftwareApplication schema for tool pages.
 * @param {{ name: string, description: string, url: string }} params
 */
export function buildSoftwareAppSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  };
}
