import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { OptimizerScheduleService } from '../_service';
import { ProjectGeneralSection } from './project-general-section';
import { ProjectGeneralSkeleton } from './project-general-skeleton';

export async function ProjectGeneralData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...OptimizerScheduleService.getListQuery({ projectId: project.id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ProjectGeneralSkeleton />}>
          <ProjectGeneralSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
