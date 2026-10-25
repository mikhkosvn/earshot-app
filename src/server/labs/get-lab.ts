import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { labMetricSchema } from '@/server/labs/schemas';
import type { LabView } from '@/server/labs/types';
import {
  labRowOrder,
  labRowSelect,
  scoreOf,
  toLabRowView,
} from '@/server/labs/utils/lab-row-view';
import { findLatestLabRun } from '@/server/labs/utils/lab-run-view';
import { findLatestOptimization } from '@/server/metric-optimizer/utils/optimization-view';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const getLab = withValidation(
  labMetricSchema,
  async ({ metricId }): Promise<LabView> => {
    const { metric } = await requireMetricAccess(metricId);
    const [reviews, run, optimization] = await Promise.all([
      prisma.labReview.findMany({
        where: { metricId },
        orderBy: labRowOrder,
        select: labRowSelect,
      }),
      findLatestLabRun(metric.projectId, metricId),
      findLatestOptimization(metricId),
    ]);
    const rows = reviews.map(toLabRowView);
    return { metricId, rows, score: scoreOf(rows), run, optimization };
  },
);
