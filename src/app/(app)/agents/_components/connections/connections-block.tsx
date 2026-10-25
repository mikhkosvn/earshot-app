'use client';

import { useWatch } from 'react-hook-form';

import {
  PROVIDER_INTEGRATIONS,
  TelephonySupport,
} from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { TelephonySettings } from './telephony-settings';
import { TelephonyToggle } from './telephony-toggle';

export function ConnectionsBlock() {
  const provider = useWatch<AgentConfigValues, 'provider'>({
    name: 'provider',
  });
  if (PROVIDER_INTEGRATIONS[provider].telephony === TelephonySupport.none) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3 rounded-lg border">
      <div className="rounded-t-lg border-b bg-muted/50 px-3 py-2">
        <h3 className="text-xs font-semibold">Connections</h3>
        <p className="text-xs text-muted-foreground">
          Tell us how to connect to your agent
        </p>
      </div>
      <div className="flex flex-col gap-3 px-3 pb-3">
        <h4 className="text-[11px] font-semibold tracking-wide uppercase">
          Voice
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <TelephonyToggle />
        </div>
        <TelephonySettings />
      </div>
    </section>
  );
}
