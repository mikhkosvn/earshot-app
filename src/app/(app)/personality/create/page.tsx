import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { PersonalityBreadcrumb } from '../_components/form/personality-breadcrumb';
import { CreatePersonalityData } from './_components/create-personality-data';

export default function CreatePersonalityPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
      <PersonalityBreadcrumb current="Create personality" />
      <Suspense fallback={<Skeleton className="h-150 w-full" />}>
        <CreatePersonalityData />
      </Suspense>
    </div>
  );
}
