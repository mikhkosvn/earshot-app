import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { deleteMetricsSchema } from '@/server/metrics/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const deleteMetrics = withValidation(
  deleteMetricsSchema,
  async ({ projectId, metricIds }) => {
    await requireProjectAccess(projectId);
    const { count } = await prisma.metric.deleteMany({
      where: { projectId, id: { in: metricIds } },
    });
    return { count };
  },
);
