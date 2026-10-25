'use client';

import { useFilteredMetricOptions } from '../../_hooks/runs/use-filtered-metric-options';
import { ReevaluateMetricItem } from './reevaluate-metric-item';
import { ReevaluateMetricsEmpty } from './reevaluate-metrics-empty';

interface ReevaluateMetricListProps {
  search: string;
  metricIds: readonly number[];
  onToggle: (id: number, checked: boolean) => void;
}

export function ReevaluateMetricList({
  search,
  metricIds,
  onToggle,
}: ReevaluateMetricListProps) {
  const metrics = useFilteredMetricOptions(search);

  return (
    <div className="flex max-h-80 min-h-24 flex-col gap-0.5 overflow-y-auto rounded-lg border p-1">
      {metrics.map((metric) => (
        <ReevaluateMetricItem
          key={metric.id}
          metric={metric}
          checked={metricIds.includes(metric.id)}
          onCheckedChange={(checked) => onToggle(metric.id, checked)}
        />
      ))}
      <ReevaluateMetricsEmpty count={metrics.length} />
    </div>
  );
}
