import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/metrics/schemas';
import {
  metricOptionSelect,
  metricOrder,
  toMetricOption,
} from '@/server/metrics/utils/metric-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listMetricOptions = withValidation(
  projectIdSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metric.findMany({
      where: { projectId },
      orderBy: metricOrder,
      select: metricOptionSelect,
    });
    return rows.map(toMetricOption);
  },
);
