'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGroupCorrection } from '../../../_hooks/use-group-correction';
import { useIsSavingCorrection } from '../../../_hooks/use-is-saving-correction';
import { usePatternGroup } from '../../../_hooks/use-pattern-group';
import { usePatternReview } from '../../../_hooks/use-pattern-review';
import { enumSelectionOf } from '../../../_utils/metric-value-text';

type EnumScoreSelectProps = {
  groupKey: string;
};

export function EnumScoreSelect({ groupKey }: EnumScoreSelectProps) {
  const review = usePatternReview();
  const { correction } = usePatternGroup(groupKey);
  const { setScore } = useGroupCorrection(groupKey);
  const isSaving = useIsSavingCorrection();
  const items = review.metric.enumValues.map((value) => ({
    value,
    label: value,
  }));

  return (
    <Select
      items={items}
      value={enumSelectionOf(correction)}
      disabled={isSaving}
      onValueChange={(value) => {
        if (value === null) return;
        setScore(value);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label="Score"
        className="min-w-36 bg-background"
      >
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
