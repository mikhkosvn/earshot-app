import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

type MetricReader = Pick<Prisma.TransactionClient, 'metric'>;

export const metricIdsByFunction = async (
  projectId: number,
  db: MetricReader = prisma,
) => {
  const rows = await db.metric.findMany({
    where: { projectId, predefinedMetric: { functionName: { not: null } } },
    select: { id: true, predefinedMetric: { select: { functionName: true } } },
  });
  return new Map(
    rows.flatMap((row) => {
      const functionName = row.predefinedMetric?.functionName;
      if (!functionName) return [];
      return [[functionName, row.id] as const];
    }),
  );
};

export const findPlotMetric = (projectId: number, metricId: number) =>
  prisma.metric.findFirst({
    where: { id: metricId, projectId },
    select: { id: true, name: true, evalType: true },
  });
