'use client';

import type { ConversationMetricItem } from '@/server/conversations/types';

import { correctionOptions } from '../../_utils/correction-options';
import { CorrectMetricFieldInput } from './correct-metric-field-input';

type CorrectMetricValueFieldProps = {
  metric: ConversationMetricItem;
};

export function CorrectMetricValueField({
  metric,
}: CorrectMetricValueFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">
        Mark what should be the correct value
      </span>
      <CorrectMetricFieldInput options={correctionOptions(metric)} />
    </div>
  );
}
