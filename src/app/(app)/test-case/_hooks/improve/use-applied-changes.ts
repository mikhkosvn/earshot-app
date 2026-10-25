'use client';

import { type Mutation, useMutationState } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { isActionResult } from '@/lib/action-result';
import type { ApplyEvaluatorImprovementsInput } from '@/server/evaluators/types';

type ApplyMutation = Mutation<unknown, Error, ApplyEvaluatorImprovementsInput>;

export const changeKey = (evaluatorId: number, value: string) =>
  `${evaluatorId}:${value}`;

export const useAppliedChanges = () => {
  const applied = useMutationState<string[], ApplyMutation>({
    filters: { mutationKey: EvaluatorService.applyImprovementsMutationKey },
    select: (mutation) => {
      const result = mutation.state.data;
      if (!isActionResult(result) || !result.ok) return [];
      const input = mutation.state.variables;
      if (!input) return [];
      return input.changes.map((change) =>
        changeKey(change.evaluatorId, change.value),
      );
    },
  });
  return new Set(applied.flat());
};
