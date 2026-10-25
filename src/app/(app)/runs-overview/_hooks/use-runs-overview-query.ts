'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { RunsOverviewService } from '../_service';
import { useOverviewFilters } from './use-overview-filters';
import { useRunsOverviewParams } from './use-runs-overview-params';

export const useRunsOverviewQuery = () => {
  const projectId = useCurrentProjectId();
  const [{ from, to, period }] = useRunsOverviewParams();
  const filters = useOverviewFilters();
  return useSuspenseQuery(
    RunsOverviewService.getOverviewQuery({
      projectId,
      from,
      to,
      period,
      filters,
    }),
  );
};
