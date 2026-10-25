import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

import { loadAgentListParams } from '../../_constants/agent-list-params';
import { AgentService } from '../../_service';
import { AgentsTable } from './agents-table';
import { AgentsTableSkeleton } from './agents-table-skeleton';

interface AgentsDataProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function AgentsData({ searchParams }: AgentsDataProps) {
  await io();

  const params = await loadAgentListParams(searchParams);
  const queryClient = getQueryClient();
  const projectId =
    params[PROJECT_QUERY_KEY] ??
    (await queryClient.query({
      ...ShellService.getCurrentProjectIdQuery(),
      retry: false,
    }));
  void queryClient
    .query({
      ...AgentService.getListQuery({
        projectId,
        page: params.page,
        pageSize: params.pageSize,
        search: params.search,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<AgentsTableSkeleton />}>
          <AgentsTable />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
