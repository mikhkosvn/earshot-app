import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { LabService } from '@/app/(app)/labs/_service';
import { EditMetricService } from '@/app/(app)/metrics/edit/[metricId]/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { LabEditorSkeleton } from './lab-editor-skeleton';
import { LabEditorView } from './lab-editor-view';

type LabEditorDataProps = {
  params: Promise<{ metricId: string }>;
};

export async function LabEditorData({ params }: LabEditorDataProps) {
  await io();

  const { metricId: rawMetricId } = await params;
  const metricId = Number(rawMetricId);
  const queryClient = getQueryClient();
  await prefetchCurrentProject(queryClient);
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
    .query({ ...LabService.getLabQuery({ metricId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<LabEditorSkeleton />}>
          <LabEditorView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
