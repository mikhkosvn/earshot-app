import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { MetricEvaluationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ALERT_REVIEW_FIRES_MAX } from '@/server/alerts/constants/alert-limits';
import {
  matchesAlertFilters,
  parseAlertFilters,
} from '@/server/alerts/utils/alert-filters';
import { numericValueOf } from '@/server/alerts/utils/evaluation-value';

const METADATA_OVERFETCH = 5;

export interface HistoryPoint {
  id: number;
  value: number;
}

interface HistoryRule {
  filters: Prisma.JsonValue | null;
  metric: { id: number };
}

const callLogWhere = (
  agentIds: number[],
): Prisma.CallLogNullableScalarRelationFilter => {
  if (agentIds.length === 0) return { isNot: null };
  return { is: { agentId: { in: agentIds } } };
};

const fetchSize = (count: number, hasMetadata: boolean) => {
  if (!hasMetadata) return count;
  return Math.min(count * METADATA_OVERFETCH, ALERT_REVIEW_FIRES_MAX);
};

export const loadMetricHistory = async (
  rule: HistoryRule,
  upToEvaluationId: number,
  count: number,
): Promise<HistoryPoint[]> => {
  const filters = parseAlertFilters(rule.filters);
  const rows = await prisma.metricEvaluation.findMany({
    where: {
      metricId: rule.metric.id,
      status: MetricEvaluationStatus.completed,
      id: { lte: upToEvaluationId },
      conversation: { callLog: callLogWhere(filters.agentIds) },
    },
    orderBy: { id: Prisma.SortOrder.desc },
    take: fetchSize(count, filters.metadata.length > 0),
    select: {
      id: true,
      valueNumber: true,
      valueBoolean: true,
      valueText: true,
      conversation: {
        select: { metadata: true, callLog: { select: { agentId: true } } },
      },
    },
  });
  return rows
    .filter((row) =>
      matchesAlertFilters(filters, {
        agentId: row.conversation.callLog?.agentId ?? null,
        metadata: row.conversation.metadata,
      }),
    )
    .flatMap((row) => {
      const value = numericValueOf(row);
      if (value === null) return [];
      return [{ id: row.id, value }];
    })
    .slice(0, count)
    .toReversed();
};
