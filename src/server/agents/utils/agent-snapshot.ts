import 'server-only';

import { Prisma } from '@/generated/prisma/client';

export const agentSnapshotInclude = {
  redactionFields: { select: { field: true } },
  mockTools: {
    select: {
      name: true,
      description: true,
      _count: { select: { mappings: true } },
    },
    orderBy: { name: Prisma.SortOrder.asc },
  },
  dynamicVariables: {
    select: { name: true, description: true },
    orderBy: { name: Prisma.SortOrder.asc },
  },
  knowledgeBaseFiles: {
    select: { file: { select: { fileName: true } } },
    orderBy: { id: Prisma.SortOrder.asc },
  },
  knowledgeBaseConnectors: {
    select: { name: true, type: true },
    orderBy: { id: Prisma.SortOrder.asc },
  },
} satisfies Prisma.AgentInclude;

type SnapshotRow = Prisma.AgentGetPayload<{
  include: typeof agentSnapshotInclude;
}>;

export const toAgentSnapshot = (agent: SnapshotRow) => ({
  name: agent.name,
  description: agent.description,
  language: agent.language,
  provider: agent.provider,
  phoneNumber: agent.phoneNumber,
  inbound: agent.inbound,
  providerAgentId: agent.providerAgentId,
  apiKeyConfigured: Boolean(agent.providerApiKeyEncrypted),
  providerConfig: agent.providerConfig ?? {},
  autoImportCalls: agent.autoImportCalls,
  autoSyncPrompt: agent.autoSyncPrompt,
  sendPostConversationMetadata: agent.sendPostConversationMetadata,
  redactionFields: agent.redactionFields.map((row) => row.field).sort(),
  webhookUrl: agent.webhookUrl,
  webhookSecretConfigured: Boolean(agent.webhookSecretEncrypted),
  mockToolsEnabled: agent.mockToolsEnabled,
  mockTools: agent.mockTools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    mappingCount: tool._count.mappings,
  })),
  dynamicVariables: agent.dynamicVariables,
  knowledgeBaseFiles: agent.knowledgeBaseFiles.map((row) => row.file.fileName),
  knowledgeBaseConnectors: agent.knowledgeBaseConnectors,
});

export type AgentSnapshot = ReturnType<typeof toAgentSnapshot>;

const SNAPSHOT_FIELD_LABEL: Record<keyof AgentSnapshot, string> = {
  name: 'Agent name',
  description: 'Description',
  language: 'Language',
  provider: 'Provider',
  phoneNumber: 'Phone Number',
  inbound: 'Inbound',
  providerAgentId: 'Assistant ID',
  apiKeyConfigured: 'API key',
  providerConfig: 'Integration Settings',
  autoImportCalls: 'Auto-fetch Production Calls',
  autoSyncPrompt: 'Auto-sync Prompts',
  sendPostConversationMetadata: 'Send Post Conversation Metadata',
  redactionFields: 'Redact Sensitive Data',
  webhookUrl: 'Webhook URL',
  webhookSecretConfigured: 'Webhook Secret',
  mockToolsEnabled: 'Enable Mock Tools by Default',
  mockTools: 'Mock Tools',
  dynamicVariables: 'Dynamic Variables',
  knowledgeBaseFiles: 'Knowledge files',
  knowledgeBaseConnectors: 'Connectors',
};

const isSnapshotObject = (
  value: Prisma.JsonValue,
): value is Prisma.JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toSnapshotObject = (
  value: Prisma.JsonValue | null,
): Prisma.JsonObject => {
  if (value && isSnapshotObject(value)) return value;
  return {};
};

const isSnapshotKey = (key: string): key is keyof AgentSnapshot =>
  key in SNAPSHOT_FIELD_LABEL;

export const describeSnapshotChange = (
  previous: Prisma.JsonValue | null,
  next: AgentSnapshot,
  extraLabels: string[],
) => {
  const before = toSnapshotObject(previous);
  const keys = Object.keys(SNAPSHOT_FIELD_LABEL).filter(isSnapshotKey);
  const changed = keys
    .filter(
      (key) =>
        JSON.stringify(before[key] ?? null) !==
        JSON.stringify(next[key] ?? null),
    )
    .map((key) => SNAPSHOT_FIELD_LABEL[key]);
  const labels = [...new Set([...changed, ...extraLabels])];
  if (labels.length === 0) return 'No changes';
  return `Changed: ${labels.join(', ')}`;
};
