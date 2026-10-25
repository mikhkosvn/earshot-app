import type { Prisma } from '@/generated/prisma/client';

export const labMetricWhere = (projectId: number): Prisma.MetricWhereInput => ({
  projectId,
  OR: [{ predefinedMetricId: null }, { predefinedMetric: { editable: true } }],
});
