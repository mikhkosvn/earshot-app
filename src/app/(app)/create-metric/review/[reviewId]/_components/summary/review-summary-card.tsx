'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { sampleCountText, sampleProgressValue } from '../../_utils/review-text';
import { ReviewDefinitionContent } from './review-definition-content';

const DEFINITION_ITEM_VALUE = 'definition';

export function ReviewSummaryCard() {
  const review = usePatternReview();

  return (
    <Accordion className="gap-3 rounded-lg border bg-background p-5">
      <AccordionItem value={DEFINITION_ITEM_VALUE} className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-lg font-semibold text-foreground">
            {review.metric.name}
          </h1>
          <AccordionTrigger className="h-7 flex-none items-center gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 py-0 text-[0.8rem] text-muted-foreground hover:bg-muted hover:text-foreground hover:no-underline aria-expanded:bg-muted aria-expanded:text-foreground **:data-[slot=accordion-trigger-icon]:size-3.5 dark:hover:bg-muted/50">
            Definition
          </AccordionTrigger>
        </div>
        <AccordionContent className="pt-3 pb-0 [&_p:not(:last-child)]:mb-0">
          <ReviewDefinitionContent />
        </AccordionContent>
      </AccordionItem>
      <p className="text-base text-foreground">{sampleCountText(review)}</p>
      <Progress
        value={sampleProgressValue(review)}
        aria-label={sampleCountText(review)}
      />
    </Accordion>
  );
}
