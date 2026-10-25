'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { toListEvaluatorsInput } from '@/app/(app)/test-case/_utils/evaluator-list-input';

import { useEvaluatorListParams } from './use-evaluator-list-params';

export const useEvaluatorListQuery = () => {
  const projectId = useCurrentProjectId();
  const [params] = useEvaluatorListParams();
  return EvaluatorService.getListQuery(
    toListEvaluatorsInput(projectId, params),
  );
};
