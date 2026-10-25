'use client';

import { useMutation } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { improveEvaluatorTextAction } from '@/server/evaluators/actions';
import type { ImproveEvaluatorTextInput } from '@/server/evaluators/types';

export const useImproveTextMutation = () =>
  useMutation({
    mutationKey: EvaluatorService.improveTextMutationKey,
    mutationFn: (input: ImproveEvaluatorTextInput) =>
      improveEvaluatorTextAction(input),
  });
