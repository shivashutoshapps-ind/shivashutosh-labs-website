import { getCategoryBySlug } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { getFAQsByCategorySlug } from '@/data/faqs';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('form-tools');
export const metadata = buildCategoryMetadata(category);

export default function FormToolsPage() {
  const tools = getToolsByCategory('form-tools');
  const faqs = getFAQsByCategorySlug('form-tools');

  return (
    <CategoryPageTemplate
      category={category}
      tools={tools}
      faqs={faqs}
      description="SSC, UPSC, Railway, Bank परीक्षा फॉर्म के लिए फोटो और PDF को सही साइज़ में करें। साइबर कैफे के लिए भी उपयोगी।"
    />
  );
}
