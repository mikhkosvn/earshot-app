import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { EvaluatorSnapshot } from '@/server/runs/types';

export const evaluatorSnapshotSelect = {
  id: true,
  name: true,
  scenarioType: true,
  instructions: true,
  expectedOutcomePrompt: true,
  firstMessage: true,
  language: true,
  maxDurationSeconds: true,
  personalityId: true,
  testProfileId: true,
  tools: { select: { tool: true } },
  tags: { select: { tag: { select: { name: true } } } },
  metrics: { select: { metricId: true } },
} satisfies Prisma.EvaluatorSelect;

export type EvaluatorSnapshotRow = Prisma.EvaluatorGetPayload<{
  select: typeof evaluatorSnapshotSelect;
}>;

export const toEvaluatorSnapshot = (
  row: EvaluatorSnapshotRow,
): EvaluatorSnapshot => ({
  id: row.id,
  key: null,
  name: row.name,
  scenarioType: row.scenarioType,
  instructions: row.instructions,
  expectedOutcomePrompt: row.expectedOutcomePrompt,
  firstMessage: row.firstMessage,
  language: row.language,
  maxDurationSeconds: row.maxDurationSeconds,
  tools: row.tools.map((entry) => entry.tool),
  tags: row.tags.map((entry) => entry.tag.name),
  metricIds: row.metrics.map((entry) => entry.metricId),
});

const asRecord = (value: Prisma.JsonValue): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value;
};

const textOf = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'string') return value;
  return null;
};

const numbersOf = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is number => typeof item === 'number');
};

export const readSnapshotName = (snapshot: Prisma.JsonValue) =>
  textOf(asRecord(snapshot), 'name') ?? '';

export const readSnapshotMetricIds = (snapshot: Prisma.JsonValue) =>
  numbersOf(asRecord(snapshot), 'metricIds');

const numberOf = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'number') return value;
  return null;
};

export const readEvaluatorSnapshot = (snapshot: Prisma.JsonValue) => {
  const record = asRecord(snapshot);
  return {
    name: textOf(record, 'name') ?? '',
    instructions: textOf(record, 'instructions') ?? '',
    expectedOutcomePrompt: textOf(record, 'expectedOutcomePrompt'),
    firstMessage: textOf(record, 'firstMessage'),
    maxDurationSeconds: numberOf(record, 'maxDurationSeconds'),
    metricIds: numbersOf(record, 'metricIds'),
  };
};
