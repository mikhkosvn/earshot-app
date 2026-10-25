import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { DynamicVariableItem } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const listDynamicVariables = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<DynamicVariableItem[]> => {
    await requireAgentAccess(agentId);
    return prisma.dynamicVariable.findMany({
      where: { agentId },
      orderBy: { name: Prisma.SortOrder.asc },
      select: { id: true, name: true, description: true },
    });
  },
);
