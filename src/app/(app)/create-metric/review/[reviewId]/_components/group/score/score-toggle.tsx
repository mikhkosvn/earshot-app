'use client';

import { Toggle } from '@/components/ui/toggle';
import type { MetricValue } from '@/server/metrics/types';

import { useGroupCorrection } from '../../../_hooks/use-group-correction';
import { useIsSavingCorrection } from '../../../_hooks/use-is-saving-correction';
import { usePatternGroup } from '../../../_hooks/use-pattern-group';
import { isCorrectionValue } from '../../../_utils/metric-value-text';

interface ScoreToggleProps {
  groupKey: string;
  value: MetricValue;
  label: string;
}

export function ScoreToggle({ groupKey, value, label }: ScoreToggleProps) {
  const { correction } = usePatternGroup(groupKey);
  const { setScore, clearScore } = useGroupCorrection(groupKey);
  const isSaving = useIsSavingCorrection();

  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={isCorrectionValue(correction, value)}
      disabled={isSaving}
      className="bg-background data-pressed:bg-primary data-pressed:text-primary-foreground"
      onPressedChange={(pressed) => {
        if (pressed) {
          setScore(value);
          return;
        }
        clearScore();
      }}
    >
      {label}
    </Toggle>
  );
}
