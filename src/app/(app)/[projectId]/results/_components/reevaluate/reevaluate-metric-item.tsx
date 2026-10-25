'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { MetricOption } from '@/server/metrics/types';

interface ReevaluateMetricItemProps {
  metric: MetricOption;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ReevaluateMetricItem({
  metric,
  checked,
  onCheckedChange,
}: ReevaluateMetricItemProps) {
  const id = `reevaluate-metric-${metric.id}`;

  return (
    <Label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs font-normal hover:bg-muted"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value)}
      />
      <span className="font-mono text-muted-foreground">{metric.id}</span>
      <span className="truncate">{metric.name}</span>
    </Label>
  );
}
