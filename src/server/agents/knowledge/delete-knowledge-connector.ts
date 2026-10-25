import 'server-only';

import { prisma } from '@/lib/prisma';
import { knowledgeConnectorIdSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';

export const deleteKnowledgeConnector = withValidation(
  knowledgeConnectorIdSchema,
  async ({ knowledgeConnectorId }) => {
    const { user } = await requireUser();
    await prisma.knowledgeBaseConnector.findUniqueOrThrow({
      where: { id: knowledgeConnectorId, agent: agentAccessWhere(user.id) },
      select: { id: true },
    });
    return prisma.knowledgeBaseConnector.delete({
      where: { id: knowledgeConnectorId },
      select: { id: true, agentId: true },
    });
  },
);
