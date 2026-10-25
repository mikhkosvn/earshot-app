'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAlertAction } from '@/server/alerts/actions';
import type { AlertIdInput } from '@/server/alerts/types';

import { AlertService } from '../../_service';

export const useDeleteAlertMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AlertService.deleteMutationKey,
    mutationFn: (input: AlertIdInput) => deleteAlertAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The alert is deleted.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: AlertService.listKey }),
        queryClient.invalidateQueries({ queryKey: AlertService.reviewKey }),
        queryClient.invalidateQueries({ queryKey: AlertService.fireCountsKey }),
      ]);
    },
  });
};
