import 'server-only';

import { prisma } from '@/lib/prisma';
import { dynamicVariableIdSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';

export const deleteDynamicVariable = withValidation(
  dynamicVariableIdSchema,
  async ({ dynamicVariableId }) => {
    const { user } = await requireUser();
    await prisma.dynamicVariable.findUniqueOrThrow({
      where: { id: dynamicVariableId, agent: agentAccessWhere(user.id) },
      select: { id: true },
    });
    return prisma.dynamicVariable.delete({
      where: { id: dynamicVariableId },
      select: { id: true, agentId: true },
    });
  },
);
