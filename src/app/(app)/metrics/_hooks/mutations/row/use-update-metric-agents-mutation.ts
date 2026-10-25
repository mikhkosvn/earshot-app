'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { updateMetricAgentsAction } from '@/server/metrics/actions';
import type { UpdateMetricAgentsInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';
import { replaceMetric } from '../../../_utils/metric-cache';

export const useUpdateMetricAgentsMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: MetricService.updateAgentsMutationKey,
    mutationFn: (input: UpdateMetricAgentsInput) =>
      updateMetricAgentsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The agents of the metric are saved.');
      const listKey = MetricService.getProjectListKey({ projectId });
      queryClient.setQueriesData(
        { queryKey: listKey },
        replaceMetric(result.data),
      );
      return queryClient.invalidateQueries({ queryKey: listKey });
    },
  });
};
