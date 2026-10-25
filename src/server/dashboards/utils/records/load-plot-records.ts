import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  CallEvaluationStatus,
  DashboardSource,
  RunStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { MetadataCondition } from '@/server/dashboards/types';
import { conversationMetadataWhere } from '@/server/dashboards/utils/records/metadata-where';
import { evaluatorRefOf } from '@/server/results/utils/refs';
import { isPassedEvaluation } from '@/server/results/utils/result-row';

export type RecordScope = {
  projectId: number;
  source: DashboardSource;
  from: Date;
  to: Date;
  agentId: number | null;
  metadata: MetadataCondition[];
};

export type PlotRecord = {
  id: number;
  createdAt: Date;
  conversationId: number;
  agentId: number | null;
  agentName: string | null;
  success: boolean | null;
  reviewed: boolean;
  durationSeconds: number | null;
  endedReason: string | null;
  metadata: Record<string, unknown>;
  scenarioName: string | null;
};

const FINISHED_RUN_STATUSES: RunStatus[] = [
  RunStatus.completed,
  RunStatus.failed,
  RunStatus.timeout,
];

const REVIEWED_STATUSES: CallEvaluationStatus[] = [
  CallEvaluationStatus.reviewed_success,
  CallEvaluationStatus.reviewed_failure,
];

const conversationSelect = {
  select: { startedAt: true, endedAt: true, endedReason: true, metadata: true },
} as const;

type ConversationFacts = {
  startedAt: Date | null;
  endedAt: Date | null;
  endedReason: string | null;
  metadata: Prisma.JsonValue;
};

const durationOf = (conversation: ConversationFacts) => {
  if (!conversation.startedAt || !conversation.endedAt) return null;
  return (
    (conversation.endedAt.getTime() - conversation.startedAt.getTime()) / 1000
  );
};

const metadataOf = (value: Prisma.JsonValue): Record<string, unknown> => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
};

const conversationFacts = (conversation: ConversationFacts) => ({
  durationSeconds: durationOf(conversation),
  endedReason: conversation.endedReason,
  metadata: metadataOf(conversation.metadata),
});

const callSuccess = (status: CallEvaluationStatus | null) => {
  if (status === null) return null;
  return isPassedEvaluation(status);
};

const isReviewed = (status: CallEvaluationStatus | null) =>
  status !== null && REVIEWED_STATUSES.includes(status);

const agentWhere = (agentId: number | null) => {
  if (agentId === null) return {};
  return { agentId };
};

const loadCallRecords = async (scope: RecordScope): Promise<PlotRecord[]> => {
  const rows = await prisma.callLog.findMany({
    where: {
      projectId: scope.projectId,
      createdAt: { gte: scope.from, lte: scope.to },
      ...agentWhere(scope.agentId),
      AND: conversationMetadataWhere(scope.metadata).map((conversation) => ({
        conversation,
      })),
    },
    orderBy: { createdAt: Prisma.SortOrder.asc },
    select: {
      id: true,
      createdAt: true,
      conversationId: true,
      evaluationStatus: true,
      agent: { select: { id: true, name: true } },
      conversation: conversationSelect,
    },
  });
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt,
    conversationId: row.conversationId,
    agentId: row.agent?.id ?? null,
    agentName: row.agent?.name ?? null,
    success: callSuccess(row.evaluationStatus),
    reviewed: isReviewed(row.evaluationStatus),
    ...conversationFacts(row.conversation),
    scenarioName: null,
  }));
};

const loadRunRecords = async (scope: RecordScope): Promise<PlotRecord[]> => {
  const rows = await prisma.run.findMany({
    where: {
      status: { in: FINISHED_RUN_STATUSES },
      createdAt: { gte: scope.from, lte: scope.to },
      result: { projectId: scope.projectId, ...agentWhere(scope.agentId) },
      AND: conversationMetadataWhere(scope.metadata).map((conversation) => ({
        conversation,
      })),
    },
    orderBy: { createdAt: Prisma.SortOrder.asc },
    select: {
      id: true,
      createdAt: true,
      conversationId: true,
      evaluationStatus: true,
      evaluatorSnapshot: true,
      evaluator: { select: { id: true, name: true } },
      result: { select: { agent: { select: { id: true, name: true } } } },
      conversation: conversationSelect,
    },
  });
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt,
    conversationId: row.conversationId,
    agentId: row.result.agent?.id ?? null,
    agentName: row.result.agent?.name ?? null,
    success: isPassedEvaluation(row.evaluationStatus),
    reviewed: isReviewed(row.evaluationStatus),
    ...conversationFacts(row.conversation),
    scenarioName: evaluatorRefOf(row.evaluator, row.evaluatorSnapshot).name,
  }));
};

export const loadPlotRecords = (scope: RecordScope) => {
  if (scope.source === DashboardSource.runs) return loadRunRecords(scope);
  return loadCallRecords(scope);
};
