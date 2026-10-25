import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { PersonalityBreadcrumb } from '../../_components/form/personality-breadcrumb';
import { EditPersonalityData } from './_components/edit-personality-data';

export default function EditPersonalityPage({
  params,
}: PageProps<'/personality/edit/[personalityId]'>) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
      <PersonalityBreadcrumb current="Edit personality" />
      <Suspense fallback={<Skeleton className="h-150 w-full" />}>
        <EditPersonalityData params={params} />
      </Suspense>
    </div>
  );
}
