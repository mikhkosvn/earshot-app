'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createSavedViewAction } from '@/server/saved-views/actions';
import type { CreateSavedViewInput } from '@/server/saved-views/types';

import { MetricService } from '../../_service';

export const useCreateSavedViewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.createViewMutationKey,
    mutationFn: (input: CreateSavedViewInput) => createSavedViewAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The view is created.');
      return queryClient.invalidateQueries({
        queryKey: MetricService.getSavedViewsQuery({
          projectId: input.projectId,
        }).queryKey,
      });
    },
  });
};
