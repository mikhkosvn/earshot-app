'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { PredefinedMetricCard } from '@/server/metrics/types';

type PredefinedCardCheckboxProps = {
  card: PredefinedMetricCard;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function PredefinedCardCheckbox({
  card,
  checked,
  onCheckedChange,
}: PredefinedCardCheckboxProps) {
  if (card.added) return null;

  return (
    <Checkbox
      aria-label={`Select ${card.name}`}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
  );
}
