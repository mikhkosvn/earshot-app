'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { toEvaluatorFilterInput } from '@/app/(app)/test-case/_utils/list/evaluator-list-input';

import { useEvaluatorListParams } from './use-evaluator-list-params';

export const useEvaluatorFilterInput = () => {
  const projectId = useCurrentProjectId();
  const [params] = useEvaluatorListParams();
  return toEvaluatorFilterInput(projectId, params);
};
