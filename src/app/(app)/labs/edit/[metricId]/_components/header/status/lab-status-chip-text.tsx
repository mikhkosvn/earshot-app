'use client';

import { useIsOptimizing } from '../../../_hooks/lab/use-is-optimizing';

export function LabStatusChipText() {
  const isOptimizing = useIsOptimizing();

  if (isOptimizing) return 'Auto improve is in progress';
  return 'You need at least 1 review to auto improve';
}
