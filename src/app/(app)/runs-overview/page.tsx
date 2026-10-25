import { Suspense } from 'react';

import { RunsOverviewData } from './_components/runs-overview-data';
import { RunsOverviewSkeleton } from './_components/runs-overview-skeleton';

export default function RunsOverviewPage({
  searchParams,
}: PageProps<'/runs-overview'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<RunsOverviewSkeleton />}>
        <RunsOverviewData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
