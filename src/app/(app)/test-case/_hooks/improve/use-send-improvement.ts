'use client';

import { useProposeImprovementsMutation } from '@/app/(app)/test-case/_hooks/mutations/evaluator-ai/use-propose-improvements-mutation';
import { useEvaluatorFilterInput } from '@/app/(app)/test-case/_hooks/use-evaluator-filter-input';

export const useSendImprovement = (scope: number) => {
  const filter = useEvaluatorFilterInput();
  const propose = useProposeImprovementsMutation();

  return {
    send: (prompt: string) =>
      propose.mutate({ filter, limit: scope, prompt: prompt.trim() }),
    isPending: propose.isPending,
  };
};
