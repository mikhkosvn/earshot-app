'use client';

import { useMutation } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { proposeEvaluatorImprovementsAction } from '@/server/evaluators/actions';
import type { ProposeEvaluatorImprovementsInput } from '@/server/evaluators/types';

export const useProposeImprovementsMutation = () =>
  useMutation({
    mutationKey: EvaluatorService.proposeImprovementsMutationKey,
    mutationFn: (input: ProposeEvaluatorImprovementsInput) =>
      proposeEvaluatorImprovementsAction(input),
  });
