'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import {
  webhookFormSchema,
  type WebhookFormValues,
} from '../_schemas/webhook-form-schema';
import {
  toWebhookFormValues,
  toWebhookSettingsValues,
} from '../_utils/webhook-form-values';
import { useSaveWebhookMutation } from './mutations/use-save-webhook-mutation';
import { useWebhookSettings } from './use-webhook-settings';

export const useWebhookForm = () => {
  const projectId = useCurrentProjectId();
  const settings = useWebhookSettings();
  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: toWebhookFormValues(settings),
  });
  const saveWebhook = useSaveWebhookMutation();

  const onSubmit = form.handleSubmit((values) => {
    const settingsValues = toWebhookSettingsValues(values);
    saveWebhook.mutate(
      { projectId, ...settingsValues },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset({ ...values, secret: '' });
        },
      },
    );
  });

  return { form, onSubmit };
};
