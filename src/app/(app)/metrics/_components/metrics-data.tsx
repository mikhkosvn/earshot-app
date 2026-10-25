import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { createLoader } from 'nuqs/server';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { metricsParser } from '@/lib/url-generator/parsers';

import { MetricService } from '../_service';
import { MetricsSkeleton } from './metrics-skeleton';
import { MetricsView } from './metrics-view';

const loadMetricsParams = createLoader(metricsParser);

type MetricsDataProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function MetricsData({ searchParams }: MetricsDataProps) {
  await io();

  const params = await loadMetricsParams(searchParams);
  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  void queryClient
    .query({
      ...MetricService.getListQuery({ projectId, viewId: params.view }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...MetricService.getAgentOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...MetricService.getSavedViewsQuery({ projectId }), retry: false })
    .catch(noop);
  if (params.generation) {
    void queryClient
      .query({
        ...JobService.getJobQuery({ jobId: params.generation }),
        retry: false,
      })
      .catch(noop);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<MetricsSkeleton />}>
          <MetricsView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
