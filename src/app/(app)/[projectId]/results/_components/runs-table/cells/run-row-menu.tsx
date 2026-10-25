'use client';

import { EllipsisVerticalIcon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { RunRow } from '@/server/results/types';

import { useAddRunsToLabMutation } from '../../../_hooks/mutations/runs/use-add-runs-to-lab-mutation';
import { useDeleteRunsMutation } from '../../../_hooks/mutations/runs/use-delete-runs-mutation';

interface RunRowMenuProps {
  run: RunRow;
  onOpenRun: (run: RunRow) => void;
}

export function RunRowMenu({ run, onOpenRun }: RunRowMenuProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const addToLab = useAddRunsToLabMutation();
  const deleteRuns = useDeleteRunsMutation();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for run ${run.id}`}
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem className="text-xs" onClick={() => onOpenRun(run)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onClick={() => addToLab.mutate([run.id])}
          >
            Add to Lab
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteRuns.isPending}
        description="This action cannot be undone. This will permanently delete the run and its recording."
        onConfirm={() =>
          deleteRuns.mutate(
            { resultId: run.resultId, runIds: [run.id] },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setDeleteOpen(false);
              },
            },
          )
        }
      />
    </>
  );
}
