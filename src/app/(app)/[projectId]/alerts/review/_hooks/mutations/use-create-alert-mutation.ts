'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAlertAction } from '@/server/alerts/actions';
import type { CreateAlertInput } from '@/server/alerts/types';

import { AlertService } from '../../_service';

export const useCreateAlertMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AlertService.createMutationKey,
    mutationFn: (input: CreateAlertInput) => createAlertAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The alert is created.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: AlertService.listKey }),
        queryClient.invalidateQueries({ queryKey: AlertService.reviewKey }),
      ]);
    },
  });
};
