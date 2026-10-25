'use client';

import { useWatch } from 'react-hook-form';

import type { AgentConfigValues } from '@/server/agents/types';

import { SETTINGS_COLLAPSED_TILE_COUNT } from '../../_constants/provider-display';
import { ConnectionsBlock } from '../../_components/connections/connections-block';
import { IntegrationSettings } from '../../_components/integration/integration-settings';
import { ProviderGrid } from '../../_components/provider/provider-grid';
import { useAgent } from '../_hooks/use-agent';
import { SectionCard } from './section-card';

export function ProviderCard() {
  const agent = useAgent();
  const provider = useWatch<AgentConfigValues, 'provider'>({
    name: 'provider',
  });

  return (
    <SectionCard
      title="Where did you build your agent?"
      subtitle="Select the platform you use to build your conversational agent"
      defaultOpen
    >
      <ProviderGrid collapsedCount={SETTINGS_COLLAPSED_TILE_COUNT} />
      <ConnectionsBlock />
      <IntegrationSettings
        key={String(agent.updatedAt)}
        apiKeyConfigured={agent.apiKeyConfigured && agent.provider === provider}
      />
    </SectionCard>
  );
}
