import { Suspense } from 'react';

import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { NoticesList } from './_components/notices-list';
import { NoticesSkeleton } from './_components/notices-skeleton';

export default function ThirdPartyNoticesPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Third-Party Notices"
        description="Open source packages and their licenses used in this project"
      />
      <Suspense fallback={<NoticesSkeleton />}>
        <NoticesList />
      </Suspense>
    </SettingsPageContainer>
  );
}
