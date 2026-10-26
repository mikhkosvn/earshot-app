import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { OBSERVABILITY_LOCKED_FUNCTIONS } from '@/server/metrics/constants/scoring/predefined-function';
import { updateMetricFlagsSchema } from '@/server/metrics/schemas';
import {
  metricListSelect,
  toMetricListItem,
} from '@/server/metrics/utils/metric-view';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const updateMetricFlags = withValidation(
  updateMetricFlagsSchema,
  async ({ metricId, ...flags }) => {
    await requireMetricAccess(metricId);
    const current = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId },
      select: { predefinedMetric: { select: { functionName: true } } },
    });
    const functionName = current.predefinedMetric?.functionName ?? '';
    if (
      flags.observabilityEnabled &&
      OBSERVABILITY_LOCKED_FUNCTIONS.includes(functionName)
    ) {
      throw new ActionError('This metric cannot run on calls.');
    }
    addEventFields({ metric: { id: metricId } });
    const row = await prisma.metric.update({
      where: { id: metricId },
      data: flags,
      select: metricListSelect,
    });
    return toMetricListItem(row);
  },
);
