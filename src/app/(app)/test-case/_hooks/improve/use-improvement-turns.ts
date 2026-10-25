'use client';

import {
  type Mutation,
  type MutationStatus,
  useMutationState,
} from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import type { ActionResult } from '@/lib/action-result';
import type {
  EvaluatorImprovementReply,
  ProposeEvaluatorImprovementsInput,
} from '@/server/evaluators/types';

type ProposeMutation = Mutation<
  ActionResult<EvaluatorImprovementReply>,
  Error,
  ProposeEvaluatorImprovementsInput
>;

interface ImprovementTurn {
  id: number;
  status: MutationStatus;
  prompt: string | undefined;
  result: ActionResult<EvaluatorImprovementReply> | undefined;
}

export const useImprovementTurns = () =>
  useMutationState<ImprovementTurn, ProposeMutation>({
    filters: { mutationKey: EvaluatorService.proposeImprovementsMutationKey },
    select: (mutation) => ({
      id: mutation.mutationId,
      status: mutation.state.status,
      prompt: mutation.state.variables?.prompt,
      result: mutation.state.data,
    }),
  });
