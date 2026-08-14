/**
 * SLabs AI PDF — Dynamic Tool Page
 *
 * This single route handles ALL tool slugs:
 * /merge-pdf, /compress-pdf, /photo-20kb, etc.
 *
 * It reads tool metadata from the data layer and renders the
 * appropriate template (ToolPage, FormToolPage, etc.)
 *
 * generateStaticParams() → all tool slugs are pre-rendered at build time,
 * giving us fully crawlable HTML for every tool page.
 */
import { notFound } from 'next/navigation';
import { getToolBySlug, getAllToolSlugs } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import { getFAQsByToolSlug } from '@/data/faqs';
import { buildToolMetadata } from '@/lib/metadata';
import ToolPageTemplate from '@/components/templates/ToolPage';
import FormToolPageTemplate from '@/components/templates/FormToolPage';

/**
 * Generate all static paths at build time for full pre-rendering.
 * This is critical for SEO — every tool page is server-rendered HTML.
 */
export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ tool: slug }));
}

/**
 * Generate per-page metadata dynamically from tool data.
 */
export async function generateMetadata({ params }) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

/**
 * Tool page component — selects the right template based on tool category.
 */
export default async function ToolPage({ params }) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = getCategoryBySlug(tool.category);
  const faqs = getFAQsByToolSlug(slug);

  // Form tools get a specialized template
  if (tool.category === 'form-tools') {
    return (
      <FormToolPageTemplate
        tool={tool}
        category={category}
        faqs={faqs}
      />
    );
  }

  // Default: standard tool page template
  return (
    <ToolPageTemplate
      tool={tool}
      category={category}
      faqs={faqs}
    />
  );
}
