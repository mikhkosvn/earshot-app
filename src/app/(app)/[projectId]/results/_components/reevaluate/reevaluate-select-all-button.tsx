'use client';

import { Button } from '@/components/ui/button';

import { useFilteredMetricOptions } from '../../_hooks/runs/use-filtered-metric-options';

interface ReevaluateSelectAllButtonProps {
  search: string;
  metricIds: readonly number[];
  onMetricIdsChange: (ids: number[]) => void;
}

export function ReevaluateSelectAllButton({
  search,
  metricIds,
  onMetricIdsChange,
}: ReevaluateSelectAllButtonProps) {
  const metrics = useFilteredMetricOptions(search);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={metrics.length === 0}
      onClick={() =>
        onMetricIdsChange([
          ...new Set([...metricIds, ...metrics.map((metric) => metric.id)]),
        ])
      }
    >
      Select All
    </Button>
  );
}
