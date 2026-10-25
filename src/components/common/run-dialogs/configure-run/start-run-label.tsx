'use client';

import { useIsStartingRun } from '../_hooks/use-is-starting-run';

export function StartRunLabel() {
  const isStarting = useIsStartingRun();

  if (isStarting) return 'Starting...';
  return 'Run';
}
