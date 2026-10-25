'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import type { FolderView } from '@/server/folders/types';

import { useDeleteFolderMutation } from '../../../_hooks/mutations/folders/use-delete-folder-mutation';

type DeleteFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder: FolderView;
};

export function DeleteFolderDialog({
  open,
  onOpenChange,
  folder,
}: DeleteFolderDialogProps) {
  const projectId = useCurrentProjectId();
  const deleteFolder = useDeleteFolderMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deleteFolder.isPending}
      description={`This action cannot be undone. The folder "${folder.name}", its subfolders, and all ${folder.evaluatorCount} evaluator(s) in it will be deleted.`}
      onConfirm={() =>
        deleteFolder.mutate(
          { projectId, path: folder.path },
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
