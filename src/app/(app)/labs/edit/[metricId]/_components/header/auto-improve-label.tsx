'use client';

import { useIsOptimizing } from '../../_hooks/lab/use-is-optimizing';

export function AutoImproveLabel() {
  const isOptimizing = useIsOptimizing();

  if (isOptimizing) return 'Processing...';
  return 'Auto Improve';
}
