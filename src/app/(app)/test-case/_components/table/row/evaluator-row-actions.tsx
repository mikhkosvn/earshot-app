'use client';

import { CopyIcon, EllipsisIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { EvaluatorListRow } from '@/server/evaluators/types';
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';

import { useDuplicateEvaluatorsMutation } from '../../../_hooks/mutations/evaluator-actions/use-duplicate-evaluators-mutation';
import { useDeleteEvaluatorsMutation } from '../../../_hooks/mutations/evaluators/use-delete-evaluators-mutation';

type EvaluatorRowActionsProps = {
  row: EvaluatorListRow;
};

export function EvaluatorRowActions({ row }: EvaluatorRowActionsProps) {
  const projectId = useCurrentProjectId();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const duplicateEvaluators = useDuplicateEvaluatorsMutation();
  const deleteEvaluators = useDeleteEvaluatorsMutation();
  const evaluatorIds = [row.id];

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="outline"
        size="icon-xs"
        aria-label={`Edit evaluator ${row.id}`}
        nativeButton={false}
        render={
          <Link
            href={UrlGenerator.evaluator({
              evaluatorId: row.id,
              values: { project: projectId },
            })}
          />
        }
      >
        <PencilIcon />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`More actions for evaluator ${row.id}`}
            />
          }
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            onClick={() =>
              duplicateEvaluators.mutate({
                projectId,
                evaluatorIds,
                targetProjectId: projectId,
                agentId: null,
                folderPath: row.folderPath ?? DEFAULT_FOLDER_PATH,
              })
            }
          >
            <CopyIcon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteEvaluators.isPending}
        description={`This action cannot be undone. The evaluator "${row.name}" will be deleted.`}
        onConfirm={() =>
          deleteEvaluators.mutate(
            { projectId, evaluatorIds },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setDeleteOpen(false);
              },
            },
          )
        }
      />
    </div>
  );
}
