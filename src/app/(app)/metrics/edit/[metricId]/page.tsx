import { Suspense } from 'react';

import { EditMetricData } from './_components/edit-metric-data';
import { EditMetricSkeleton } from './_components/edit-metric-skeleton';

export default function EditMetricPage({
  params,
}: PageProps<'/metrics/edit/[metricId]'>) {
  return (
    <div className="p-3">
      <Suspense fallback={<EditMetricSkeleton />}>
        <EditMetricData params={params} />
      </Suspense>
    </div>
  );
}
