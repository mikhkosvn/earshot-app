'use client';

import type { ConversationMetricItem } from '@/server/conversations/types';

import { useConversation } from '../_hooks/use-conversation';
import type { ConversationQueryArgs } from '../_service';
import { isExpectedOutcomeMetric } from '../_utils/metric-display';

type ExpectedOutcomePromptProps = {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
};

export function ExpectedOutcomePrompt({
  metric,
  query,
}: ExpectedOutcomePromptProps) {
  const { expectedOutcomePrompt } = useConversation(query);
  if (!isExpectedOutcomeMetric(metric) || !expectedOutcomePrompt) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-foreground">
        Expected outcome
      </span>
      <p className="rounded-md border bg-background px-3 py-2 whitespace-pre-line">
        {expectedOutcomePrompt}
      </p>
    </div>
  );
}
