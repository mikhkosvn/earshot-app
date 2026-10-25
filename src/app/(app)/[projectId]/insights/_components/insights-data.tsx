import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { loadInsightsParams } from '../_constants/insights-params';
import { InsightService } from '../_service';
import { InsightsContent } from './insights-content';
import { InsightsSkeleton } from './insights-skeleton';

interface InsightsDataProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function InsightsData({
  params,
  searchParams,
}: InsightsDataProps) {
  await io();

  const projectId = parseProjectId((await params).projectId) ?? 0;
  const query = await loadInsightsParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient
    .query({
      ...InsightService.getOverviewQuery({
        projectId,
        from: query.from,
        to: query.to,
        agentId: query.agent,
      }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...InsightService.getMetricOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...InsightService.getDeepResearchQuery({ projectId }),
      retry: false,
    })
    .catch(noop);
  void queryClient
    .query({
      ...InsightService.getAgentOptionsQuery({ projectId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<InsightsSkeleton />}>
          <InsightsContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
