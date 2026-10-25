import 'server-only';

import { Prisma } from '@/generated/prisma/client';

const namedSelect = { select: { id: true, name: true } } as const;

export const resultDetailSelect = {
  id: true,
  projectId: true,
  name: true,
  status: true,
  createdAt: true,
  completedAt: true,
  aiSummaryStatus: true,
  aiSummaryWhatHappened: true,
  aiSummaryWhyItHappened: true,
  aiSummaryHowToFix: true,
  pathCoverageGeneratedAt: true,
  agent: namedSelect,
  agentVersion: { select: { version: true } },
  workflowPaths: {
    orderBy: { position: Prisma.SortOrder.asc },
    select: { label: true, covered: true },
  },
  metricSummaries: { select: { metricId: true, explanation: true } },
  runs: {
    orderBy: { id: Prisma.SortOrder.asc },
    select: {
      id: true,
      status: true,
      evaluationStatus: true,
      evaluatorSnapshot: true,
      executedAt: true,
      createdAt: true,
      conversationId: true,
      evaluator: {
        select: {
          id: true,
          name: true,
          tags: { select: { tag: { select: { name: true } } } },
        },
      },
      personality: { select: { name: true } },
      conversation: {
        select: {
          startedAt: true,
          ringingDurationSeconds: true,
          _count: { select: { turns: true } },
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
    },
  },
} satisfies Prisma.ResultSelect;

export type ResultDetailRecord = Prisma.ResultGetPayload<{
  select: typeof resultDetailSelect;
}>;

export type ResultRunRecord = ResultDetailRecord['runs'][number];

export const detailMetricSelect = {
  id: true,
  name: true,
  description: true,
  evalType: true,
  predefinedMetric: { select: { functionName: true } },
  rubricRule: {
    select: {
      operator: true,
      numberValue: true,
      booleanValue: true,
      textValues: true,
    },
  },
} satisfies Prisma.MetricSelect;

export type DetailMetric = Prisma.MetricGetPayload<{
  select: typeof detailMetricSelect;
}>;
