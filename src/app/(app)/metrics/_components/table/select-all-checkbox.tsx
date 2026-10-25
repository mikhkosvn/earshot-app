'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { useMetricList } from '../../_hooks/use-metric-list';
import { selectionState } from '../../_utils/selection-state';
import type { MetricSelection } from '../metrics-view';

export function SelectAllCheckbox({
  selectedIds,
  onSelectedIdsChange,
}: MetricSelection) {
  const metrics = useMetricList();
  const allIds = metrics.map((metric) => metric.id);
  const selectedCount = allIds.filter((id) => selectedIds.includes(id)).length;
  const { checked, indeterminate } = selectionState(
    selectedCount,
    allIds.length,
  );

  const handleCheckedChange = (value: boolean) => {
    if (!value) {
      onSelectedIdsChange([]);
      return;
    }
    onSelectedIdsChange(allIds);
  };

  return (
    <Checkbox
      aria-label="Select all metrics"
      checked={checked}
      indeterminate={indeterminate}
      disabled={allIds.length === 0}
      onCheckedChange={handleCheckedChange}
    />
  );
}
