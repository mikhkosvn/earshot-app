import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { MetricOption } from '@/server/evaluators/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listMetricOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<MetricOption[]> => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId },
      select: { id: true, name: true },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
    });
    addEventFields({
      project: { id: projectId },
      metrics: { count: metrics.length },
    });
    return metrics;
  },
);
