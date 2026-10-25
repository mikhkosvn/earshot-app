'use client';

import { MetricEvalTypeLabel } from '@/server/metrics/constants/metric-eval-type-labels';

import { useLabMetric } from '../../_hooks/lab/use-lab-metric';
import { AutoImproveButton } from './auto-improve-button';
import { BackToLabsButton } from './back-to-labs-button';
import { LabStatusChip } from './status/lab-status-chip';
import { RunLabButton } from './run-lab-button';
import { SaveLabMetricButton } from './save-lab-metric-button';

export function LabEditorHeader() {
  const metric = useLabMetric();

  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <BackToLabsButton />
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate text-base font-semibold">{metric.name}</h1>
          <span className="text-sm text-muted-foreground">
            {MetricEvalTypeLabel[metric.evalType]}
          </span>
        </div>
        <LabStatusChip />
      </div>
      <div className="flex items-center gap-2">
        <AutoImproveButton />
        <SaveLabMetricButton />
        <RunLabButton />
      </div>
    </div>
  );
}
