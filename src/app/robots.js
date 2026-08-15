/**
 * robots.txt generation via Next.js App Router Metadata API
 * Accessible at: /robots.txt
 */
import { siteConfig } from '@/lib/metadata';

export default function robots() {
  const siteUrl = siteConfig.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
