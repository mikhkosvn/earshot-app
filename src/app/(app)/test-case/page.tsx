import { Suspense } from 'react';

import { EvaluatorsData } from './_components/evaluators-data';
import { EvaluatorsSkeleton } from './_components/evaluators-skeleton';

export default function EvaluatorsPage({
  searchParams,
}: PageProps<'/test-case'>) {
  return (
    <Suspense fallback={<EvaluatorsSkeleton />}>
      <EvaluatorsData searchParams={searchParams} />
    </Suspense>
  );
}
