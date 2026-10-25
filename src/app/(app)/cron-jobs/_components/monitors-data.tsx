import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { MonitorService } from '@/components/common/monitor-dialog/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

import { loadMonitorListParams } from '../_constants/monitor-list-params';
import { MonitorsContent } from './monitors-content';
import { MonitorsTableSkeleton } from './monitors-table-skeleton';

type MonitorsDataProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function MonitorsData({ searchParams }: MonitorsDataProps) {
  await io();

  const params = await loadMonitorListParams(searchParams);
  const queryClient = getQueryClient();
  const projectId =
    params[PROJECT_QUERY_KEY] ??
    (await queryClient.query({
      ...ShellService.getCurrentProjectIdQuery(),
      retry: false,
    }));
  void queryClient
    .query({
      ...MonitorService.getListQuery({
        projectId,
        page: params.page,
        pageSize: params.pageSize,
      }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...MonitorService.getScenariosQuery({ projectId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<MonitorsTableSkeleton />}>
          <MonitorsContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
