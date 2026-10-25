'use client';

import { cn } from '@/lib/utils';

import { LAB_GRID_CLASS } from '../_constants/labs-text';
import { useLabMetrics } from '../_hooks/use-lab-metrics';
import { LabMetricRow } from './lab-metric-row';
import { LabMetricsEmpty } from './lab-metrics-empty';

export function LabMetricsTable() {
  const metrics = useLabMetrics();

  return (
    <div role="table" aria-label="Lab metrics" className="flex flex-col gap-1.5">
      <div
        role="row"
        className={cn(
          LAB_GRID_CLASS,
          'rounded-md bg-muted px-3 py-2.5 text-xs text-muted-foreground',
        )}
      >
        <span role="columnheader">ID</span>
        <span role="columnheader">Metric Name</span>
        <span role="columnheader">Type</span>
        <span role="columnheader">Description</span>
        <span role="columnheader" className="text-right">
          Overall score
        </span>
      </div>
      <LabMetricsEmpty />
      {metrics.map((metric) => (
        <LabMetricRow key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
