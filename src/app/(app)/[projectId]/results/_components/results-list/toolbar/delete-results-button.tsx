'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteResultsMutation } from '../../../_hooks/mutations/results-list/use-delete-results-mutation';

const DELETE_DESCRIPTION =
  'This action cannot be undone. This will permanently delete the selected results and their runs.';

type DeleteResultsButtonProps = {
  selectedIds: number[];
  onDeleted: () => void;
};

export function DeleteResultsButton({
  selectedIds,
  onDeleted,
}: DeleteResultsButtonProps) {
  const [open, setOpen] = useState(false);
  const projectId = useCurrentProjectId();
  const deleteResults = useDeleteResultsMutation();

  const confirm = () =>
    deleteResults.mutate(
      { projectId, resultIds: selectedIds },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          setOpen(false);
          onDeleted();
        },
      },
    );

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        aria-label="Delete selected results"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={confirm}
        isPending={deleteResults.isPending}
        description={DELETE_DESCRIPTION}
      />
    </>
  );
}
