import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { MembersData } from './_components/members-data';
import { MembersHeader } from './_components/members-header';
import { MembersSkeleton } from './_components/members-skeleton';

export default function MembersPage() {
  return (
    <SettingsPageContainer>
      <MembersHeader />
      <Suspense fallback={<MembersSkeleton />}>
        <MembersData />
      </Suspense>
    </SettingsPageContainer>
  );
}
