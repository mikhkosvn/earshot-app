import { Suspense } from 'react';

import { MonitorsData } from './_components/monitors-data';
import { MonitorsHeader } from './_components/monitors-header';
import { MonitorsTableSkeleton } from './_components/monitors-table-skeleton';

export default function MonitorsPage({
  searchParams,
}: PageProps<'/cron-jobs'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <MonitorsHeader />
      <Suspense fallback={<MonitorsTableSkeleton />}>
        <MonitorsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
