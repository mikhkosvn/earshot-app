import { Suspense } from 'react';

import { DashboardBoardSkeleton } from '@/components/common/dashboard-board/dashboard-board-skeleton';

import { DashboardData } from './_components/dashboard-data';

export default function DashboardPage({
  params,
}: PageProps<'/[projectId]/dashboards/[dashboardId]'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<DashboardBoardSkeleton />}>
        <DashboardData params={params} />
      </Suspense>
    </div>
  );
}
