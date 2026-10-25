'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { alertFiltersSchema } from '@/server/alerts/schemas';
import type { AlertFilters, AlertRow } from '@/server/alerts/types';

import { useUpdateAlertMutation } from '../mutations/use-update-alert-mutation';

export const useAlertFilterForm = (alert: AlertRow, onSaved: () => void) => {
  const form = useForm<AlertFilters>({
    resolver: zodResolver(alertFiltersSchema),
    defaultValues: alert.filters,
  });
  const updateAlert = useUpdateAlertMutation();

  const onSubmit = form.handleSubmit((filters) =>
    updateAlert.mutate(
      { alertId: alert.id, filters },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          toast.success('The filter is saved.');
          form.reset(filters);
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: updateAlert.isPending };
};
