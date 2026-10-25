'use client';

import { useState } from 'react';

import { ToggleGroup } from '@/components/ui/toggle-group';

import { CALL_PROVIDERS, CallProvider } from '../../_constants/call-providers';
import { ProviderTile } from './provider-tile';
import { SendCallDataSection } from './send-call-data-section';

const isCallProvider = (value: unknown): value is CallProvider =>
  CALL_PROVIDERS.some((provider) => provider === value);

export function ConnectProviderCard() {
  const [provider, setProvider] = useState<CallProvider>(CallProvider.custom);

  return (
    <div className="flex flex-col rounded-lg border bg-background">
      <h3 className="border-b px-3 py-2.5 text-xs font-semibold">
        Connect a provider
      </h3>
      <ToggleGroup
        value={[provider]}
        onValueChange={(values) => {
          const next = values.find(isCallProvider);
          if (!next) return;
          setProvider(next);
        }}
        aria-label="Provider"
        className="grid w-full grid-cols-4 gap-2 p-3 sm:grid-cols-8"
      >
        {CALL_PROVIDERS.map((item) => (
          <ProviderTile key={item} provider={item} />
        ))}
      </ToggleGroup>
      <SendCallDataSection provider={provider} />
    </div>
  );
}
