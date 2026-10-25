import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { prefetchOrganizationSettings } from '../../_utils/prefetch-organization-settings';
import { TelephonyService } from '../_service';
import { TelephonySection } from './telephony-section';
import { TelephonySkeleton } from './telephony-skeleton';

export async function TelephonyData() {
  await io();

  const queryClient = getQueryClient();
  const project = await prefetchOrganizationSettings(queryClient);
  void queryClient
    .query({
      ...TelephonyService.getPhoneNumbersQuery({
        organizationId: project.organizationId,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<TelephonySkeleton />}>
          <TelephonySection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
