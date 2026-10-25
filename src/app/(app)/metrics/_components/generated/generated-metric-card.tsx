'use client';

import { Checkbox } from '@/components/ui/checkbox';
import type { GeneratedMetricDraft } from '@/server/metrics/types';

type GeneratedMetricCardProps = {
  draft: GeneratedMetricDraft;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function GeneratedMetricCard({
  draft,
  checked,
  onCheckedChange,
}: GeneratedMetricCardProps) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-lg border p-3 text-xs hover:bg-muted/30">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-medium text-foreground">{draft.name}</span>
        <p className="whitespace-pre-line text-muted-foreground">
          {draft.description}
        </p>
      </div>
      <Checkbox
        aria-label={`Select ${draft.name}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </label>
  );
}
