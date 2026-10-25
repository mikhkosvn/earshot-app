import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { loadCallListParams } from '../_constants/call-list-params';
import { CallService } from '../_service';
import { parseFilterParam } from '../_utils/parse-filter-param';
import { CallDetailPanel } from './call-detail/call-detail-panel';
import { CallsContent } from './calls-content';
import { CallsPageSkeleton } from './calls-page-skeleton';

interface CallsDataProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function CallsData({ params, searchParams }: CallsDataProps) {
  await io();

  const projectId = parseProjectId((await params).projectId) ?? 0;
  const query = await loadCallListParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient
    .query({ ...CallService.getHasCallsQuery({ projectId }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...CallService.getListQuery({
        projectId,
        page: query.page,
        pageSize: query.pageSize,
        from: query.from,
        to: query.to,
        conditions: parseFilterParam(query.filters),
        search: query.search,
        viewId: query.view,
      }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...CallService.getMetricColumnsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...CallService.getSavedViewsQuery({ projectId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<CallsPageSkeleton />}>
          <CallsContent />
        </Suspense>
      </QueryErrorBoundary>
      <CallDetailPanel />
    </HydrationBoundary>
  );
}
