'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteRunsMutation } from '../../../../_hooks/mutations/runs/use-delete-runs-mutation';
import { useResultId } from '../../../../_hooks/use-result-id';

interface DeleteRunsButtonProps {
  selectedIds: number[];
  onDeleted: () => void;
}

export function DeleteRunsButton({
  selectedIds,
  onDeleted,
}: DeleteRunsButtonProps) {
  const [open, setOpen] = useState(false);
  const resultId = useResultId();
  const deleteRuns = useDeleteRunsMutation();

  return (
    <>
      <Button
        variant="destructive"
        size="icon-sm"
        aria-label="Delete selected runs"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        isPending={deleteRuns.isPending}
        description="This action cannot be undone. This will permanently delete the selected runs and their recordings."
        onConfirm={() =>
          deleteRuns.mutate(
            { resultId, runIds: selectedIds },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setOpen(false);
                onDeleted();
              },
            },
          )
        }
      />
    </>
  );
}
