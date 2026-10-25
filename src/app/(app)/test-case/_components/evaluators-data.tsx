import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { EvaluatorService } from '../_service';
import { toListEvaluatorsInput } from '../_utils/evaluator-list-input';
import { loadEvaluatorListParams } from '../_utils/load-evaluator-list-params';
import { EvaluatorsLayout } from './evaluators-layout';
import { EvaluatorsSkeleton } from './evaluators-skeleton';

type EvaluatorsDataProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function EvaluatorsData({ searchParams }: EvaluatorsDataProps) {
  await io();

  const params = await loadEvaluatorListParams(searchParams);
  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  void queryClient
    .query({ ...EvaluatorService.getFoldersQuery({ projectId }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...EvaluatorService.getListQuery(
        toListEvaluatorsInput(projectId, params),
      ),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...EvaluatorService.getGenerationJobsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<EvaluatorsSkeleton />}>
          <EvaluatorsLayout />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
