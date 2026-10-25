import { Suspense } from 'react';

import { CallsData } from './_components/calls-data';
import { CallsPageSkeleton } from './_components/calls-page-skeleton';

export default function CallsPage({
  params,
  searchParams,
}: PageProps<'/[projectId]/calls'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<CallsPageSkeleton />}>
        <CallsData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
