'use client';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDismissJobMutation } from '@/hooks/jobs/use-dismiss-job-mutation';

type RemoveTaskButtonProps = {
  jobId: string;
  onDismiss: () => void;
};

export function RemoveTaskButton({ jobId, onDismiss }: RemoveTaskButtonProps) {
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
      aria-label="Remove task"
      disabled={dismissJob.isPending}
      onClick={remove}
    >
      <XIcon />
    </Button>
  );
}
