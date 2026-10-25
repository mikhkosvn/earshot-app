'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { PredefinedMetricCard } from '@/server/metrics/types';

type PredefinedSelectAllProps = {
  cards: PredefinedMetricCard[];
  selectedCodes: string[];
  onSelectedCodesChange: (codes: string[]) => void;
};

export function PredefinedSelectAll({
  cards,
  selectedCodes,
  onSelectedCodesChange,
}: PredefinedSelectAllProps) {
  const codes = cards.map((card) => card.code);
  const allSelected =
    codes.length > 0 && codes.every((code) => selectedCodes.includes(code));

  const handleCheckedChange = (checked: boolean) => {
    const rest = selectedCodes.filter((code) => !codes.includes(code));
    if (!checked) {
      onSelectedCodesChange(rest);
      return;
    }
    onSelectedCodesChange([...rest, ...codes]);
  };

  return (
    <label className="flex cursor-pointer items-center gap-2 px-3 py-2.5 text-xs">
      <Checkbox
        checked={allSelected}
        disabled={codes.length === 0}
        onCheckedChange={handleCheckedChange}
      />
      Select All
    </label>
  );
}
