import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { ApiKeysData } from './_components/api-keys-data';
import { ApiKeysSkeleton } from './_components/api-keys-skeleton';

export default function ApiKeyPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<ApiKeysSkeleton />}>
        <ApiKeysData />
      </Suspense>
    </SettingsPageContainer>
  );
}
