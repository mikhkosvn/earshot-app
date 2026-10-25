'use client';

import { useMutationState } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import type { ActionResult } from '@/lib/action-result';
import type {
  EvaluatorImprovementReply,
  ProposeEvaluatorImprovementsInput,
} from '@/server/evaluators/types';

export const useImprovementTurns = () =>
  useMutationState({
    filters: { mutationKey: EvaluatorService.proposeImprovementsMutationKey },
    select: (mutation) => ({
      id: mutation.mutationId,
      status: mutation.state.status,
      prompt: (
        mutation.state.variables as
          ProposeEvaluatorImprovementsInput | undefined
      )?.prompt,
      result: mutation.state.data as
        ActionResult<EvaluatorImprovementReply> | undefined,
    }),
  });
