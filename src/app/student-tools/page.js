import { getCategoryBySlug } from '@/data/categories';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('student-tools');
export const metadata = buildCategoryMetadata(category);

export default function StudentToolsPage() {
  return (
    <CategoryPageTemplate
      category={category}
      tools={[]}
      faqs={[]}
      description="प्रतियोगी परीक्षा छात्रों के लिए विशेष टूल्स — एडमिट कार्ड, आवेदन फॉर्म, दस्तावेज़ तैयार करें।"
    />
  );
}
