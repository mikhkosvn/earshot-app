'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteEvaluatorsMutation } from '../../../_hooks/mutations/evaluators/use-delete-evaluators-mutation';

type DeleteEvaluatorsButtonProps = {
  selectedIds: number[];
  onDeleted: () => void;
};

export function DeleteEvaluatorsButton({
  selectedIds,
  onDeleted,
}: DeleteEvaluatorsButtonProps) {
  const projectId = useCurrentProjectId();
  const [isOpen, setOpen] = useState(false);
  const deleteEvaluators = useDeleteEvaluatorsMutation();

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={selectedIds.length === 0}
        onClick={() => setOpen(true)}
      >
        <Trash2Icon />
        Delete
      </Button>
      <DeleteConfirmDialog
        open={isOpen}
        onOpenChange={setOpen}
        isPending={deleteEvaluators.isPending}
        onConfirm={() =>
          deleteEvaluators.mutate(
            { projectId, evaluatorIds: selectedIds },
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
