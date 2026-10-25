'use client';

import { useMutation } from '@tanstack/react-query';

import { improveMetricAction } from '@/server/metrics/actions';
import type { ImproveMetricInput } from '@/server/metrics/types';

import { MetricFormService } from '../../_service';

export const useImproveMetricMutation = () =>
  useMutation({
    mutationKey: MetricFormService.improveMutationKey,
    mutationFn: (input: ImproveMetricInput) => improveMetricAction(input),
  });
