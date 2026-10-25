'use client';

import { ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { RubricBreakdownItem } from '@/server/metric-scoring/types';

import { RubricItemRow } from './rubric-item-row';

interface RubricPassedConditionsProps {
  items: readonly RubricBreakdownItem[];
}

export function RubricPassedConditions({ items }: RubricPassedConditionsProps) {
  if (items.length === 0) return null;

  return (
    <Collapsible className="flex flex-col gap-1.5">
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="group w-fit gap-1 px-1 text-xs font-normal"
          />
        }
      >
        <ChevronRightIcon className="transition-transform group-data-panel-open:rotate-90" />
        Show passed conditions
        <span className="text-emerald-600">({items.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1.5">
        {items.map((item) => (
          <RubricItemRow key={item.metricId} item={item} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
