import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { metricIdSchema } from '@/server/metrics/schemas';
import {
  metricDetailSelect,
  toMetricDetail,
} from '@/server/metrics/utils/metric-view';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const getMetric = withValidation(
  metricIdSchema,
  async ({ metricId }) => {
    await requireMetricAccess(metricId);
    const row = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId },
      select: metricDetailSelect,
    });
    addEventFields({ metric: { id: metricId, kind: row.type } });
    return toMetricDetail(row);
  },
);
