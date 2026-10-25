'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { RubricService } from '../_service';

export const useRubricQuery = () => {
  const projectId = useCurrentProjectId();
  return RubricService.getRubricQuery({ projectId });
};
