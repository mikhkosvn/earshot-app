'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateMetricSampleRateSchema } from '@/server/metrics/schemas';
import type {
  MetricListItem,
  UpdateMetricSampleRateInput,
} from '@/server/metrics/types';

import { useUpdateMetricSampleRateMutation } from '../mutations/row/use-update-metric-sample-rate-mutation';

export const useSamplingRateForm = (
  metric: MetricListItem,
  onSaved: () => void,
) => {
  const form = useForm<UpdateMetricSampleRateInput>({
    resolver: zodResolver(updateMetricSampleRateSchema),
    defaultValues: { metricId: metric.id, sampleRate: metric.sampleRate },
  });
  const updateSampleRate = useUpdateMetricSampleRateMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateSampleRate.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved();
      },
    }),
  );

  return { form, onSubmit };
};
