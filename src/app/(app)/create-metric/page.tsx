import { Suspense } from 'react';

import { CreateMetricData } from './_components/create-metric-data';
import { CreateMetricSkeleton } from './_components/create-metric-skeleton';

export default function CreateMetricPage() {
  return (
    <div className="p-3">
      <Suspense fallback={<CreateMetricSkeleton />}>
        <CreateMetricData />
      </Suspense>
    </div>
  );
}
