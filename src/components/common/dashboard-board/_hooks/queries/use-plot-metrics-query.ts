'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { DashboardService } from '../../_service';

export const usePlotMetricsQuery = () => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(DashboardService.getMetricsQuery({ projectId }));
};
