import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { AgentDetail } from '@/server/agents/types';

export const agentDetailInclude = {
  redactionFields: { select: { field: true } },
} satisfies Prisma.AgentInclude;

type AgentRow = Prisma.AgentGetPayload<{ include: typeof agentDetailInclude }>;

const toConfigRecord = (value: Prisma.JsonValue | null) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const entries = Object.entries(value).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );
  return Object.fromEntries(entries);
};

export const toAgentDetail = (agent: AgentRow): AgentDetail => ({
  id: agent.id,
  projectId: agent.projectId,
  name: agent.name,
  description: agent.description,
  language: agent.language,
  provider: agent.provider,
  phoneNumber: agent.phoneNumber,
  inbound: agent.inbound,
  providerAgentId: agent.providerAgentId,
  apiKeyConfigured: Boolean(agent.providerApiKeyEncrypted),
  providerConfig: toConfigRecord(agent.providerConfig),
  autoImportCalls: agent.autoImportCalls,
  autoSyncPrompt: agent.autoSyncPrompt,
  sendPostConversationMetadata: agent.sendPostConversationMetadata,
  redactionFields: agent.redactionFields.map((row) => row.field),
  webhookUrl: agent.webhookUrl,
  webhookSecretConfigured: Boolean(agent.webhookSecretEncrypted),
  mockToolsEnabled: agent.mockToolsEnabled,
  createdAt: agent.createdAt,
  updatedAt: agent.updatedAt,
});
