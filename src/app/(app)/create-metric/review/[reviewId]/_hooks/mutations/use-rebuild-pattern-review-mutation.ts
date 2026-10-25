'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { JobService } from '@/components/common/background-tasks/_service';
import { rebuildPatternReviewAction } from '@/server/metrics/actions';
import type { ReviewIdInput } from '@/server/metrics/types';

import { MetricReviewService } from '../../_service';
import { useMetricsListUrl } from '../use-metrics-list-url';

export const useRebuildPatternReviewMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const metricsUrl = useMetricsListUrl();

  return useMutation({
    mutationKey: MetricReviewService.rebuildMutationKey,
    mutationFn: (input: ReviewIdInput) => rebuildPatternReviewAction(input),
    onSuccess: async (result, input) => {
      if (!result.ok) return;
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
        queryClient.invalidateQueries({
          queryKey: MetricReviewService.getReviewQuery({
            reviewId: input.reviewId,
          }).queryKey,
        }),
      ]);
      router.push(metricsUrl);
    },
  });
};
