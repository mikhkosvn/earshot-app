import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { MetricService } from '@/app/(app)/metrics/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { EditMetricService } from '@/components/common/metric-history/_service';
import { EditMetricSkeleton } from './edit-metric-skeleton';
import { EditMetricView } from './edit-metric-view';

interface EditMetricDataProps {
  params: Promise<{ metricId: string }>;
}

export async function EditMetricData({ params }: EditMetricDataProps) {
  await io();

  const { metricId: rawMetricId } = await params;
  const metricId = Number(rawMetricId);
  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  const projectId = project.id;
  void queryClient
    .query({ ...EditMetricService.getMetricQuery({ metricId }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...EditMetricService.getVersionsQuery({ metricId }),
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
      ...MetricService.getAgentOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<EditMetricSkeleton />}>
          <EditMetricView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
