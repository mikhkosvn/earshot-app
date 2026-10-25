import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { LabService } from '../_service';
import { LabsSkeleton } from './labs-skeleton';
import { LabsView } from './labs-view';

export async function LabsData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...LabService.getMetricsQuery({ projectId: project.id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<LabsSkeleton />}>
          <LabsView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
