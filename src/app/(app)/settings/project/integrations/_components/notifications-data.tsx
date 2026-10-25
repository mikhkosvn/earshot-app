import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { NotificationSettingsService } from '../_service';
import { NotificationsSection } from './notifications-section';
import { NotificationsSkeleton } from './notifications-skeleton';

export async function NotificationsData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchCurrentProject(queryClient);
  void queryClient
    .query({
      ...NotificationSettingsService.getSettingsQuery({
        projectId: project.id,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<NotificationsSkeleton />}>
          <NotificationsSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
