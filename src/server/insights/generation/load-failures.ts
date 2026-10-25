import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { MetricEvaluationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { evaluationValueOf } from '@/server/alerts/utils/evaluation-value';
import { INSIGHT_EXPLANATION_MAX } from '@/server/insights/constants/insight-limits';
import {
  isInsightFailure,
  passKindOf,
} from '@/server/insights/utils/pass-condition';

export const failureEvaluationSelect = {
  id: true,
  status: true,
  createdAt: true,
  metricId: true,
  valueNumber: true,
  valueBoolean: true,
  valueText: true,
  explanation: true,
  conversation: {
    select: {
      callLog: { select: { id: true, agentId: true } },
      turns: {
        orderBy: { position: Prisma.SortOrder.asc },
        take: 6,
        select: { role: true, content: true },
      },
    },
  },
} satisfies Prisma.MetricEvaluationSelect;

export type FailureEvaluationRecord = Prisma.MetricEvaluationGetPayload<{
  select: typeof failureEvaluationSelect;
}>;

export interface FailureItem {
  evaluationId: number;
  value: string;
  explanation: string;
  excerpt: string;
}

export const insightMetricSelect = {
  id: true,
  name: true,
  description: true,
  evalType: true,
  predefinedMetric: { select: { functionName: true } },
  insightConfig: {
    select: {
      passOperator: true,
      passNumberValue: true,
      passBooleanValue: true,
      passTextValues: true,
    },
  },
} satisfies Prisma.MetricSelect;

export type InsightMetric = Prisma.MetricGetPayload<{
  select: typeof insightMetricSelect;
}>;

const clip = (text: string) => text.slice(0, INSIGHT_EXPLANATION_MAX);

export const toFailureItem = (row: FailureEvaluationRecord): FailureItem => ({
  evaluationId: row.id,
  value: String(evaluationValueOf(row)),
  explanation: clip(row.explanation.join(' ')),
  excerpt: clip(
    row.conversation.turns
      .map((turn) => `${turn.role}: ${turn.content}`)
      .join('\n'),
  ),
});

export const isCallFailure = (
  metric: InsightMetric,
  row: FailureEvaluationRecord,
) => {
  if (!metric.insightConfig) return false;
  if (row.status !== MetricEvaluationStatus.completed) return false;
  if (!row.conversation.callLog) return false;
  return isInsightFailure(passKindOf(metric), metric.insightConfig, row);
};

export const loadWindowEvaluations = (
  metricId: number,
  windowStart: Date,
  windowEnd: Date,
  take: number,
) =>
  prisma.metricEvaluation.findMany({
    where: {
      metricId,
      status: MetricEvaluationStatus.completed,
      createdAt: { gte: windowStart, lte: windowEnd },
      conversation: { callLog: { isNot: null } },
    },
    orderBy: { id: Prisma.SortOrder.desc },
    take,
    select: failureEvaluationSelect,
  });
