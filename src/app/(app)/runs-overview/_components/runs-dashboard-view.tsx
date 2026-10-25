'use client';

import { Suspense } from 'react';

import { useDashboardListQuery } from '@/components/common/dashboard-board/_hooks/queries/use-dashboard-list-query';
import { DashboardBoard } from '@/components/common/dashboard-board/dashboard-board';
import { DashboardBoardSkeleton } from '@/components/common/dashboard-board/dashboard-board-skeleton';
import { DashboardSource } from '@/generated/prisma/enums';

import { useRunsOverviewParams } from '../_hooks/use-runs-overview-params';

const resolveDashboardId = (
  requested: number | null,
  dashboards: { id: number }[],
) => {
  if (requested && dashboards.some((item) => item.id === requested)) {
    return requested;
  }
  return dashboards[0]?.id ?? null;
};

export function RunsDashboardView() {
  const [{ dashboard }] = useRunsOverviewParams();
  const { data: dashboards } = useDashboardListQuery(DashboardSource.runs);
  const dashboardId = resolveDashboardId(dashboard, dashboards);

  if (dashboardId === null) return null;

  return (
    <Suspense fallback={<DashboardBoardSkeleton />}>
      <DashboardBoard
        key={dashboardId}
        dashboardId={dashboardId}
        source={DashboardSource.runs}
      />
    </Suspense>
  );
}
