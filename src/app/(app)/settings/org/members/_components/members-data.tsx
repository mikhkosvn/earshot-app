import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { prefetchOrganizationSettings } from '../../_utils/prefetch-organization-settings';
import { MembersService } from '../_service';
import { MembersSkeleton } from './members-skeleton';
import { PeopleCard } from './people-card';

export async function MembersData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchOrganizationSettings(queryClient);
  void queryClient
    .query({
      ...MembersService.getMembersQuery({
        organizationId: project.organizationId,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<MembersSkeleton />}>
          <PeopleCard />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
