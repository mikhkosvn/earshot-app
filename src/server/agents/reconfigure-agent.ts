import 'server-only';

import { prisma } from '@/lib/prisma';
import { AgentProviderLabel } from '@/server/agents/constants/agent-provider-labels';
import { agentIdSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { ActionError, withValidation } from '@/server/common/run-action';

export const reconfigureAgent = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<never> => {
    await requireAgentAccess(agentId);
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId },
      select: { provider: true },
    });
    throw new ActionError(
      `Earshot cannot reach ${AgentProviderLabel[agent.provider]} yet, so the agent configuration was not fetched. Your agent stays unchanged.`,
      400,
    );
  },
);
