'use client';

import { useIsBuildingQuickMetric } from '../../_hooks/use-is-building-quick-metric';

export function GenerateMetricLabel() {
  const isBuilding = useIsBuildingQuickMetric();

  if (isBuilding) return 'Starting...';
  return 'Generate Metric';
}
