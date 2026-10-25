'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { JobKind } from '@/generated/prisma/enums';
import { useDismissJobMutation } from '@/hooks/jobs/use-dismiss-job-mutation';

import { removeTaskLabel } from '../_utils/panel-labels';

type RemoveTaskButtonProps = {
  jobId: string;
  kind: JobKind;
  onDismiss: () => void;
};

export function RemoveTaskButton({
  jobId,
  kind,
  onDismiss,
}: RemoveTaskButtonProps) {
  const dismissJob = useDismissJobMutation();

  const remove = () =>
    dismissJob.mutate(
      { jobId },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDismiss();
        },
      },
    );

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={removeTaskLabel(kind)}
      disabled={dismissJob.isPending}
      onClick={remove}
    >
      <XIcon />
    </Button>
  );
}
