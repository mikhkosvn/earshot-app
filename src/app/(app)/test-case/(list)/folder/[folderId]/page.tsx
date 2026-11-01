import { Suspense } from 'react';

import { EvaluatorTableSkeleton } from '../../_components/evaluator-table-skeleton';
import { FolderEvaluatorsData } from '../../_components/folder-evaluators-data';

export default function FolderEvaluatorsPage({
  params,
  searchParams,
}: PageProps<'/test-case/folder/[folderId]'>) {
  return (
    <Suspense fallback={<EvaluatorTableSkeleton />}>
      <FolderEvaluatorsData params={params} searchParams={searchParams} />
    </Suspense>
  );
}
