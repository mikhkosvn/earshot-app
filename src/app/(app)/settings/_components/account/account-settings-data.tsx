import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { prefetchCurrentProject } from '@/app/(app)/_utils/prefetch-current-project';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { AccountSettingsForm } from './account-settings-form';
import { AccountSettingsSkeleton } from './account-settings-skeleton';

export async function AccountSettingsData() {
  await io();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentUserQuery(), retry: false })
    .catch(noop);
  await prefetchCurrentProject(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<AccountSettingsSkeleton />}>
          <AccountSettingsForm />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
