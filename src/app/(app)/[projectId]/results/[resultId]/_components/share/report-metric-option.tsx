'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ResultReportMetric } from '@/server/results/types';

type ReportMetricOptionProps = {
  metric: ResultReportMetric;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function ReportMetricOption({
  metric,
  checked,
  onCheckedChange,
}: ReportMetricOptionProps) {
  return (
    <Label className="items-start gap-2.5 font-normal">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value)}
        className="mt-0.5"
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-medium">{metric.name}</span>
        <span className="text-xs text-muted-foreground">
          Score: {metric.score.toFixed(2)}
        </span>
      </span>
    </Label>
  );
}
