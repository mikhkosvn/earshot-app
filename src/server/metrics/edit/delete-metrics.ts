import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
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
    addEventFields({
      project: { id: projectId },
      metrics: { requested_count: metricIds.length, deleted_count: count },
    });
    return { count };
  },
);
