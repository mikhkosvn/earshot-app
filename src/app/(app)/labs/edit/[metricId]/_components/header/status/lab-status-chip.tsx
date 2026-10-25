'use client';

import { useIsOptimizing } from '../../../_hooks/lab/use-is-optimizing';
import { useLab } from '../../../_hooks/lab/use-lab';
import { LabStatusChipText } from './lab-status-chip-text';

export function LabStatusChip() {
  const { rows } = useLab();
  const isOptimizing = useIsOptimizing();

  if (!isOptimizing && rows.length > 0) return null;

  return (
    <span className="rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
      <LabStatusChipText />
    </span>
  );
}
