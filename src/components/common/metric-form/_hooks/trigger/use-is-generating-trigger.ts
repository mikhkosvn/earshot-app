'use client';

import { useIsMutating } from '@tanstack/react-query';

import { MetricFormService } from '../../_service';

export const useIsGeneratingTrigger = () =>
  useIsMutating({
    mutationKey: MetricFormService.generateTriggerMutationKey,
  }) > 0;
