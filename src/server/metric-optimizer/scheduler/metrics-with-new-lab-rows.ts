import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { OptimizationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { labMetricWhere } from '@/server/labs/utils/lab-metric-where';
import { ACTIVE_OPTIMIZATION_STATUSES } from '@/server/metric-optimizer/constants/optimization-statuses';

interface MetricRow {
  id: number;
  labReviews: { createdAt: Date }[];
  optimizationSessions: { createdAt: Date; status: OptimizationStatus }[];
}

const hasNewRows = ({ labReviews, optimizationSessions }: MetricRow) => {
  const [latestReview] = labReviews;
  const [latestSession] = optimizationSessions;
  if (!latestReview) return false;
  if (!latestSession) return true;
  if (ACTIVE_OPTIMIZATION_STATUSES.includes(latestSession.status)) return false;
  return latestReview.createdAt.getTime() > latestSession.createdAt.getTime();
};

export const metricsWithNewLabRows = async (projectId: number) => {
  const metrics = await prisma.metric.findMany({
    where: { ...labMetricWhere(projectId), labReviews: { some: {} } },
    orderBy: { id: Prisma.SortOrder.asc },
    select: {
      id: true,
      labReviews: {
        orderBy: { createdAt: Prisma.SortOrder.desc },
        take: 1,
        select: { createdAt: true },
      },
      optimizationSessions: {
        orderBy: { createdAt: Prisma.SortOrder.desc },
        take: 1,
        select: { createdAt: true, status: true },
      },
    },
  });
  return metrics.filter(hasNewRows).map((metric) => metric.id);
};
