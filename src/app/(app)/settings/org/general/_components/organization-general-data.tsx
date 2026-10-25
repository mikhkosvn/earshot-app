import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { prefetchOrganizationSettings } from '../../_utils/prefetch-organization-settings';
import { OrganizationGeneralSection } from './organization-general-section';
import { OrganizationGeneralSkeleton } from './organization-general-skeleton';

export async function OrganizationGeneralData() {
  await io();

  const queryClient = getQueryClient();
  await prefetchOrganizationSettings(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<OrganizationGeneralSkeleton />}>
          <OrganizationGeneralSection />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
