'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { RubricVerdict } from '@/server/metric-scoring/types';

import { RubricItemRow } from './rubric-item-row';
import { RubricVerdictBadge } from './rubric-verdict-badge';

const RUBRIC_ITEM_VALUE = 'rubric';

interface CallRubricCardProps {
  rubric: RubricVerdict;
}

export function CallRubricCard({ rubric }: CallRubricCardProps) {
  return (
    <Accordion className="rounded-lg border bg-card">
      <AccordionItem value={RUBRIC_ITEM_VALUE}>
        <div className="flex items-start gap-2 px-4 py-3">
          <div className="min-w-0 flex-1">
            <AccordionTrigger className="items-start gap-3 py-0 hover:no-underline">
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium">Rubric Breakdown</span>
                  <RubricVerdictBadge rubric={rubric} />
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  A set of conditions your agent is evaluated against.
                </span>
              </span>
            </AccordionTrigger>
          </div>
          <Link
            href={UrlGenerator.rubric()}
            className="inline-flex shrink-0 items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            View Rubric
            <ArrowUpRightIcon className="size-3" />
          </Link>
        </div>
        <AccordionContent className="flex flex-col gap-1.5 border-t px-4 py-3">
          {rubric.items.map((item) => (
            <RubricItemRow key={item.metricId} item={item} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
