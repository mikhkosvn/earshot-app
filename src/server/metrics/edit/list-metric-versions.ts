import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { metricIdSchema } from '@/server/metrics/schemas';
import type { MetricSnapshot, MetricVersionView } from '@/server/metrics/types';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const listMetricVersions = withValidation(
  metricIdSchema,
  async ({ metricId }): Promise<MetricVersionView[]> => {
    await requireMetricAccess(metricId);
    const rows = await prisma.metricVersion.findMany({
      where: { metricId },
      orderBy: { version: Prisma.SortOrder.desc },
      select: {
        id: true,
        version: true,
        changeType: true,
        changeReason: true,
        createdAt: true,
        snapshot: true,
        createdBy: { select: { id: true, name: true } },
      },
    });
    return rows.map((row) => ({
      ...row,
      snapshot: row.snapshot as MetricSnapshot,
    }));
  },
);
