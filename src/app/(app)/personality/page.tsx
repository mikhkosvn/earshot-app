import { Suspense } from 'react';

import { PageHeader } from '@/components/common/page-header/page-header';

import { PersonalityGridSkeleton } from './_components/list/personality-grid-skeleton';
import { PersonalityListData } from './_components/list/personality-list-data';

export default function PersonalityPage({
  searchParams,
}: PageProps<'/personality'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <PageHeader
        title="Personality"
        description="Define the simulated caller personas your evaluators role-play, controlling tone, mood, and behavior to test how your agent handles different kinds of callers."
      />
      <Suspense fallback={<PersonalityGridSkeleton />}>
        <PersonalityListData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
