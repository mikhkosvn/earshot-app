import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { OBSERVABILITY_LOCKED_FUNCTIONS } from '@/server/metrics/constants/scoring/predefined-function';
import { bulkUpdateMetricFlagsSchema } from '@/server/metrics/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const bulkUpdateMetricFlags = withValidation(
  bulkUpdateMetricFlagsSchema,
  async ({ projectId, metricIds, observabilityEnabled, ...flags }) => {
    await requireProjectAccess(projectId);
    const where = { projectId, id: { in: metricIds } };
    return prisma.$transaction(async (tx) => {
      const { count } = await tx.metric.updateMany({ where, data: flags });
      if (observabilityEnabled === undefined) return { count };
      await tx.metric.updateMany({
        where: {
          ...where,
          OR: [
            { predefinedMetric: null },
            {
              predefinedMetric: {
                OR: [
                  { functionName: null },
                  { functionName: { notIn: OBSERVABILITY_LOCKED_FUNCTIONS } },
                ],
              },
            },
          ],
        },
        data: { observabilityEnabled },
      });
      return { count };
    });
  },
);
