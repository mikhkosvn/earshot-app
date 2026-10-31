import 'server-only';

import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { updatePublicAgentSchema } from '@/server/agents/public-api/schemas';
import { agentScopeWhere } from '@/server/agents/public-api/utils/agent-scope-where';
import {
  publicAgentSelect,
  toPublicAgent,
} from '@/server/agents/public-api/utils/public-agent';
import {
  encryptedPublicApiKey,
  publicAgentData,
} from '@/server/agents/public-api/utils/public-agent-data';
import {
  replaceEnabledPersonalities,
  resolveEnabledPersonalityIds,
} from '@/server/agents/public-api/utils/replace-enabled-personalities';
import { saveAgentVersion } from '@/server/agents/utils/save-agent-version';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { readJsonBody } from '@/server/public-api/read-json-body';

const API_KEY_LABEL = 'API key';

const secretLabels = (apiKey: string | null | undefined) => {
  if (!apiKey) return [];
  return [API_KEY_LABEL];
};

const enabledPersonalityIdsOf = async (
  projectId: number,
  publicIds: number[] | undefined,
) => {
  if (!publicIds) return null;
  return resolveEnabledPersonalityIds(projectId, publicIds);
};

export const updatePublicAgent = async ({
  auth,
  agentId,
  request,
}: {
  auth: ApiKeyAuth;
  agentId: number;
  request: Request;
}) => {
  const current = await prisma.agent.findUniqueOrThrow({
    where: { id: agentId, ...agentScopeWhere(auth) },
    select: { id: true, projectId: true, provider: true },
  });
  const body = updatePublicAgentSchema.parse(await readJsonBody(request));
  const personalityIds = await enabledPersonalityIdsOf(
    current.projectId,
    body.enabled_personalities,
  );
  const providerChanged =
    body.assistant_provider !== undefined &&
    body.assistant_provider !== current.provider;
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: current.projectId },
    agent: {
      id: current.id,
      provider: body.assistant_provider ?? current.provider,
      provider_changed: providerChanged,
      api_key_changed: Boolean(body.vapi_api_key),
    },
    personalities: { count: personalityIds?.length },
  });

  const row = await prisma.$transaction(
    async (tx) => {
      await tx.agent.update({
        where: { id: current.id },
        data: {
          ...publicAgentData(body),
          ...(body.agent_name && { name: body.agent_name }),
          providerApiKeyEncrypted: encryptedPublicApiKey(
            body.vapi_api_key,
            providerChanged,
          ),
        },
      });
      if (personalityIds) {
        await replaceEnabledPersonalities(tx, {
          projectId: current.projectId,
          agentId: current.id,
          personalityIds,
        });
      }
      await saveAgentVersion(tx, {
        agentId: current.id,
        userId: null,
        extraLabels: secretLabels(body.vapi_api_key),
      });
      return tx.agent.findUniqueOrThrow({
        where: { id: current.id },
        select: publicAgentSelect,
      });
    },
    { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
  );
  return toPublicAgent(row);
};
