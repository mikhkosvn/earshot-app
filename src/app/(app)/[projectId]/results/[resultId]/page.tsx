import { Suspense } from 'react';

import { ResultDetailData } from './_components/result-detail-data';
import { ResultDetailSkeleton } from './_components/result-detail-skeleton';

export default function ResultPage({
  params,
  searchParams,
}: PageProps<'/[projectId]/results/[resultId]'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<ResultDetailSkeleton />}>
        <ResultDetailData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
