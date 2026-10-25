'use client';

import { useCurrentSpecCheck } from '../_hooks/use-current-spec-check';
import { useIsRunningSpec } from '../_hooks/use-is-running-spec';
import type { RunFromFileForm } from '../_hooks/use-run-from-file-form';
import { runCountText } from '../_utils/run-dialog-text';

type RunSpecLabelProps = {
  control: RunFromFileForm['control'];
};

export function RunSpecLabel({ control }: RunSpecLabelProps) {
  const check = useCurrentSpecCheck(control);
  const isRunning = useIsRunningSpec();

  if (isRunning) return 'Starting...';
  if (!check?.valid) return 'Run';
  return `Run ${runCountText(check.plan.totalRuns)}`;
}
