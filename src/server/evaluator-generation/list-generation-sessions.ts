import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { listGenerationSessionsSchema } from '@/server/evaluator-generation/schemas';
import type { GenerationSessionSummary } from '@/server/evaluator-generation/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const SESSION_HISTORY_LIMIT = 50;

export const listGenerationSessions = withValidation(
  listGenerationSessionsSchema,
  async ({ projectId }): Promise<GenerationSessionSummary[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.evaluatorGenerationSession.findMany({
      where: { projectId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      take: SESSION_HISTORY_LIMIT,
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        agent: { select: { name: true } },
        _count: { select: { evaluators: true } },
      },
    });
    addEventFields({ generation_sessions: { count: rows.length } });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      agentName: row.agent?.name ?? null,
      evaluatorCount: row._count.evaluators,
      createdAt: row.createdAt,
    }));
  },
);
