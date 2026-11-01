import {
  dehydrate,
  HydrationBoundary,
  noop,
  type QueryClient,
} from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { EvaluatorTable } from '@/app/(app)/test-case/_components/table/evaluator-table';
import { EvaluatorsPagination } from '@/app/(app)/test-case/_components/table/evaluators-pagination';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { toListEvaluatorsInput } from '@/app/(app)/test-case/_utils/list/evaluator-list-input';
import { loadEvaluatorListParams } from '@/app/(app)/test-case/_utils/list/load-evaluator-list-params';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { EvaluatorTableSkeleton } from './evaluator-table-skeleton';

interface EvaluatorListDataProps {
  folderId: number | null;
  searchParams: Record<string, string | string[] | undefined>;
}

const isMissingFolder = async (
  queryClient: QueryClient,
  projectId: number,
  folderId: number | null,
) => {
  if (folderId === null) return false;
  const folders = await queryClient
    .query({ ...EvaluatorService.getFoldersQuery({ projectId }), retry: false })
    .catch(() => null);
  if (!folders) return false;
  return !folders.some((folder) => folder.id === folderId);
};

export async function EvaluatorListData({
  folderId,
  searchParams,
}: EvaluatorListDataProps) {
  await io();

  const params = loadEvaluatorListParams(searchParams);
  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  void queryClient
    .query({
      ...EvaluatorService.getListQuery(
        toListEvaluatorsInput(projectId, folderId, params),
      ),
      retry: false,
    })
    .catch(noop);
  if (await isMissingFolder(queryClient, projectId, folderId)) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<EvaluatorTableSkeleton />}>
          <EvaluatorTable />
          <EvaluatorsPagination />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
