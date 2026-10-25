'use client';

import { useMutation } from '@tanstack/react-query';

import { generateEvaluationTriggerAction } from '@/server/metrics/actions';
import type { GenerateEvaluationTriggerInput } from '@/server/metrics/types';

import { MetricFormService } from '../../_service';

export const useGenerateTriggerMutation = () =>
  useMutation({
    mutationKey: MetricFormService.generateTriggerMutationKey,
    mutationFn: (input: GenerateEvaluationTriggerInput) =>
      generateEvaluationTriggerAction(input),
  });
