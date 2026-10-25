import { Suspense } from 'react';

import { MetricReviewData } from './_components/metric-review-data';
import { MetricReviewSkeleton } from './_components/metric-review-skeleton';

export default function MetricReviewPage({
  params,
}: PageProps<'/create-metric/review/[reviewId]'>) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Suspense fallback={<MetricReviewSkeleton />}>
        <MetricReviewData params={params} />
      </Suspense>
    </div>
  );
}
