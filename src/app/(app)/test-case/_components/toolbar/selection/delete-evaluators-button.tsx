'use client';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteEvaluatorsMutation } from '../../../_hooks/mutations/evaluators/use-delete-evaluators-mutation';
import { useClearEvaluatorSelection } from '../../../_hooks/table/use-clear-evaluator-selection';
import { useSelectedEvaluatorIds } from '../../../_hooks/table/use-selected-evaluator-ids';

export function DeleteEvaluatorsButton() {
  const projectId = useCurrentProjectId();
  const selectedIds = useSelectedEvaluatorIds();
  const clearSelection = useClearEvaluatorSelection();
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
                clearSelection();
              },
            },
          )
        }
      />
    </>
  );
}
