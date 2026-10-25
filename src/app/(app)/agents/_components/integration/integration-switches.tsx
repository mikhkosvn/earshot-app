'use client';

import type { AgentProvider } from '@/generated/prisma/enums';
import { PROVIDER_INTEGRATIONS } from '@/server/agents/constants/provider-integrations';

import { IntegrationSwitchField } from './integration-switch-field';

type IntegrationSwitchesProps = {
  provider: AgentProvider;
};

export function IntegrationSwitches({ provider }: IntegrationSwitchesProps) {
  const integration = PROVIDER_INTEGRATIONS[provider];

  return (
    <>
      <IntegrationSwitchField
        name="autoImportCalls"
        label="Auto-fetch Production Calls"
        description={integration.autoImportDescription}
      />
      <IntegrationSwitchField
        name="autoSyncPrompt"
        label="Auto-sync Prompts"
        description={integration.autoSyncDescription}
      />
      <IntegrationSwitchField
        name="sendPostConversationMetadata"
        label="Send Post Conversation Metadata"
        description={postMetadataDescription(
          integration.postConversationMetadata,
        )}
      />
    </>
  );
}

const postMetadataDescription = (enabled: boolean) => {
  if (!enabled) return undefined;
  return 'Your agent posts transcript, tool calls and call ID to Earshot after each call.';
};
