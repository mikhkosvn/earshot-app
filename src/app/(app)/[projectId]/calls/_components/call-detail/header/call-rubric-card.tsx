'use client';

import { ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { RubricVerdict } from '@/server/metric-scoring/types';

import { RubricItemRow } from './rubric-item-row';
import { RubricVerdictBadge } from './rubric-verdict-badge';

interface CallRubricCardProps {
  rubric: RubricVerdict;
}

export function CallRubricCard({ rubric }: CallRubricCardProps) {
  return (
    <Collapsible className="rounded-lg border bg-card">
      <div className="flex items-start justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Rubric Breakdown</h3>
            <RubricVerdictBadge rubric={rubric} />
          </div>
          <p className="text-xs text-muted-foreground">
            A set of conditions your agent is evaluated against.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Show or hide the rubric breakdown"
                className="group"
              />
            }
          >
            <ChevronDownIcon className="transition-transform group-data-panel-open:rotate-180" />
          </CollapsibleTrigger>
          <Link
            href={UrlGenerator.rubric()}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            View Rubric
            <ArrowUpRightIcon className="size-3" />
          </Link>
        </div>
      </div>
      <CollapsibleContent className="flex flex-col gap-1.5 border-t px-4 py-3">
        {rubric.items.map((item) => (
          <RubricItemRow key={item.metricId} item={item} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
