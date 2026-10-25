import 'server-only';

import { prisma } from '@/lib/prisma';
import { renameAgentVersionSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const renameAgentVersion = withValidation(
  renameAgentVersionSchema,
  async ({ agentVersionId, name }) => {
    const { user } = await requireUser();
    await prisma.agentVersion.findUniqueOrThrow({
      where: { id: agentVersionId, agent: agentAccessWhere(user.id) },
      select: { id: true },
    });
    const renamed = await prisma.agentVersion.update({
      where: { id: agentVersionId },
      data: { name: name || null },
      select: { id: true, agentId: true },
    });
    addEventFields({
      agent: { id: renamed.agentId },
      agent_version: { id: renamed.id },
    });
    return renamed;
  },
);
