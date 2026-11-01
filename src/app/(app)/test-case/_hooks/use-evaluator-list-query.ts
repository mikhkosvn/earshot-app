'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { toListEvaluatorsInput } from '@/app/(app)/test-case/_utils/list/evaluator-list-input';

import { useRouteFolderId } from './folders/use-route-folder-id';
import { useEvaluatorListParams } from './use-evaluator-list-params';

export const useEvaluatorListQuery = () => {
  const projectId = useCurrentProjectId();
  const folderId = useRouteFolderId();
  const [params] = useEvaluatorListParams();
  return EvaluatorService.getListQuery(
    toListEvaluatorsInput(projectId, folderId, params),
  );
};
