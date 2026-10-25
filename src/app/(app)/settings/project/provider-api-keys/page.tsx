import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { ProviderKeysData } from './_components/provider-keys-data';
import { ProviderKeysSkeleton } from './_components/provider-keys-skeleton';

export default function ProviderApiKeysPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<ProviderKeysSkeleton />}>
        <ProviderKeysData />
      </Suspense>
    </SettingsPageContainer>
  );
}
