'use client';

import { useIsUpdatingMetric } from '../../_hooks/use-is-updating-metric';

export function UpdateMetricLabel() {
  const isUpdating = useIsUpdatingMetric();

  if (isUpdating) return 'Updating...';
  return 'Update Metric';
}
