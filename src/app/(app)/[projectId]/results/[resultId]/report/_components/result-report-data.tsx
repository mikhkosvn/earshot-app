import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { ResultService } from '../../../_service';
import { ResultReportSkeleton } from './result-report-skeleton';
import { ResultReportView } from './result-report-view';

interface ResultReportDataProps {
  params: Promise<{ projectId: string; resultId: string }>;
}

export async function ResultReportData({ params }: ResultReportDataProps) {
  await io();

  const route = await params;
  const projectId = parseProjectId(route.projectId);
  const resultId = Number(route.resultId);
  if (projectId === null || !Number.isInteger(resultId) || resultId <= 0) {
    notFound();
  }
  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ResultService.getDetailQuery({ resultId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<ResultReportSkeleton />}>
          <ResultReportView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
