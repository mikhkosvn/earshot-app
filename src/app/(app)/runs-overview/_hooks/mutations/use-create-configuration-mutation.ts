'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRunsOverviewConfigurationAction } from '@/server/runs-overview/actions';
import type { CreateConfigurationInput } from '@/server/runs-overview/types';

import { RunsOverviewService } from '../../_service';

export const useCreateConfigurationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: RunsOverviewService.createConfigurationMutationKey,
    mutationFn: (input: CreateConfigurationInput) =>
      createRunsOverviewConfigurationAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The dashboard is saved.');
      return queryClient.invalidateQueries({
        queryKey: RunsOverviewService.configurationsKey,
      });
    },
  });
};
