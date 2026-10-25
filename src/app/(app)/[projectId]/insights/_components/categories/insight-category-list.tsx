import type { InsightCategoryView } from '@/server/insights/types';

import { InsightCategoryItem } from './insight-category-item';

type InsightCategoryListProps = {
  categories: InsightCategoryView[];
};

export function InsightCategoryList({ categories }: InsightCategoryListProps) {
  if (categories.length === 0) {
    return (
      <p className="p-3 text-xs text-muted-foreground">
        No failure categories in this range.
      </p>
    );
  }
  const total = categories.reduce((sum, category) => sum + category.count, 0);
  return (
    <ul className="flex flex-col divide-y">
      {categories.map((category) => (
        <InsightCategoryItem
          key={category.id}
          category={category}
          total={total}
        />
      ))}
    </ul>
  );
}
