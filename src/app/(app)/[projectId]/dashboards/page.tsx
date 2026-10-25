import { Suspense } from 'react';

import { DashboardBoardSkeleton } from '@/components/common/dashboard-board/dashboard-board-skeleton';

import { DashboardsRedirect } from './_components/dashboards-redirect';

export default function DashboardsPage({
  params,
}: PageProps<'/[projectId]/dashboards'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<DashboardBoardSkeleton />}>
        <DashboardsRedirect params={params} />
      </Suspense>
    </div>
  );
}
