import { getCategoryBySlug } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { getFAQsByCategorySlug } from '@/data/faqs';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

export const metadata = buildCategoryMetadata(getCategoryBySlug('pdf-tools'));

export default function PDFToolsPage() {
  const category = getCategoryBySlug('pdf-tools');
  const tools = getToolsByCategory('pdf-tools');
  const faqs = getFAQsByCategorySlug('pdf-tools');

  return (
    <CategoryPageTemplate
      category={category}
      tools={tools}
      faqs={faqs}
      description="PDF को मर्ज, स्प्लिट, कम्प्रेस, कन्वर्ट, एडिट, प्रोटेक्ट करें — सब कुछ एक जगह, बिल्कुल मुफ़्त।"
    />
  );
}
