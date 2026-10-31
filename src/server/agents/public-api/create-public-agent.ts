import 'server-only';

import { AgentProvider, Language } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { createPublicAgentSchema } from '@/server/agents/public-api/schemas';
import {
  publicAgentSelect,
  toPublicAgent,
} from '@/server/agents/public-api/utils/public-agent';
import {
  encryptedPublicApiKey,
  publicAgentData,
} from '@/server/agents/public-api/utils/public-agent-data';
import { createAgentRecord } from '@/server/agents/utils/agent-record/create-agent-record';
import { checkConnections } from '@/server/agents/utils/check-connections';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError } from '@/server/common/run-action';
import { resolveProjectId } from '@/server/public-api/project-scope';
import { readJsonBody } from '@/server/public-api/read-json-body';

export const createPublicAgent = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = createPublicAgentSchema.parse(await readJsonBody(request));
  const projectId = await resolveProjectId(auth, body.project);
  const data = {
    language: Language.en,
    provider: AgentProvider.custom,
    ...publicAgentData(body),
    name: body.agent_name,
    description: body.description ?? '',
    providerApiKeyEncrypted: encryptedPublicApiKey(body.vapi_api_key, false),
  };
  const check = checkConnections({
    provider: data.provider,
    phoneNumber: data.phoneNumber ?? null,
    providerAgentId: data.providerAgentId ?? null,
    apiKeyConfigured: Boolean(data.providerApiKeyEncrypted),
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    agent: { provider: data.provider },
    connection_check: {
      valid: check.valid,
      connection_count: check.connections.length,
      connection_types: check.connections.map((item) => item.type),
    },
  });
  if (!check.valid) throw new ActionError(check.message ?? '', 400);

  const row = await prisma.$transaction(
    async (tx) => {
      const agent = await createAgentRecord(tx, {
        projectId,
        userId: null,
        data,
        redactionFields: [],
      });
      return tx.agent.findUniqueOrThrow({
        where: { id: agent.id },
        select: publicAgentSelect,
      });
    },
    { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
  );
  addEventFields({ agent: { id: row.id } });
  return toPublicAgent(row);
};
