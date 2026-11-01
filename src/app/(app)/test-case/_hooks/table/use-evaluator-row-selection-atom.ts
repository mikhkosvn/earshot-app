'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { evaluatorRowSelectionAtom } from '@/app/(app)/test-case/_stores/evaluator-row-selection';

import { useRouteFolderId } from '../folders/use-route-folder-id';

export const useEvaluatorRowSelectionAtom = () => {
  const projectId = useCurrentProjectId();
  const folderId = useRouteFolderId();
  return evaluatorRowSelectionAtom(projectId, folderId);
};
