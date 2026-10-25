import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { ApiKeyService } from '../_service';
import { ApiKeysSection } from './api-keys-section';
import { ApiKeysSkeleton } from './api-keys-skeleton';

export async function ApiKeysData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...ApiKeyService.getApiKeysQuery({
        organizationId: project.organizationId,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ApiKeysSkeleton />}>
          <ApiKeysSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
