import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  publicPersonalitySelect,
  toPublicPersonalityId,
} from '@/server/personalities/public-api/public-personality-id';

export const publicAgentSelect = {
  id: true,
  projectId: true,
  name: true,
  description: true,
  language: true,
  inbound: true,
  phoneNumber: true,
  providerAgentId: true,
  provider: true,
  providerApiKeyEncrypted: true,
  agentSpeaksFirst: true,
  mockToolsEnabled: true,
  autoSyncPrompt: true,
  createdAt: true,
  updatedAt: true,
  enabledPersonalities: {
    select: { personality: { select: publicPersonalitySelect } },
  },
} satisfies Prisma.AgentSelect;

export type PublicAgentRow = Prisma.AgentGetPayload<{
  select: typeof publicAgentSelect;
}>;

export const toPublicAgent = (row: PublicAgentRow) => ({
  id: row.id,
  project: row.projectId,
  agent_name: row.name,
  description: row.description,
  language: row.language,
  inbound: row.inbound,
  contact_number: row.phoneNumber,
  assistant_id: row.providerAgentId,
  assistant_provider: row.provider,
  transcript_provider: row.provider,
  vapi_api_key_configured: row.providerApiKeyEncrypted !== null,
  enabled_personalities: row.enabledPersonalities
    .map((link) => toPublicPersonalityId(link.personality))
    .toSorted((left, right) => left - right),
  agent_speaks_first: row.agentSpeaksFirst,
  mock_tools_enabled: row.mockToolsEnabled,
  auto_sync_prompt_enabled: row.autoSyncPrompt,
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});
