import { Suspense } from 'react';

import { InsightsData } from './_components/insights-data';
import { InsightsSkeleton } from './_components/insights-skeleton';

export default function InsightsPage({
  params,
  searchParams,
}: PageProps<'/[projectId]/insights'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<InsightsSkeleton />}>
        <InsightsData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
