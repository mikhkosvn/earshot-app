'use client';

import type { ConversationMetricItem } from '@/server/conversations/types';

import type { ConversationQueryArgs } from '../_service';
import { ExpectedOutcomePrompt } from './expected-outcome-prompt';
import { MetricExplanation } from './metric-explanation';

interface MetricRowDetailProps {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
}

export function MetricRowDetail({ metric, query }: MetricRowDetailProps) {
  return (
    <div className="flex flex-col gap-2 border-t px-3 py-2.5 text-sm text-muted-foreground">
      <ExpectedOutcomePrompt metric={metric} query={query} />
      <MetricExplanation metric={metric} />
    </div>
  );
}
