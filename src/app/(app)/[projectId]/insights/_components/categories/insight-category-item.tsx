'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { InsightCategoryView } from '@/server/insights/types';

import { CategoryExampleRow } from './category-example-row';
import { DismissCategoryButton } from './dismiss-category-button';

const PERCENT = 100;
const CATEGORY_ITEM_VALUE = 'category';

interface InsightCategoryItemProps {
  category: InsightCategoryView;
  total: number;
}

export function InsightCategoryItem({
  category,
  total,
}: InsightCategoryItemProps) {
  const share = Math.round((category.count / Math.max(total, 1)) * PERCENT);

  return (
    <li>
      <Accordion>
        <AccordionItem value={CATEGORY_ITEM_VALUE}>
          <AccordionTrigger className="items-center gap-2 rounded-none px-3 py-2 hover:bg-muted/50 hover:no-underline">
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate text-xs font-medium">
                {category.name}
              </span>
              <span className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-red-500"
                  style={{ width: `${share}%` }}
                />
              </span>
            </span>
            <span className="shrink-0 text-[11px] font-normal text-muted-foreground">
              {category.count} · {share}%
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 px-3 pb-3">
            <p className="text-[11px] text-muted-foreground">
              {category.description}
            </p>
            <ul className="flex flex-col gap-1.5">
              {category.examples.map((example) => (
                <CategoryExampleRow
                  key={example.evaluationId}
                  example={example}
                />
              ))}
            </ul>
            <DismissCategoryButton categoryId={category.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
