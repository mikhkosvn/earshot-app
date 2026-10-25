'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { DashboardSource } from '@/generated/prisma/enums';

import { DashboardService } from '../../_service';

export const useDashboardListQuery = (source: DashboardSource) => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(DashboardService.getListQuery({ projectId, source }));
};
