import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { ResultsView } from '@/lib/url-generator/constants';

import { loadResultsListParams } from '../../_constants/result-params';
import { ResultService } from '../../_service';
import { toResultFilters } from '../../_utils/filters-input';
import { ResultsListSkeleton } from './results-list-skeleton';
import { ResultsListView } from './results-list-view';

type ResultsListDataProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ResultsListData({
  params,
  searchParams,
}: ResultsListDataProps) {
  await io();

  const projectId = parseProjectId((await params).projectId);
  if (projectId === null) notFound();
  const query = await loadResultsListParams(searchParams);
  const filters = toResultFilters(query);
  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);
  if (query.view === ResultsView.runs) {
    void queryClient
      .query({
        ...ResultService.getRunsQuery({
          projectId,
          resultId: null,
          filters,
          sortBy: query.sort,
          sortDir: query.dir,
          page: query.page,
          pageSize: query.pageSize,
        }),
        retry: false,
      })
      .catch(noop);
  }
  if (query.view === ResultsView.results) {
    void queryClient
      .query({
        ...ResultService.getListQuery({
          projectId,
          filters,
          page: query.page,
          pageSize: query.pageSize,
        }),
        retry: false,
      })
      .catch(noop);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ResultsListSkeleton />}>
          <ResultsListView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
