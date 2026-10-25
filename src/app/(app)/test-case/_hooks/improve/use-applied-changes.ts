'use client';

import { useMutationState } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import type { ActionResult } from '@/lib/action-result';
import type { ApplyEvaluatorImprovementsInput } from '@/server/evaluators/types';

export const changeKey = (evaluatorId: number, value: string) =>
  `${evaluatorId}:${value}`;

export const useAppliedChanges = () => {
  const applied = useMutationState({
    filters: { mutationKey: EvaluatorService.applyImprovementsMutationKey },
    select: (mutation) => {
      const result = mutation.state.data as ActionResult<unknown> | undefined;
      if (!result?.ok) return [];
      const input = mutation.state.variables as ApplyEvaluatorImprovementsInput;
      return input.changes.map((change) =>
        changeKey(change.evaluatorId, change.value),
      );
    },
  });
  return new Set(applied.flat());
};
