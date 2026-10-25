import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { KnowledgeConnectorItem } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { withValidation } from '@/server/common/run-action';

export const listKnowledgeConnectors = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<KnowledgeConnectorItem[]> => {
    await requireAgentAccess(agentId);
    return prisma.knowledgeBaseConnector.findMany({
      where: { agentId },
      orderBy: { id: Prisma.SortOrder.asc },
      select: {
        id: true,
        name: true,
        type: true,
        syncEnabled: true,
        syncIntervalDays: true,
        url: true,
        lastSyncedAt: true,
        createdAt: true,
      },
    });
  },
);
