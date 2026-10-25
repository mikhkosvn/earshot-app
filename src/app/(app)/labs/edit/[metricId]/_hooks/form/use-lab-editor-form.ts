'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type LabMetricFormInput,
  labMetricFormSchema,
  type LabMetricFormValues,
} from '../../_schemas/lab-metric-form-schema';
import { toLabFormValues } from '../../_utils/lab-form-values';
import { useLabMetric } from '../lab/use-lab-metric';
import { useSaveLabMetricMutation } from '../mutations/use-save-lab-metric-mutation';

export const useLabEditorForm = () => {
  const metric = useLabMetric();
  const form = useForm<LabMetricFormInput, unknown, LabMetricFormValues>({
    resolver: zodResolver(labMetricFormSchema),
    mode: 'onTouched',
    disabled: !metric.editable,
    defaultValues: toLabFormValues(metric),
  });
  const saveMetric = useSaveLabMetricMutation();

  const onSubmit = form.handleSubmit((values) =>
    saveMetric.mutate(
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
