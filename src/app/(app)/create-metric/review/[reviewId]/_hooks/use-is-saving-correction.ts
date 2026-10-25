'use client';

import { useIsMutating } from '@tanstack/react-query';

import { MetricReviewService } from '../_service';

export const useIsSavingCorrection = () =>
  useIsMutating({
    mutationKey: MetricReviewService.setCorrectionMutationKey,
  }) > 0;
