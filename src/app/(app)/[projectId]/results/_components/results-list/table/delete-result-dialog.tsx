'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';

import { useDeleteResultsMutation } from '../../../_hooks/mutations/results-list/use-delete-results-mutation';

const DELETE_DESCRIPTION =
  'This action cannot be undone. This will permanently delete the result and its runs.';

interface DeleteResultDialogProps {
  resultId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (resultId: number) => void;
}

export function DeleteResultDialog({
  resultId,
  open,
  onOpenChange,
  onDeleted,
}: DeleteResultDialogProps) {
  const projectId = useCurrentProjectId();
  const deleteResults = useDeleteResultsMutation();

  const confirm = () =>
    deleteResults.mutate(
      { projectId, resultIds: [resultId] },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onOpenChange(false);
          onDeleted(resultId);
        },
      },
    );

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={confirm}
      isPending={deleteResults.isPending}
      description={DELETE_DESCRIPTION}
    />
  );
}
