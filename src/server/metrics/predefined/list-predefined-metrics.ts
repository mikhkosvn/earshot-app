import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/metrics/schemas';
import type { PredefinedMetricCard } from '@/server/metrics/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listPredefinedMetrics = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<PredefinedMetricCard[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.predefinedMetric.findMany({
      orderBy: [
        { subCategory: Prisma.SortOrder.asc },
        { name: Prisma.SortOrder.asc },
      ],
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        evalType: true,
        category: true,
        subCategory: true,
        badge: true,
        projectMetrics: { where: { projectId }, select: { id: true } },
      },
    });
    addEventFields({
      project: { id: projectId },
      predefined_metrics: { count: rows.length },
    });
    return rows.map(({ projectMetrics, ...row }) => ({
      ...row,
      added: projectMetrics.length > 0,
    }));
  },
);
