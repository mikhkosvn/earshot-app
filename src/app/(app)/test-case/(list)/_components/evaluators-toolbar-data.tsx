import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { EvaluatorsToolbar } from '@/app/(app)/test-case/_components/toolbar/evaluators-toolbar';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { EvaluatorsToolbarSkeleton } from './evaluators-toolbar-skeleton';

export async function EvaluatorsToolbarData() {
  await io();

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
      ...EvaluatorService.getGenerationJobsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<EvaluatorsToolbarSkeleton />}>
          <EvaluatorsToolbar />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
