'use client';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';

import { useDeleteMonitorMutation } from '../../../_hooks/mutations/use-delete-monitor-mutation';

type DeleteMonitorDialogProps = {
  monitorId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteMonitorDialog({
  monitorId,
  open,
  onOpenChange,
}: DeleteMonitorDialogProps) {
  const deleteMonitor = useDeleteMonitorMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deleteMonitor.isPending}
      description="This action cannot be undone. This will permanently delete the monitor and its run history."
      onConfirm={() =>
        deleteMonitor.mutate(
          { monitorId },
          {
            onSuccess: (result) => {
              if (!result.ok) return;
              onOpenChange(false);
            },
          },
        )
      }
    />
  );
}
