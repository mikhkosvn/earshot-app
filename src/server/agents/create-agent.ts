import 'server-only';

import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { createAgentSchema } from '@/server/agents/schemas';
import type { CreatedAgent } from '@/server/agents/types';
import {
  agentConfigData,
  redactionFieldsOf,
} from '@/server/agents/utils/agent-config-data';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { createAgentRecord } from '@/server/agents/utils/agent-record/create-agent-record';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createAgent = withValidation(
  createAgentSchema,
  async ({ projectId, ...values }): Promise<CreatedAgent> => {
    const { user } = await requireProjectAccess(projectId);
    const data = agentConfigData(values, null);
    const check = checkConnections({
      provider: data.provider,
      phoneNumber: data.phoneNumber,
      providerAgentId: data.providerAgentId,
      apiKeyConfigured: Boolean(data.providerApiKeyEncrypted),
    });
    addEventFields({
      project: { id: projectId },
      agent: { provider: data.provider },
      connection_check: {
        valid: check.valid,
        connection_count: check.connections.length,
        connection_types: check.connections.map((item) => item.type),
      },
    });
    if (!check.valid) throw new ActionError(check.message ?? '', 400);

    const agent = await prisma.$transaction(
      (tx) =>
        createAgentRecord(tx, {
          projectId,
          userId: user.id,
          data,
          redactionFields: redactionFieldsOf(values),
        }),
      { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
    );
    addEventFields({ agent: { id: agent.id } });
    return { id: agent.id, name: agent.name, check };
  },
);
