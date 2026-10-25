import { AgentProvider, Language } from '@/generated/prisma/enums';
import type { AgentConfigValues } from '@/server/agents/types';

export const DEFAULT_AGENT_CONFIG_VALUES: AgentConfigValues = {
  name: '',
  language: Language.en,
  description: '',
  provider: AgentProvider.custom,
  telephonyEnabled: false,
  phoneNumber: '',
  inbound: true,
  providerAgentId: '',
  providerApiKey: '',
  providerConfig: {},
  autoImportCalls: false,
  autoSyncPrompt: false,
  sendPostConversationMetadata: false,
  redactionEnabled: false,
  redactionFields: [],
};
