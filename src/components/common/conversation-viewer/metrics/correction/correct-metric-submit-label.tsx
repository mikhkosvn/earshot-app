'use client';

import { useIsCorrectingMetric } from '../../_hooks/use-is-correcting-metric';

export function CorrectMetricSubmitLabel() {
  const isCorrecting = useIsCorrectingMetric();

  if (isCorrecting) return 'Adding...';
  return 'Add to Lab';
}
