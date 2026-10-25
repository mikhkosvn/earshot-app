'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { InsightService } from '../../_service';

export const useDeepResearchQuery = () => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(InsightService.getDeepResearchQuery({ projectId }));
};
