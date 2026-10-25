'use client';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';

import { useDeletePhoneNumberMutation } from '../../_hooks/mutations/use-delete-phone-number-mutation';

type DeletePhoneNumberDialogProps = {
  phoneNumberId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeletePhoneNumberDialog({
  phoneNumberId,
  open,
  onOpenChange,
}: DeletePhoneNumberDialogProps) {
  const deletePhoneNumber = useDeletePhoneNumberMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deletePhoneNumber.isPending}
      description="This action cannot be undone. This will permanently delete the phone number and its saved credentials."
      onConfirm={() =>
        deletePhoneNumber.mutate(
          { phoneNumberId },
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
