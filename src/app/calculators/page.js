import { getCategoryBySlug } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { buildCategoryMetadata } from '@/lib/metadata';
import CategoryPageTemplate from '@/components/templates/CategoryPage';

const category = getCategoryBySlug('calculators');
export const metadata = buildCategoryMetadata(category);

export default function CalculatorsPage() {
  const tools = getToolsByCategory('calculators');
  
  return (
    <CategoryPageTemplate
      category={category}
      tools={tools}
      faqs={[]}
      description="Calculate GST, EMI, Age, Percentage, and SIP instantly. 100% free online calculators built for India."
    />
  );
}
