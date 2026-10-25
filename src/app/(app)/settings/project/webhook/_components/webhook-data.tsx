import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { WebhookService } from '../_service';
import { WebhookSection } from './webhook-section';
import { WebhookSkeleton } from './webhook-skeleton';

export async function WebhookData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...WebhookService.getWebhookQuery({ projectId: project.id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<WebhookSkeleton />}>
          <WebhookSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
