import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { prefetchEvaluatorOptions } from '@/app/(app)/test-case/_utils/prefetch-evaluator-options';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { CreateEvaluatorSkeleton } from './create-evaluator-skeleton';
import { CreateEvaluatorView } from './create-evaluator-view';

export async function CreateEvaluatorData() {
  await io();

  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  prefetchEvaluatorOptions(queryClient, projectId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<CreateEvaluatorSkeleton />}>
          <CreateEvaluatorView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
