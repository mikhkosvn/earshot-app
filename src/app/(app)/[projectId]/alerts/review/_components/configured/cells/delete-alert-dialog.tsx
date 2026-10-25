'use client';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';

import { useDeleteAlertMutation } from '../../../_hooks/mutations/use-delete-alert-mutation';

type DeleteAlertDialogProps = {
  alertId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteAlertDialog({
  alertId,
  open,
  onOpenChange,
}: DeleteAlertDialogProps) {
  const deleteAlert = useDeleteAlertMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deleteAlert.isPending}
      description="This action cannot be undone. This will permanently delete the alert and its fire history."
      onConfirm={() =>
        deleteAlert.mutate(
          { alertId },
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
