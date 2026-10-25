'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setPatternCorrectionAction } from '@/server/metrics/actions';
import type { SetPatternCorrectionInput } from '@/server/metrics/types';

import { MetricReviewService } from '../../_service';

export const useSetPatternCorrectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricReviewService.setCorrectionMutationKey,
    mutationFn: (input: SetPatternCorrectionInput) =>
      setPatternCorrectionAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      queryClient.setQueryData(
        MetricReviewService.getReviewQuery({ reviewId: input.reviewId })
          .queryKey,
        result.data,
      );
    },
  });
};
