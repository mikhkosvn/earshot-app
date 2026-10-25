import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { OrganizationGeneralData } from './_components/organization-general-data';
import { OrganizationGeneralSkeleton } from './_components/organization-general-skeleton';

export default function OrganizationGeneralPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<OrganizationGeneralSkeleton />}>
        <OrganizationGeneralData />
      </Suspense>
    </SettingsPageContainer>
  );
}
