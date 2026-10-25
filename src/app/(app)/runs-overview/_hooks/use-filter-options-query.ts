'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { RunsOverviewService } from '../_service';

export const useFilterOptionsQuery = () => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(
    RunsOverviewService.getFilterOptionsQuery({ projectId }),
  );
};
