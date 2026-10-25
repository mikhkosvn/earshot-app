import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { updateMetricSampleRateSchema } from '@/server/metrics/schemas';
import {
  metricListSelect,
  toMetricListItem,
} from '@/server/metrics/utils/metric-view';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const updateMetricSampleRate = withValidation(
  updateMetricSampleRateSchema,
  async ({ metricId, sampleRate }) => {
    await requireMetricAccess(metricId);
    const current = await prisma.metric.findUniqueOrThrow({
      where: { id: metricId },
      select: { samplingEnabled: true },
    });
    if (!current.samplingEnabled) {
      throw new ActionError('Turn on sampling for this metric first.');
    }
    addEventFields({ metric: { id: metricId, sample_rate: sampleRate } });
    const row = await prisma.metric.update({
      where: { id: metricId },
      data: { sampleRate },
      select: metricListSelect,
    });
    return toMetricListItem(row);
  },
);
