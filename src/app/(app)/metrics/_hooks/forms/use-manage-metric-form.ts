'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateMetricAgentsSchema } from '@/server/metrics/schemas';
import type {
  MetricListItem,
  UpdateMetricAgentsInput,
} from '@/server/metrics/types';

import { useUpdateMetricAgentsMutation } from '../mutations/row/use-update-metric-agents-mutation';

export const useManageMetricForm = (
  metric: MetricListItem,
  onSaved: () => void,
) => {
  const form = useForm<UpdateMetricAgentsInput>({
    resolver: zodResolver(updateMetricAgentsSchema),
    defaultValues: {
      metricId: metric.id,
      agentIds: metric.agentIds,
      addToNewAgents: metric.addToNewAgents,
    },
  });
  const updateAgents = useUpdateMetricAgentsMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateAgents.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved();
      },
    }),
  );

  return { form, onSubmit };
};
