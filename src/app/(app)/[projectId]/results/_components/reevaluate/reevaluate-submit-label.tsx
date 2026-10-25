'use client';

import { useIsReevaluating } from '../../_hooks/mutations/runs/use-is-reevaluating';

export function ReevaluateSubmitLabel() {
  const isReevaluating = useIsReevaluating();

  if (isReevaluating) return 'Starting...';
  return 'Start Reevaluation';
}
