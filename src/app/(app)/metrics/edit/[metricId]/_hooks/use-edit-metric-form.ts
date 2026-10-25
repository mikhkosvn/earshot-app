'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type EditMetricFormInput,
  editMetricFormSchema,
  type EditMetricFormValues,
} from '../_schemas/edit-metric-form-schema';
import { toEditFormValues } from '../_utils/edit-form-values';
import { useUpdateMetricMutation } from './mutations/use-update-metric-mutation';
import { useMetricDetail } from './use-metric-detail';

export const useEditMetricForm = () => {
  const metric = useMetricDetail();
  const form = useForm<EditMetricFormInput, unknown, EditMetricFormValues>({
    resolver: zodResolver(editMetricFormSchema),
    mode: 'onTouched',
    disabled: !metric.editable,
    defaultValues: toEditFormValues(metric),
  });
  const updateMetric = useUpdateMetricMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateMetric.mutate(
      { metricId: metric.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(values);
        },
      },
    ),
  );

  return { form, onSubmit };
};
