import 'server-only';

import { prisma } from '@/lib/prisma';
import { renameAgentVersionSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';

export const renameAgentVersion = withValidation(
  renameAgentVersionSchema,
  async ({ agentVersionId, name }) => {
    const { user } = await requireUser();
    await prisma.agentVersion.findUniqueOrThrow({
      where: { id: agentVersionId, agent: agentAccessWhere(user.id) },
      select: { id: true },
    });
    return prisma.agentVersion.update({
      where: { id: agentVersionId },
      data: { name: name || null },
      select: { id: true, agentId: true },
    });
  },
);
