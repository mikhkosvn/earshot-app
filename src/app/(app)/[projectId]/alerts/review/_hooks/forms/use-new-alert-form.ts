'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { AlertType } from '@/generated/prisma/enums';
import { createAlertSchema } from '@/server/alerts/schemas';
import type { CreateAlertInput } from '@/server/alerts/types';

import { useCreateAlertMutation } from '../mutations/use-create-alert-mutation';

export const useNewAlertForm = (onCreated: () => void) => {
  const projectId = useCurrentProjectId();
  const form = useForm<CreateAlertInput>({
    resolver: zodResolver(createAlertSchema),
    defaultValues: {
      projectId,
      metricId: 0,
      name: '',
      params: { type: AlertType.normal },
    },
  });
  const createAlert = useCreateAlertMutation();

  const onSubmit = form.handleSubmit((values) =>
    createAlert.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        form.reset();
        onCreated();
      },
    }),
  );

  return { form, onSubmit };
};
