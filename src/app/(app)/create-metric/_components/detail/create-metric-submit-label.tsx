'use client';

import { useIsCreatingMetric } from '../../_hooks/use-is-creating-metric';

export function CreateMetricSubmitLabel() {
  const isCreating = useIsCreatingMetric();

  if (isCreating) return 'Creating...';
  return 'Create Metric';
}
