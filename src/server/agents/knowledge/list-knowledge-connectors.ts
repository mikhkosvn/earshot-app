import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { agentIdSchema } from '@/server/agents/schemas';
import type { KnowledgeConnectorItem } from '@/server/agents/types';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';

export const listKnowledgeConnectors = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<KnowledgeConnectorItem[]> => {
    const { agent } = await requireAgentAccess(agentId);
    const connectors = await prisma.knowledgeBaseConnector.findMany({
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
    addEventFields({
      project: { id: agent.projectId },
      agent: { id: agentId },
      knowledge_connectors: { count: connectors.length },
    });
    return connectors;
  },
);
