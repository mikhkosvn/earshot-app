'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { setNewCategoryAlertAction } from '@/server/insights/actions';
import type { NewCategoryAlertInput } from '@/server/insights/types';

import { InsightService } from '../../_service';

const messageOf = (enabled: boolean) => {
  if (enabled) return 'You get an alert for each new category.';
  return 'New category alerts are off.';
};

export const useNewCategoryAlertMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.newCategoryAlertMutationKey,
    mutationFn: (input: NewCategoryAlertInput) =>
      setNewCategoryAlertAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success(messageOf(input.enabled));
      return queryClient.invalidateQueries({
        queryKey: InsightService.overviewKey,
      });
    },
  });
};
