'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useRenameFolderMutation } from '@/app/(app)/test-case/_hooks/mutations/folders/use-rename-folder-mutation';
import { folderNameFormSchema } from '@/server/folders/schemas';
import type { FolderNameFormValues, FolderView } from '@/server/folders/types';

export const useRenameFolderForm = (
  folder: FolderView,
  onRenamed: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<FolderNameFormValues>({
    resolver: zodResolver(folderNameFormSchema),
    defaultValues: { name: folder.name },
  });
  const renameFolder = useRenameFolderMutation();

  const onSubmit = form.handleSubmit((values) =>
    renameFolder.mutate(
      { projectId, path: folder.path, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onRenamed();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: renameFolder.isPending };
};
