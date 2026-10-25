import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { TopBar } from './top-bar';
import { TopBarSkeleton } from './top-bar-skeleton';

export async function TopBarData() {
  await io();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentUserQuery(), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...ShellService.getOrganizationsQuery(), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...ShellService.getUnreadNotificationCountQuery(), retry: false })
    .catch(noop);

  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...ShellService.getProjectsQuery({
        organizationId: project.organizationId,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<TopBarSkeleton />}>
          <TopBar />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
