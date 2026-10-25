'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { dismissCategoryAction } from '@/server/insights/actions';
import type { CategoryIdInput } from '@/server/insights/types';

import { InsightService } from '../../_service';

export const useDismissCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.dismissCategoryMutationKey,
    mutationFn: (input: CategoryIdInput) => dismissCategoryAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The category is dismissed.');
      return queryClient.invalidateQueries({
        queryKey: InsightService.overviewKey,
      });
    },
  });
};
