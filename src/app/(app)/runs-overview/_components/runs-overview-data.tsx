import {
  dehydrate,
  HydrationBoundary,
  noop,
  type QueryClient,
} from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { DashboardService } from '@/components/common/dashboard-board/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { DashboardSource } from '@/generated/prisma/enums';
import getQueryClient from '@/lib/query-client/get-query-client';
import { RunsOverviewView } from '@/lib/url-generator/constants';

import { loadRunsOverviewParams } from '../_constants/runs-overview-params';
import { RunsOverviewService } from '../_service';
import { parseOverviewFilters } from '../_utils/overview-filters-param';
import { RunsOverviewContent } from './runs-overview-content';
import { RunsOverviewSkeleton } from './runs-overview-skeleton';

interface RunsOverviewDataProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

type RunsOverviewParams = Awaited<ReturnType<typeof loadRunsOverviewParams>>;

const startDashboardQueries = async (
  queryClient: QueryClient,
  projectId: number,
  dashboard: number | null,
) => {
  const dashboards = await queryClient
    .query({
      ...DashboardService.getListQuery({
        projectId,
        source: DashboardSource.runs,
      }),
      retry: false,
    })
    .catch(() => []);
  const dashboardId = dashboard ?? dashboards[0]?.id;
  if (!dashboardId) return;
  void queryClient
    .query({
      ...DashboardService.getDetailQuery({ dashboardId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...DashboardService.getAgentsQuery({ projectId }), retry: false })
    .catch(noop);
};

const startClassicQueries = (
  queryClient: QueryClient,
  projectId: number,
  params: RunsOverviewParams,
) => {
  void queryClient
    .query({
      ...RunsOverviewService.getOverviewQuery({
        projectId,
        from: params.from,
        to: params.to,
        period: params.period,
        filters: parseOverviewFilters(params.filters),
      }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...RunsOverviewService.getConfigurationsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
};

export async function RunsOverviewData({
  searchParams,
}: RunsOverviewDataProps) {
  await io();

  const params = await loadRunsOverviewParams(searchParams);
  const queryClient = getQueryClient();
  const projectId =
    params.project ??
    (await queryClient.query({
      ...ShellService.getCurrentProjectIdQuery(),
      retry: false,
    }));
  if (params.view === RunsOverviewView.new) {
    await startDashboardQueries(queryClient, projectId, params.dashboard);
  } else {
    startClassicQueries(queryClient, projectId, params);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<RunsOverviewSkeleton />}>
          <RunsOverviewContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
