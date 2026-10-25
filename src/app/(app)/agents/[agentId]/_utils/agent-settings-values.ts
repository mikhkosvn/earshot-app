import type { AgentDetail, AgentSettingsValues } from '@/server/agents/types';

export const toAgentSettingsValues = (
  agent: AgentDetail,
): AgentSettingsValues => ({
  name: agent.name,
  language: agent.language,
  description: agent.description,
  provider: agent.provider,
  telephonyEnabled: agent.phoneNumber !== null,
  phoneNumber: agent.phoneNumber ?? '',
  inbound: agent.inbound,
  providerAgentId: agent.providerAgentId ?? '',
  providerApiKey: '',
  providerConfig: agent.providerConfig,
  autoImportCalls: agent.autoImportCalls,
  autoSyncPrompt: agent.autoSyncPrompt,
  sendPostConversationMetadata: agent.sendPostConversationMetadata,
  redactionEnabled: agent.redactionFields.length > 0,
  redactionFields: agent.redactionFields,
  webhookUrl: agent.webhookUrl ?? '',
  webhookSecret: '',
});
