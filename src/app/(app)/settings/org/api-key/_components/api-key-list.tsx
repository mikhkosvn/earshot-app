'use client';

import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';

import { useApiKeys } from '../_hooks/use-api-keys';
import { ApiKeyCard } from './api-key-card';
import { ApiKeyListEmpty } from './api-key-list-empty';

export function ApiKeyList() {
  const apiKeys = useApiKeys();

  return (
    <SettingsCard className="gap-3">
      <p className="text-xs text-muted-foreground">
        Your API keys are shown below. Send a key in the X-API-KEY header of
        each request.
      </p>
      {apiKeys.map((apiKey) => (
        <ApiKeyCard key={apiKey.id} apiKey={apiKey} />
      ))}
      <ApiKeyListEmpty />
    </SettingsCard>
  );
}
