import { getCategoryBySlug } from '@/data/categories';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('cyber-cafe-tools');
export const metadata = buildCategoryMetadata(category);

export default function CyberCafeToolsPage() {
  return (
    <CategoryPageTemplate
      category={category}
      tools={[]}
      faqs={[]}
      description="साइबर कैफे ऑपरेटरों के लिए — कई ग्राहकों के दस्तावेज़ एक साथ प्रोसेस करें। बैच प्रोसेसिंग जल्द आ रही है।"
    />
  );
}
