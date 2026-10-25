import { Suspense } from 'react';

import { LabEditorData } from './_components/lab-editor-data';
import { LabEditorSkeleton } from './_components/lab-editor-skeleton';

export default function LabMetricPage({
  params,
}: PageProps<'/labs/edit/[metricId]'>) {
  return (
    <div className="p-3">
      <Suspense fallback={<LabEditorSkeleton />}>
        <LabEditorData params={params} />
      </Suspense>
    </div>
  );
}
