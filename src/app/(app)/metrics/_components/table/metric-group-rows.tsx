'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { MetricListItem } from '@/server/metrics/types';

import { toggleItem } from '../../_utils/toggle-item';
import type { MetricSelection } from '../metrics-view';
import { MetricRow } from '../row/metric-row';

interface MetricGroupRowsProps extends MetricSelection {
  metrics: readonly MetricListItem[];
  collapsed: boolean;
}

export function MetricGroupRows({
  metrics,
  collapsed,
  selectedIds,
  onSelectedIdsChange,
}: MetricGroupRowsProps) {
  if (collapsed) return null;
  if (metrics.length === 0) {
    return (
      <p className="px-3 py-4 text-xs text-muted-foreground">No metrics</p>
    );
  }

  return (
    <SortableContext
      items={metrics.map((metric) => metric.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col divide-y border-t">
        {metrics.map((metric) => (
          <MetricRow
            key={metric.id}
            metric={metric}
            selected={selectedIds.includes(metric.id)}
            onSelectedChange={(checked) =>
              onSelectedIdsChange(toggleItem(selectedIds, metric.id, checked))
            }
          />
        ))}
      </div>
    </SortableContext>
  );
}
