/**
 * XML Sitemap generation via Next.js App Router Metadata API
 * Accessible at: /sitemap.xml
 *
 * Covers: homepage, all category pages, all tool pages.
 * Priority and changeFrequency assigned based on page importance.
 */
import { siteConfig } from '@/lib/metadata';
import { getAllToolSlugs } from '@/data/tools';
import { categories } from '@/data/categories';

export default function sitemap() {
  const siteUrl = siteConfig.siteUrl;
  const now = new Date().toISOString();

  // Homepage
  const homeEntry = {
    url: siteUrl,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  };

  // Tools master page
  const toolsEntry = {
    url: `${siteUrl}/tools`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  };

  // Category pages
  const categoryEntries = categories.map((cat) => ({
    url: `${siteUrl}/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tool pages
  const toolSlugs = getAllToolSlugs();
  const toolEntries = toolSlugs.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticEntries = [
    {
      url: `${siteUrl}/guides/jpg-to-pdf-kaise-banaye`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/pdf-ka-size-kam-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/pdf-500kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/pdf-200kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/pdf-100kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/photo-200kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/photo-100kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/photo-50kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/signature-20kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/sarkari-form-photo-size-kaise-kam-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides/photo-20kb-kaise-kare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [homeEntry, toolsEntry, ...categoryEntries, ...toolEntries, ...staticEntries];
}
