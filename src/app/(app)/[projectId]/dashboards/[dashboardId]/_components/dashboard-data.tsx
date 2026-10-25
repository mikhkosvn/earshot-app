import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { DashboardService } from '@/components/common/dashboard-board/_service';
import { DashboardBoardSkeleton } from '@/components/common/dashboard-board/dashboard-board-skeleton';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { DashboardSource } from '@/generated/prisma/enums';
import getQueryClient from '@/lib/query-client/get-query-client';

import { DashboardView } from './dashboard-view';

interface DashboardDataProps {
  params: Promise<{ projectId: string; dashboardId: string }>;
}

export async function DashboardData({ params }: DashboardDataProps) {
  await io();

  const { projectId: rawProjectId, dashboardId: rawDashboardId } = await params;
  const projectId = parseProjectId(rawProjectId);
  const dashboardId = parseProjectId(rawDashboardId);
  if (!projectId || !dashboardId) notFound();
  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...DashboardService.getDetailQuery({ dashboardId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...DashboardService.getListQuery({
        projectId,
        source: DashboardSource.call_logs,
      }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...DashboardService.getAgentsQuery({ projectId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<DashboardBoardSkeleton />}>
          <DashboardView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
