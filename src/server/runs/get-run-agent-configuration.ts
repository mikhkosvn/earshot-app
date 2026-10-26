import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { runAgentSchema } from '@/server/runs/schemas';
import type { RunAgentConfiguration } from '@/server/runs/types';
import { loadRunAgent } from '@/server/runs/utils/run-references';

const loadSkippedMetrics = (projectId: number, evaluatorIds: number[]) =>
  prisma.metric.findMany({
    where: {
      projectId,
      simulationEnabled: false,
      evaluators: { some: { evaluatorId: { in: evaluatorIds } } },
    },
    orderBy: [
      { displayOrder: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: { id: true, name: true },
  });

export const getRunAgentConfiguration = withValidation(
  runAgentSchema,
  async ({
    projectId,
    agentId,
    evaluatorIds,
  }): Promise<RunAgentConfiguration> => {
    await requireProjectAccess(projectId);
    const agent = await loadRunAgent(projectId, agentId);
    addEventFields({
      agent: { id: agent.id },
      evaluator: { count: evaluatorIds.length },
    });
    return {
      agentId: agent.id,
      phoneNumber: agent.phoneNumber,
      mockToolsEnabled: agent.mockToolsEnabled,
      mockTools: agent.mockTools,
      skippedMetrics: await loadSkippedMetrics(projectId, evaluatorIds),
    };
  },
);
