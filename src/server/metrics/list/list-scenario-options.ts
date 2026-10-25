import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/metrics/schemas';
import type { ScenarioOption } from '@/server/metrics/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listScenarioOptions = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<ScenarioOption[]> => {
    await requireProjectAccess(projectId);
    return prisma.evaluator.findMany({
      where: { projectId },
      orderBy: { id: Prisma.SortOrder.asc },
      select: { id: true, name: true },
    });
  },
);
