'use client';

import { ThumbsDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { ConversationMetricItem } from '@/server/conversations/types';

import type { ConversationQueryArgs } from '../../_service';
import { isExpectedOutcomeMetric } from '../../_utils/metric-display';
import { CorrectMetricForm } from './correct-metric-form';

type CorrectMetricButtonProps = {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
  readOnly: boolean;
};

export function CorrectMetricButton({
  metric,
  query,
  readOnly,
}: CorrectMetricButtonProps) {
  const [open, setOpen] = useState(false);
  if (readOnly || isExpectedOutcomeMetric(metric)) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={`Correct ${metric.name}`}
          />
        }
      >
        <ThumbsDownIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96">
        <CorrectMetricForm
          metric={metric}
          query={query}
          onDone={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
