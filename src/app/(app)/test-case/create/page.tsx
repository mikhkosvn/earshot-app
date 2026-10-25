import { Suspense } from 'react';

import { CreateEvaluatorData } from './_components/create-evaluator-data';
import { CreateEvaluatorSkeleton } from './_components/create-evaluator-skeleton';

export default function CreateEvaluatorPage() {
  return (
    <Suspense fallback={<CreateEvaluatorSkeleton />}>
      <CreateEvaluatorData />
    </Suspense>
  );
}
