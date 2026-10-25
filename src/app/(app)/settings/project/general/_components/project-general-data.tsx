import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { ProjectGeneralSection } from './project-general-section';
import { ProjectGeneralSkeleton } from './project-general-skeleton';

export async function ProjectGeneralData() {
  await io();

  const queryClient = getQueryClient();
  await prefetchCurrentProject(queryClient);

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
