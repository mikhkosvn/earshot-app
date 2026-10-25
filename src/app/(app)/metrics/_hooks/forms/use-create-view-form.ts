'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { createSavedViewSchema } from '@/server/saved-views/schemas';
import type { CreateSavedViewInput } from '@/server/saved-views/types';

import { useCreateSavedViewMutation } from '../mutations/use-create-saved-view-mutation';

export const useCreateViewForm = (onCreated: () => void) => {
  const projectId = useCurrentProjectId();
  const form = useForm<CreateSavedViewInput>({
    resolver: zodResolver(createSavedViewSchema),
    defaultValues: { projectId, name: '', agentIds: [] },
  });
  const createView = useCreateSavedViewMutation();

  const onSubmit = form.handleSubmit((values) =>
    createView.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onCreated();
      },
    }),
  );

  return { form, onSubmit };
};
