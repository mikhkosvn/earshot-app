import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { ConversationSource } from '@/server/conversations/constants/conversation-source';
import { MetadataKey } from '@/server/conversations/constants/metadata-keys';
import type {
  ConversationDetail,
  ConversationMetadataTile,
  ConversationMetricItem,
  ConversationWaveformView,
} from '@/server/conversations/types';
import { endedReasonLabel } from '@/server/conversations/utils/ended-reason-label';
import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';

export const conversationDetailSelect = {
  id: true,
  projectId: true,
  recordingFileId: true,
  waveform: true,
  testingChannelIndex: true,
  startedAt: true,
  endedAt: true,
  ringingDurationSeconds: true,
  endedReason: true,
  providerCallData: true,
  metadata: true,
  dynamicVariables: true,
  createdAt: true,
  turns: {
    orderBy: { position: Prisma.SortOrder.asc },
    select: {
      id: true,
      position: true,
      role: true,
      content: true,
      startTime: true,
      endTime: true,
    },
  },
  metricEvaluations: {
    select: {
      id: true,
      metricId: true,
      status: true,
      valueNumber: true,
      valueBoolean: true,
      valueText: true,
      normalizedScore: true,
      explanation: true,
      extra: true,
      thumbsUp: true,
      voteFeedback: true,
      metric: {
        select: {
          name: true,
          description: true,
          evalType: true,
          displayOrder: true,
          predefinedMetric: { select: { functionName: true } },
          enumOptions: {
            orderBy: { position: Prisma.SortOrder.asc },
            select: { value: true },
          },
        },
      },
    },
  },
  run: {
    select: {
      evaluatorSnapshot: true,
      evaluator: { select: { expectedOutcomePrompt: true } },
    },
  },
} satisfies Prisma.ConversationSelect;

export type ConversationDetailRow = Prisma.ConversationGetPayload<{
  select: typeof conversationDetailSelect;
}>;

type EvaluationRow = ConversationDetailRow['metricEvaluations'][number];

const asRecord = (value: Prisma.JsonValue | null) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

const numberList = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is number => typeof item === 'number');
};

const waveformOf = (
  row: ConversationDetailRow,
): ConversationWaveformView | null => {
  const waveform = asRecord(row.waveform);
  if (!waveform || !Array.isArray(waveform.peaks)) return null;
  const testingChannelIndex =
    row.testingChannelIndex ?? Number(waveform.testingChannelIndex ?? 1);
  return {
    peaks: waveform.peaks.map(numberList),
    duration: Number(waveform.duration ?? 0),
    testingChannelIndex,
  };
};

const durationOf = (row: ConversationDetailRow) => {
  const waveform = asRecord(row.waveform);
  if (waveform && typeof waveform.duration === 'number') {
    return waveform.duration;
  }
  const lastTurn = row.turns.at(-1);
  if (lastTurn?.endTime) return lastTurn.endTime;
  if (row.startedAt && row.endedAt) {
    return (row.endedAt.getTime() - row.startedAt.getTime()) / 1000;
  }
  return 0;
};

const isExpectedOutcome = (evaluation: EvaluationRow) =>
  evaluation.metric.predefinedMetric?.functionName ===
  PredefinedFunction.evaluate_expected_outcome;

const metricRank = (evaluation: EvaluationRow) => {
  if (isExpectedOutcome(evaluation)) return -1;
  return evaluation.metric.displayOrder;
};

const toMetricItem = (evaluation: EvaluationRow): ConversationMetricItem => ({
  evaluationId: evaluation.id,
  metricId: evaluation.metricId,
  name: evaluation.metric.name,
  description: evaluation.metric.description,
  evalType: evaluation.metric.evalType,
  functionName: evaluation.metric.predefinedMetric?.functionName ?? null,
  enumValues: evaluation.metric.enumOptions.map((option) => option.value),
  status: evaluation.status,
  value: valueFromParts({
    number: evaluation.valueNumber,
    boolean: evaluation.valueBoolean,
    text: evaluation.valueText,
  }),
  normalizedScore: evaluation.normalizedScore,
  explanation: evaluation.explanation,
  extra: asRecord(evaluation.extra),
  thumbsUp: evaluation.thumbsUp,
  voteFeedback: evaluation.voteFeedback,
});

const textOf = (value: unknown) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

const isoOf = (date: Date | null) => {
  if (!date) return '';
  return date.toISOString();
};

const storedMetadataTiles = (
  row: ConversationDetailRow,
): ConversationMetadataTile[] =>
  Object.entries(asRecord(row.metadata) ?? {}).map(([key, value]) => ({
    key,
    value: textOf(value),
  }));

const sourceOf = (row: ConversationDetailRow) => {
  if (row.run) return ConversationSource.run;
  return ConversationSource.call;
};

const metadataTiles = (
  row: ConversationDetailRow,
): ConversationMetadataTile[] => {
  if (!row.run) return storedMetadataTiles(row);
  const base: ConversationMetadataTile[] = [
    {
      key: MetadataKey.endedReason,
      value: endedReasonLabel(row.endedReason) ?? '',
    },
    { key: MetadataKey.callEndedAt, value: isoOf(row.endedAt) },
    { key: MetadataKey.callCreatedAt, value: isoOf(row.createdAt) },
    { key: MetadataKey.callStartedAt, value: isoOf(row.startedAt) },
    {
      key: MetadataKey.ringingDuration,
      value: (row.ringingDurationSeconds ?? 0).toFixed(2),
    },
    {
      key: MetadataKey.providerCallData,
      value: JSON.stringify(row.providerCallData ?? {}),
    },
  ];
  const known = new Set(base.map((tile) => tile.key));
  const extra = Object.entries(asRecord(row.metadata) ?? {})
    .filter(([key]) => !known.has(key))
    .map(([key, value]) => ({ key, value: textOf(value) }));
  const variables = asRecord(row.dynamicVariables);
  if (!variables || Object.keys(variables).length === 0) {
    return [...base, ...extra];
  }
  return [
    ...base,
    ...extra,
    { key: MetadataKey.dynamicVariables, value: JSON.stringify(variables) },
  ];
};

const expectedOutcomePromptOf = (row: ConversationDetailRow) => {
  if (!row.run) return null;
  const snapshot = asRecord(row.run.evaluatorSnapshot);
  const fromSnapshot = snapshot?.expectedOutcomePrompt;
  if (typeof fromSnapshot === 'string') return fromSnapshot;
  return row.run.evaluator?.expectedOutcomePrompt ?? null;
};

export const toConversationDetail = (
  row: ConversationDetailRow,
  urls: { recordingUrl: string | null; recordingDownloadUrl: string | null },
): ConversationDetail => ({
  id: row.id,
  projectId: row.projectId,
  source: sourceOf(row),
  recordingUrl: urls.recordingUrl,
  recordingDownloadUrl: urls.recordingDownloadUrl,
  waveform: waveformOf(row),
  durationSeconds: durationOf(row),
  startedAt: row.startedAt,
  endedAt: row.endedAt,
  endedReason: endedReasonLabel(row.endedReason),
  expectedOutcomePrompt: expectedOutcomePromptOf(row),
  turns: row.turns,
  metrics: row.metricEvaluations
    .toSorted((left, right) => metricRank(left) - metricRank(right))
    .map(toMetricItem),
  metadata: metadataTiles(row),
});
