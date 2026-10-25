'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import { ApiKeyLevel } from '@/server/api-keys/constants/api-key-level';

import {
  createApiKeyFormSchema,
  type CreateApiKeyFormValues,
} from '../_schemas/create-api-key-form-schema';
import { projectIdForLevel } from '../_utils/api-key-values';
import type { useCreateApiKeyMutation } from './mutations/use-create-api-key-mutation';

type CreateApiKeyMutation = ReturnType<typeof useCreateApiKeyMutation>;

export const useCreateApiKeyForm = (createApiKey: CreateApiKeyMutation) => {
  const project = useCurrentProject();
  const form = useForm<CreateApiKeyFormValues>({
    resolver: zodResolver(createApiKeyFormSchema),
    defaultValues: { name: '', level: ApiKeyLevel.organization },
  });

  const onSubmit = form.handleSubmit((values) =>
    createApiKey.mutate(
      {
        organizationId: project.organizationId,
        name: values.name,
        projectId: projectIdForLevel(values.level, project.id),
      },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The API key is created.');
        },
      },
    ),
  );

  return { form, onSubmit };
};
