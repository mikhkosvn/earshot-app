import { Suspense } from 'react';

import { PageHeader } from '@/components/common/page-header/page-header';

import { ResultsListData } from './_components/results-list/results-list-data';
import { ResultsListSkeleton } from './_components/results-list/results-list-skeleton';

export default function ResultsPage({
  params,
  searchParams,
}: PageProps<'/[projectId]/results'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <PageHeader
        title="Results"
        description="Browse the results of your evaluator runs, drill into individual call transcripts and metric scores, and compare runs to see how your agent is performing."
      />
      <Suspense fallback={<ResultsListSkeleton />}>
        <ResultsListData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
