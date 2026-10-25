import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { evaluatorSnapshotReaderSchema } from '@/server/runs/schemas';
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

export const readEvaluatorSnapshot = (snapshot: Prisma.JsonValue) =>
  evaluatorSnapshotReaderSchema.parse(snapshot);

export const readSnapshotName = (snapshot: Prisma.JsonValue) =>
  readEvaluatorSnapshot(snapshot).name;

export const readSnapshotMetricIds = (snapshot: Prisma.JsonValue) =>
  readEvaluatorSnapshot(snapshot).metricIds;
