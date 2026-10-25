'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAlertAction } from '@/server/alerts/actions';
import type { UpdateAlertInput } from '@/server/alerts/types';

import { AlertService } from '../../_service';

export const useUpdateAlertMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AlertService.updateMutationKey,
    mutationFn: (input: UpdateAlertInput) => updateAlertAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({ queryKey: AlertService.listKey });
    },
  });
};
