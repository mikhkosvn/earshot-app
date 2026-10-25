import 'server-only';

import { prisma } from '@/lib/prisma';
import { addDynamicVariablesSchema } from '@/server/agents/schemas';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { ActionError, withValidation } from '@/server/common/run-action';

const duplicateNames = (names: string[]) =>
  names.filter((name, index) => names.indexOf(name) !== index);

export const addDynamicVariables = withValidation(
  addDynamicVariablesSchema,
  async ({ agentId, variables }) => {
    await requireAgentAccess(agentId);
    const names = variables.map((variable) => variable.name);
    const [repeated] = duplicateNames(names);
    if (repeated) {
      throw new ActionError(`The name "${repeated}" is used two times.`, 400);
    }
    const existing = await prisma.dynamicVariable.findFirst({
      where: { agentId, name: { in: names } },
      select: { name: true },
    });
    if (existing) {
      throw new ActionError(
        `A dynamic variable with the name "${existing.name}" exists.`,
        409,
      );
    }
    await prisma.dynamicVariable.createMany({
      data: variables.map((variable) => ({ agentId, ...variable })),
    });
    return { agentId, count: variables.length };
  },
);
