import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { toAlertWindowHours } from '@/server/alerts/constants/alert-window';

import { loadAlertsPageParams } from '../_constants/alerts-params';
import { AlertService } from '../_service';
import { AlertsContent } from './alerts-content';
import { AlertsPageSkeleton } from './alerts-page-skeleton';

interface AlertsDataProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function AlertsData({ params, searchParams }: AlertsDataProps) {
  await io();

  const projectId = parseProjectId((await params).projectId) ?? 0;
  const query = await loadAlertsPageParams(searchParams);
  const hours = toAlertWindowHours(query.hours);
  const queryClient = getQueryClient();
  void queryClient
    .query({
      ...AlertService.getReviewQuery({ projectId, hours }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...AlertService.getFireCountsQuery({ projectId, hours }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({ ...AlertService.getListQuery({ projectId }), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...AlertService.getAgentOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<AlertsPageSkeleton />}>
          <AlertsContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
