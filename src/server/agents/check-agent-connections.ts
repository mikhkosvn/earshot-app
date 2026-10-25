import 'server-only';

import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { ConnectionCheck } from '@/server/agents/types';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
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
    return checkConnections({
      provider: agent.provider,
      phoneNumber: agent.phoneNumber,
      providerAgentId: agent.providerAgentId,
      apiKeyConfigured: Boolean(agent.providerApiKeyEncrypted),
    });
  },
);
