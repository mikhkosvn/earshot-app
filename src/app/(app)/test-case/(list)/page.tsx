import { Suspense } from 'react';

import { AllEvaluatorsData } from './_components/all-evaluators-data';
import { EvaluatorTableSkeleton } from './_components/evaluator-table-skeleton';

export default function EvaluatorsPage({
  searchParams,
}: PageProps<'/test-case'>) {
  return (
    <Suspense fallback={<EvaluatorTableSkeleton />}>
      <AllEvaluatorsData searchParams={searchParams} />
    </Suspense>
  );
}
