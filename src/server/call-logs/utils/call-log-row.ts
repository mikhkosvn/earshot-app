import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { CallLogRow, CallMetricCell } from '@/server/call-logs/types';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';

export const callLogRowSelect = {
  id: true,
  externalCallId: true,
  conversationId: true,
  customerNumber: true,
  status: true,
  evaluationStatus: true,
  feedback: true,
  errorMessage: true,
  createdAt: true,
  agentId: true,
  agent: { select: { name: true } },
  conversation: {
    select: {
      startedAt: true,
      endedAt: true,
      endedReason: true,
      metricEvaluations: {
        orderBy: { metric: { displayOrder: Prisma.SortOrder.asc } },
        select: {
          metricId: true,
          status: true,
          valueNumber: true,
          valueBoolean: true,
          valueText: true,
          normalizedScore: true,
          extra: true,
        },
      },
    },
  },
} satisfies Prisma.CallLogSelect;

export type CallLogRowRecord = Prisma.CallLogGetPayload<{
  select: typeof callLogRowSelect;
}>;

type EvaluationRecord =
  CallLogRowRecord['conversation']['metricEvaluations'][number];

const asRecord = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

const numberOrNull = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  return null;
};

const toMetricCell = (evaluation: EvaluationRecord): CallMetricCell => {
  const extra = asRecord(evaluation.extra);
  const percentiles = asRecord(extra.percentiles);
  return {
    metricId: evaluation.metricId,
    status: evaluation.status,
    value: valueFromParts({
      number: evaluation.valueNumber,
      boolean: evaluation.valueBoolean,
      text: evaluation.valueText,
    }),
    normalizedScore: evaluation.normalizedScore,
    firstTurn: numberOrNull(extra.first_turn),
    p50: numberOrNull(percentiles.p50),
    p99: numberOrNull(percentiles.p99),
  };
};

export const durationSecondsOf = (conversation: {
  startedAt: Date | null;
  endedAt: Date | null;
}) => {
  if (!conversation.startedAt || !conversation.endedAt) return null;
  return Math.max(
    0,
    (conversation.endedAt.getTime() - conversation.startedAt.getTime()) / 1000,
  );
};

export const toCallLogRow = (record: CallLogRowRecord): CallLogRow => ({
  id: record.id,
  callId: record.externalCallId,
  conversationId: record.conversationId,
  startedAt: record.conversation.startedAt ?? record.createdAt,
  durationSeconds: durationSecondsOf(record.conversation),
  agentId: record.agentId,
  agentName: record.agent?.name ?? null,
  customerNumber: record.customerNumber,
  endedReason: record.conversation.endedReason,
  status: record.status,
  evaluationStatus: record.evaluationStatus,
  feedback: record.feedback,
  errorMessage: record.errorMessage,
  metrics: record.conversation.metricEvaluations.map(toMetricCell),
});
