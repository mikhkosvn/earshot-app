import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { KnowledgeService } from '../_service';
import { KnowledgeSection } from './knowledge-section';
import { KnowledgeSkeleton } from './knowledge-skeleton';

export async function KnowledgeData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...KnowledgeService.getKnowledgeQuery({ projectId: project.id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<KnowledgeSkeleton />}>
          <KnowledgeSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
