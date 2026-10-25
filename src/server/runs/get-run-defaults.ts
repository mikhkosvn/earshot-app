import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { runDefaultsSchema } from '@/server/runs/schemas';
import type { RunDefaults } from '@/server/runs/types';

const mostCommon = (ids: number[]) => {
  const counts = new Map<number, number>();
  for (const id of ids) counts.set(id, (counts.get(id) ?? 0) + 1);
  let best: number | null = null;
  let bestCount = 0;
  for (const [id, count] of counts) {
    if (count <= bestCount) continue;
    best = id;
    bestCount = count;
  }
  return best;
};

const firstAgentId = async (projectId: number) => {
  const agent = await prisma.agent.findFirst({
    where: { projectId },
    orderBy: [
      { createdAt: Prisma.SortOrder.desc },
      { id: Prisma.SortOrder.desc },
    ],
    select: { id: true },
  });
  return agent?.id ?? null;
};

export const getRunDefaults = withValidation(
  runDefaultsSchema,
  async ({ projectId, evaluatorIds }): Promise<RunDefaults> => {
    await requireProjectAccess(projectId);
    const project = await prisma.project.findUniqueOrThrow({
      where: { id: projectId },
      select: { organization: { select: { maxConcurrentRuns: true } } },
    });
    const evaluators = await prisma.evaluator.findMany({
      where: { id: { in: evaluatorIds }, projectId, agentId: { not: null } },
      select: { agentId: true },
    });
    const agentId =
      mostCommon(
        evaluators.flatMap((row) => {
          if (row.agentId === null) return [];
          return [row.agentId];
        }),
      ) ?? (await firstAgentId(projectId));
    return {
      agentId,
      maxConcurrentRuns: project.organization.maxConcurrentRuns,
    };
  },
);
