import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { MetricService } from '@/app/(app)/metrics/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { CreateMetricService } from '../_service';
import { CreateMetricSkeleton } from './create-metric-skeleton';
import { CreateMetricView } from './create-metric-view';

export async function CreateMetricData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  const projectId = project.id;
  void queryClient
    .query({
      ...MetricService.getAgentOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...MetricService.getMetricOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...CreateMetricService.getScenarioOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<CreateMetricSkeleton />}>
          <CreateMetricView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
