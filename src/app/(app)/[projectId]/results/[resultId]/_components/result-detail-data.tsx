import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { ConversationService } from '@/components/common/conversation-viewer/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import {
  loadResultDetailParams,
  RUN_DETAIL_PARAM,
  RUN_PAGE_PARAM,
} from '../../_constants/result-params';
import { ResultService } from '../../_service';
import { toResultFilters } from '../../_utils/filters-input';
import { ResultDetailSkeleton } from './result-detail-skeleton';
import { ResultDetailView } from './result-detail-view';
import { RunDetailDialog } from './run-detail/run-detail-dialog';
import { ResultRunsCard } from './runs-card/result-runs-card';

interface ResultDetailDataProps {
  params: Promise<{ projectId: string; resultId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const prefetchRunDetail = async (
  queryClient: ReturnType<typeof getQueryClient>,
  runId: number,
) => {
  const run = await queryClient.query({
    ...ResultService.getRunQuery({ runId }),
    retry: false,
  });
  void queryClient
    .query({
      ...ConversationService.getConversationQuery({
        conversationId: run.conversationId,
      }),
      retry: false,
    })
    .catch(noop);
};

export async function ResultDetailData({
  params,
  searchParams,
}: ResultDetailDataProps) {
  await io();

  const route = await params;
  const projectId = parseProjectId(route.projectId);
  const resultId = Number(route.resultId);
  if (projectId === null || !Number.isInteger(resultId) || resultId <= 0) {
    notFound();
  }
  const query = await loadResultDetailParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...ResultService.getDetailQuery({ resultId }), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...ResultService.getStatusQuery({ resultId }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...ResultService.getRunsQuery({
        projectId,
        resultId,
        filters: toResultFilters(query),
        sortBy: query.sort,
        sortDir: query.dir,
        page: query[RUN_PAGE_PARAM],
        pageSize: query.pageSize,
      }),
      retry: false,
    })
    .catch(noop);
  const runId = query[RUN_DETAIL_PARAM];
  if (runId !== null) {
    await prefetchRunDetail(queryClient, runId).catch(noop);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ResultDetailSkeleton />}>
          <ResultDetailView />
          <ResultRunsCard />
          <RunDetailDialog />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
