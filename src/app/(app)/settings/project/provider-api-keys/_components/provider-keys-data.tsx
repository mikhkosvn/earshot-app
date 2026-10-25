import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { ProviderKeysService } from '../_service';
import { ProviderKeysSection } from './provider-keys-section';
import { ProviderKeysSkeleton } from './provider-keys-skeleton';

export async function ProviderKeysData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...ProviderKeysService.getKeysQuery({ projectId: project.id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ProviderKeysSkeleton />}>
          <ProviderKeysSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
