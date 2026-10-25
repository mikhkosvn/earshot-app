import { Suspense } from 'react';

import { AccountSettingsData } from './_components/account/account-settings-data';
import { AccountSettingsSkeleton } from './_components/account/account-settings-skeleton';
import { SettingsPageContainer } from './_components/settings-page-container';

export default function AccountSettingsPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<AccountSettingsSkeleton />}>
        <AccountSettingsData />
      </Suspense>
    </SettingsPageContainer>
  );
}
