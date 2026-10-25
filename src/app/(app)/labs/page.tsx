import { Suspense } from 'react';

import { LabsData } from './_components/labs-data';
import { LabsSkeleton } from './_components/labs-skeleton';

export default function LabsPage() {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Suspense fallback={<LabsSkeleton />}>
        <LabsData />
      </Suspense>
    </div>
  );
}
