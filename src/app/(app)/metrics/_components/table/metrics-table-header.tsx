'use client';

import { cn } from '@/lib/utils';

import { METRIC_GRID_CLASS } from '../../_constants/metric-grid';
import { MetricFlag, MetricFlagLabel } from '../../_constants/metric-flag';
import type { MetricSelection } from '../metrics-view';
import { SelectAllCheckbox } from './select-all-checkbox';

export function MetricsTableHeader({
  selectedIds,
  onSelectedIdsChange,
}: MetricSelection) {
  return (
    <div
      className={cn(
        METRIC_GRID_CLASS,
        'h-10 border-b bg-muted/50 text-xs font-medium text-foreground',
      )}
    >
      <SelectAllCheckbox
        selectedIds={selectedIds}
        onSelectedIdsChange={onSelectedIdsChange}
      />
      <span />
      <span />
      <span>ID</span>
      <span>Name</span>
      <span>Metric Type</span>
      <span>Evaluation Trigger</span>
      {Object.values(MetricFlag).map((flag) => (
        <span key={flag}>{MetricFlagLabel[flag]}</span>
      ))}
      <span>Action</span>
    </div>
  );
}
