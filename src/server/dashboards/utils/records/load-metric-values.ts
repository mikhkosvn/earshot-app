import 'server-only';

import { MetricEvaluationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

export type MetricValue = {
  number: number | null;
  boolean: boolean | null;
  text: string | null;
};

export const loadMetricValues = async (
  metricId: number,
  conversationIds: number[],
): Promise<Map<number, MetricValue>> => {
  if (conversationIds.length === 0) return new Map();
  const rows = await prisma.metricEvaluation.findMany({
    where: {
      metricId,
      conversationId: { in: conversationIds },
      status: MetricEvaluationStatus.completed,
    },
    select: {
      conversationId: true,
      valueNumber: true,
      valueBoolean: true,
      valueText: true,
    },
  });
  return new Map(
    rows.map((row) => [
      row.conversationId,
      {
        number: row.valueNumber,
        boolean: row.valueBoolean,
        text: row.valueText,
      },
    ]),
  );
};
