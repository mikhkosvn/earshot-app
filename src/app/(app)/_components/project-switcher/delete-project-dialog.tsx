'use client';

import { useDeleteProjectMutation } from '@/app/(app)/_hooks/mutations/project-switcher/use-delete-project-mutation';
import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const projectId = useCurrentProjectId();
  const deleteProject = useDeleteProjectMutation();

  return (
    <DeleteConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      isPending={deleteProject.isPending}
      description="This action cannot be undone. This will permanently delete the project and everything in it."
      onConfirm={() =>
        deleteProject.mutate(
          { projectId },
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
