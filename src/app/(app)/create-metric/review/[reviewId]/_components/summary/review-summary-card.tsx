'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { sampleCountText, sampleProgressValue } from '../../_utils/review-text';
import { ReviewDefinitionContent } from './review-definition-content';

export function ReviewSummaryCard() {
  const review = usePatternReview();

  return (
    <Collapsible className="flex flex-col gap-3 rounded-lg border bg-background p-5">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-lg font-semibold text-foreground">
          {review.metric.name}
        </h1>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground [&[data-panel-open]>svg]:rotate-180"
            />
          }
        >
          Definition
          <ChevronDownIcon className="transition-transform" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ReviewDefinitionContent />
      </CollapsibleContent>
      <p className="text-base text-foreground">{sampleCountText(review)}</p>
      <Progress
        value={sampleProgressValue(review)}
        aria-label={sampleCountText(review)}
      />
    </Collapsible>
  );
}
