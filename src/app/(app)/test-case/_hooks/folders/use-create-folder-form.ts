'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useCreateFolderMutation } from '@/app/(app)/test-case/_hooks/mutations/folders/use-create-folder-mutation';
import { folderNameFormSchema } from '@/server/folders/schemas';
import type { FolderNameFormValues } from '@/server/folders/types';

export const useCreateFolderForm = (
  parentPath: string | null,
  onCreated: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<FolderNameFormValues>({
    resolver: zodResolver(folderNameFormSchema),
    defaultValues: { name: '' },
  });
  const createFolder = useCreateFolderMutation();

  const onSubmit = form.handleSubmit((values) =>
    createFolder.mutate(
      { projectId, parentPath, name: values.name },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCreated();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: createFolder.isPending };
};
