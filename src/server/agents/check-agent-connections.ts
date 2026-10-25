import 'server-only';

import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { ConnectionCheck } from '@/server/agents/types';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const checkAgentConnections = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<ConnectionCheck> => {
    const { user } = await requireUser();
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId, ...agentAccessWhere(user.id) },
      select: {
        provider: true,
        phoneNumber: true,
        providerAgentId: true,
        providerApiKeyEncrypted: true,
      },
    });
    const check = checkConnections({
      provider: agent.provider,
      phoneNumber: agent.phoneNumber,
      providerAgentId: agent.providerAgentId,
      apiKeyConfigured: Boolean(agent.providerApiKeyEncrypted),
    });
    addEventFields({
      agent: { id: agentId, provider: agent.provider },
      connection_check: {
        valid: check.valid,
        connection_count: check.connections.length,
        connection_types: check.connections.map((item) => item.type),
      },
    });
    return check;
  },
);
