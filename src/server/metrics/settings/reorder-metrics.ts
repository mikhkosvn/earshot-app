import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { reorderMetricsSchema } from '@/server/metrics/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const reorderMetrics = withValidation(
  reorderMetricsSchema,
  async ({ projectId, metricIds }) => {
    await requireProjectAccess(projectId);
    const found = await prisma.metric.count({
      where: { projectId, id: { in: metricIds } },
    });
    if (found !== new Set(metricIds).size) {
      throw new ActionError('The order holds a metric of another project.');
    }
    await prisma.$transaction(
      metricIds.map((id, index) =>
        prisma.metric.update({
          where: { id },
          data: { displayOrder: index + 1 },
        }),
      ),
    );
    return { metricIds };
  },
);
