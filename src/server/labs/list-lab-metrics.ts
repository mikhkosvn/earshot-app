import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { labProjectSchema } from '@/server/labs/schemas';
import type { LabMetricListItem } from '@/server/labs/types';
import {
  actualValueOf,
  expectedValueOf,
  scoreOf,
} from '@/server/labs/utils/lab-row-view';
import { labMetricWhere } from '@/server/labs/utils/lab-metric-where';
import { valuesMatch } from '@/server/labs/utils/values-match';
import { metricOrder } from '@/server/metrics/utils/metric-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listLabMetrics = withValidation(
  labProjectSchema,
  async ({ projectId }): Promise<LabMetricListItem[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metric.findMany({
      where: labMetricWhere(projectId),
      orderBy: metricOrder,
      select: {
        id: true,
        name: true,
        type: true,
        evalType: true,
        description: true,
        labReviews: {
          select: {
            expectedNumber: true,
            expectedBoolean: true,
            expectedText: true,
            actualNumber: true,
            actualBoolean: true,
            actualText: true,
          },
        },
      },
    });
    return rows.map(({ labReviews, ...metric }) => ({
      ...metric,
      score: scoreOf(
        labReviews.map((review) => ({
          matched: valuesMatch(expectedValueOf(review), actualValueOf(review)),
        })),
      ),
    }));
  },
);
