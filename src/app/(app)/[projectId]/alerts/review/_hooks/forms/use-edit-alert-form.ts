'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import type { AlertRow } from '@/server/alerts/types';

import {
  editAlertFormSchema,
  type EditAlertFormValues,
} from '../../_schemas/edit-alert-form-schema';
import { paramsOfRow } from '../../_utils/alert-params';
import { useUpdateAlertMutation } from '../mutations/use-update-alert-mutation';

export const useEditAlertForm = (alert: AlertRow, onSaved: () => void) => {
  const form = useForm<EditAlertFormValues>({
    resolver: zodResolver(editAlertFormSchema),
    defaultValues: { name: alert.name, params: paramsOfRow(alert) },
  });
  const updateAlert = useUpdateAlertMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateAlert.mutate(
      { alertId: alert.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The alert is saved.');
          form.reset(values);
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: updateAlert.isPending };
};
