import { Suspense } from 'react';

import { RubricData } from './_components/rubric-data';
import { RubricSkeleton } from './_components/rubric-skeleton';

export default function RubricPage({ searchParams }: PageProps<'/rubric'>) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 p-3">
      <Suspense fallback={<RubricSkeleton />}>
        <RubricData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
