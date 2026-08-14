import { getCategoryBySlug } from '@/data/categories';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('guides');
export const metadata = buildCategoryMetadata(category);

export default function GuidesPage() {
  return (
    <CategoryPageTemplate
      category={category}
      tools={[]}
      faqs={[]}
      description="PDF, फोटो, दस्तावेज़ से जुड़े सभी कामों के लिए सरल हिंदी गाइड। SSC, UPSC फॉर्म गाइड जल्द आ रहे हैं।"
    />
  );
}
