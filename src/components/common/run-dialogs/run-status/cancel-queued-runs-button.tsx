'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { useCancelResultMutation } from '../_hooks/mutations/use-cancel-result-mutation';
import { RunDialogService } from '../_service';
import { queuedRunCount } from '../_utils/run-status-text';

interface CancelQueuedRunsButtonProps {
  resultId: number;
}

export function CancelQueuedRunsButton({
  resultId,
}: CancelQueuedRunsButtonProps) {
  const { data: queued } = useSuspenseQuery({
    ...RunDialogService.getBatchStatusQuery({ resultId }),
    select: queuedRunCount,
  });
  const cancelResult = useCancelResultMutation();
  if (queued === 0) return null;

  return (
    <Button
      type="button"
      variant="outline"
      disabled={cancelResult.isPending}
      onClick={() => cancelResult.mutate({ resultId })}
    >
      Cancel Queued Runs
    </Button>
  );
}
