import { Suspense } from 'react';

import { AlertsData } from './_components/alerts-data';
import { AlertsPageSkeleton } from './_components/alerts-page-skeleton';

export default function AlertsPage({
  params,
  searchParams,
}: PageProps<'/[projectId]/alerts/review'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<AlertsPageSkeleton />}>
        <AlertsData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
