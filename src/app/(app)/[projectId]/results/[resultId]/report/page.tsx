import { Suspense } from 'react';

import { ResultReportData } from './_components/result-report-data';
import { ResultReportSkeleton } from './_components/result-report-skeleton';

export default function ResultReportPage({
  params,
}: PageProps<'/[projectId]/results/[resultId]/report'>) {
  return (
    <Suspense fallback={<ResultReportSkeleton />}>
      <ResultReportData params={params} />
    </Suspense>
  );
}
