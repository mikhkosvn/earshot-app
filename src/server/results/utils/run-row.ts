import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { endedReasonLabel } from '@/server/conversations/utils/ended-reason-label';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import {
  RunSortField,
  type SortDirection,
} from '@/server/results/constants/result-list';
import type { RunMetricCell, RunRow } from '@/server/results/types';
import {
  evaluatorRefOf,
  runStartOf,
  toAgentRef,
  toNamedRef,
} from '@/server/results/utils/refs';

const namedSelect = { select: { id: true, name: true } } as const;

export const runRowSelect = {
  id: true,
  resultId: true,
  conversationId: true,
  status: true,
  evaluationStatus: true,
  feedback: true,
  callerNumber: true,
  evaluatorSnapshot: true,
  executedAt: true,
  createdAt: true,
  evaluator: namedSelect,
  personality: namedSelect,
  testProfile: namedSelect,
  result: {
    select: {
      agent: namedSelect,
      agentVersion: { select: { version: true } },
    },
  },
  conversation: {
    select: {
      startedAt: true,
      endedAt: true,
      endedReason: true,
      ringingDurationSeconds: true,
      metricEvaluations: {
        select: {
          metricId: true,
          valueNumber: true,
          valueBoolean: true,
          valueText: true,
          extra: true,
        },
      },
    },
  },
} satisfies Prisma.RunSelect;

export type RunRowRecord = Prisma.RunGetPayload<{
  select: typeof runRowSelect;
}>;

const numberField = (record: Record<string, unknown> | null, key: string) => {
  const value = record?.[key];
  if (typeof value === 'number') return value;
  return null;
};

const recordOf = (value: Prisma.JsonValue | null) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value;
};

const toCell = (
  evaluation: RunRowRecord['conversation']['metricEvaluations'][number],
): RunMetricCell => {
  const extra = recordOf(evaluation.extra);
  const percentiles = recordOf(extra?.percentiles ?? null);
  return {
    value: valueFromParts({
      number: evaluation.valueNumber,
      boolean: evaluation.valueBoolean,
      text: evaluation.valueText,
    }),
    firstTurn: numberField(extra, 'first_turn'),
    p50: numberField(percentiles, 'p50'),
    p99: numberField(percentiles, 'p99'),
  };
};

const durationOf = (conversation: RunRowRecord['conversation']) => {
  if (!conversation.startedAt || !conversation.endedAt) return null;
  return (
    (conversation.endedAt.getTime() - conversation.startedAt.getTime()) / 1000
  );
};

export const toRunRow = (run: RunRowRecord): RunRow => ({
  id: run.id,
  resultId: run.resultId,
  conversationId: run.conversationId,
  evaluator: evaluatorRefOf(run.evaluator, run.evaluatorSnapshot),
  startedAt: runStartOf(run),
  durationSeconds: durationOf(run.conversation),
  status: run.status,
  evaluationStatus: run.evaluationStatus,
  personality: toNamedRef(run.personality),
  agent: toAgentRef(run.result.agent, run.result.agentVersion),
  testProfile: toNamedRef(run.testProfile),
  testingNumber: run.callerNumber,
  endedReason: endedReasonLabel(run.conversation.endedReason),
  ringingDuration: run.conversation.ringingDurationSeconds,
  feedback: run.feedback,
  metrics: Object.fromEntries(
    run.conversation.metricEvaluations.map((evaluation) => [
      evaluation.metricId,
      toCell(evaluation),
    ]),
  ),
});

const nullsLast = (sort: Prisma.SortOrder) => ({
  sort,
  nulls: Prisma.NullsOrder.last,
});

export const runOrderBy = (
  sortBy: RunSortField,
  sortDir: SortDirection,
): Prisma.RunOrderByWithRelationInput[] => {
  const direction = Prisma.SortOrder[sortDir];
  const tie = { id: direction };
  if (sortBy === RunSortField.evaluatorName) {
    return [{ evaluator: { name: direction } }, tie];
  }
  if (sortBy === RunSortField.startTime) {
    return [{ executedAt: nullsLast(direction) }, tie];
  }
  if (sortBy === RunSortField.evaluation) {
    return [{ evaluationStatus: nullsLast(direction) }, tie];
  }
  if (sortBy === RunSortField.personality) {
    return [{ personality: { name: direction } }, tie];
  }
  if (sortBy === RunSortField.testProfile) {
    return [{ testProfile: { name: direction } }, tie];
  }
  return [tie];
};
