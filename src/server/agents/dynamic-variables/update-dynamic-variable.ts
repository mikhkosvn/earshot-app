import 'server-only';

import { prisma } from '@/lib/prisma';
import { updateDynamicVariableSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';

export const updateDynamicVariable = withValidation(
  updateDynamicVariableSchema,
  async ({ dynamicVariableId, name, description }) => {
    const { user } = await requireUser();
    const variable = await prisma.dynamicVariable.findUniqueOrThrow({
      where: { id: dynamicVariableId, agent: agentAccessWhere(user.id) },
      select: { agentId: true },
    });
    const existing = await prisma.dynamicVariable.findFirst({
      where: {
        agentId: variable.agentId,
        name,
        id: { not: dynamicVariableId },
      },
      select: { id: true },
    });
    if (existing) {
      throw new ActionError(
        `A dynamic variable with the name "${name}" exists.`,
        409,
      );
    }
    const updated = await prisma.dynamicVariable.update({
      where: { id: dynamicVariableId },
      data: { name, description },
      select: { id: true, agentId: true },
    });
    addEventFields({
      agent: { id: updated.agentId },
      dynamic_variable: { id: updated.id },
    });
    return updated;
  },
);
