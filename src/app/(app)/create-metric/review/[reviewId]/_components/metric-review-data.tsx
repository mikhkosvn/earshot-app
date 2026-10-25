import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { MetricReviewService } from '../_service';
import { MetricReviewBreadcrumb } from './metric-review-breadcrumb';
import { MetricReviewContent } from './metric-review-content';
import { MetricReviewSkeleton } from './metric-review-skeleton';

type MetricReviewDataProps = {
  params: Promise<{ reviewId: string }>;
};

export async function MetricReviewData({ params }: MetricReviewDataProps) {
  await io();

  const { reviewId } = await params;
  const id = Number(reviewId);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const queryClient = getQueryClient();
  await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  void queryClient
    .query({
      ...MetricReviewService.getReviewQuery({ reviewId: id }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MetricReviewBreadcrumb />
      <QueryErrorBoundary>
        <Suspense fallback={<MetricReviewSkeleton />}>
          <MetricReviewContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
