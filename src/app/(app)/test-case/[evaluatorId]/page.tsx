import { Suspense } from 'react';

import { EditEvaluatorData } from './_components/edit-evaluator-data';
import { EditEvaluatorSkeleton } from './_components/edit-evaluator-skeleton';

export default function EditEvaluatorPage({
  params,
}: PageProps<'/test-case/[evaluatorId]'>) {
  return (
    <Suspense fallback={<EditEvaluatorSkeleton />}>
      <EditEvaluatorData params={params} />
    </Suspense>
  );
}
