import { getCategoryBySlug } from '@/data/categories';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('image-tools');
export const metadata = buildCategoryMetadata(category);

export default function ImageToolsPage() {
  return (
    <CategoryPageTemplate
      category={category}
      tools={[]}
      faqs={[]}
      description="इमेज को रिसाइज़, कन्वर्ट, कम्प्रेस करें। PNG से JPG, WebP से PNG — सब कुछ मुफ़्त।"
    />
  );
}
