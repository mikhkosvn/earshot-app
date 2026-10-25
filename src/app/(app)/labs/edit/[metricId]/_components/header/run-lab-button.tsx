'use client';

import { PlayIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useIsLabRunning } from '../../_hooks/lab/use-is-lab-running';
import { useStartLabRun } from '../../_hooks/form/use-start-lab-run';
import { RunLabLabel } from './run-lab-label';

export function RunLabButton() {
  const isRunning = useIsLabRunning();
  const startRun = useStartLabRun();

  return (
    <Button type="button" disabled={isRunning} onClick={startRun}>
      <PlayIcon />
      <RunLabLabel />
    </Button>
  );
}
