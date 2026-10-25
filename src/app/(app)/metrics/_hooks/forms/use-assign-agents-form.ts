'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { assignMetricAgentsSchema } from '@/server/metrics/schemas';
import type { AssignMetricAgentsInput } from '@/server/metrics/types';

import { useAssignMetricAgentsMutation } from '../mutations/bulk/use-assign-metric-agents-mutation';

export const useAssignAgentsForm = (
  metricIds: number[],
  onSaved: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<AssignMetricAgentsInput>({
    resolver: zodResolver(assignMetricAgentsSchema),
    defaultValues: { projectId, metricIds, agentIds: [] },
  });
  const assignAgents = useAssignMetricAgentsMutation();

  const onSubmit = form.handleSubmit((values) =>
    assignAgents.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved();
      },
    }),
  );

  return { form, onSubmit };
};
