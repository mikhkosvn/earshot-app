import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/dashboards/schemas';
import type { PlotMetricOption } from '@/server/dashboards/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listPlotMetrics = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<PlotMetricOption[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metric.findMany({
      where: { projectId },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
      select: {
        id: true,
        name: true,
        evalType: true,
        predefinedMetric: { select: { functionName: true } },
      },
    });
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      evalType: row.evalType,
      functionName: row.predefinedMetric?.functionName ?? null,
    }));
  },
);
