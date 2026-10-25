import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { DynamicVariableItem } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const listDynamicVariables = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<DynamicVariableItem[]> => {
    const { agent } = await requireAgentAccess(agentId);
    const variables = await prisma.dynamicVariable.findMany({
      where: { agentId },
      orderBy: { name: Prisma.SortOrder.asc },
      select: { id: true, name: true, description: true },
    });
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId },
      dynamic_variables: { count: variables.length },
    });
    return variables;
  },
);
