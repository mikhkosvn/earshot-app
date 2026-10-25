'use client';

import { useIsLabRunning } from '../../_hooks/lab/use-is-lab-running';

export function RunLabLabel() {
  const isRunning = useIsLabRunning();

  if (isRunning) return 'Running...';
  return 'Run';
}
