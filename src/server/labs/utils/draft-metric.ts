import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { LabDraft } from '@/server/labs/types';
import type { ScoringMetric } from '@/server/metric-scoring/types';
import { toConfiguration } from '@/server/metrics/utils/metric-view';

const scoringMetricSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  type: true,
  evalType: true,
  audioEnabled: true,
  customCode: true,
  configuration: true,
  evaluationTrigger: true,
  triggerType: true,
  evaluationTriggerPrompt: true,
  evaluationTriggerCustomCode: true,
  samplingEnabled: true,
  sampleRate: true,
  predefinedMetric: { select: { functionName: true } },
  enumOptions: {
    select: { value: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
} satisfies Prisma.MetricSelect;

const textOrNull = (value: string) => {
  if (!value.trim()) return null;
  return value;
};

export const loadScoringMetric = async (
  metricId: number,
): Promise<ScoringMetric> => {
  const row = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId },
    select: scoringMetricSelect,
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    type: row.type,
    evalType: row.evalType,
    enumValues: row.enumOptions.map((option) => option.value),
    audioEnabled: row.audioEnabled,
    customCode: row.customCode,
    functionName: row.predefinedMetric?.functionName ?? null,
    configuration: toConfiguration(row.configuration),
    evaluationTrigger: row.evaluationTrigger,
    triggerType: row.triggerType,
    evaluationTriggerPrompt: row.evaluationTriggerPrompt,
    evaluationTriggerCustomCode: row.evaluationTriggerCustomCode,
    samplingEnabled: row.samplingEnabled,
    sampleRate: row.sampleRate,
    dependencyIds: [],
  };
};

export const draftOf = (metric: ScoringMetric): LabDraft => ({
  type: metric.type,
  description: metric.description,
  customCode: metric.customCode ?? '',
  evaluationTrigger: metric.evaluationTrigger,
  triggerType: metric.triggerType,
  evaluationTriggerPrompt: metric.evaluationTriggerPrompt ?? '',
  evaluationTriggerCustomCode: metric.evaluationTriggerCustomCode ?? '',
});

export const applyDraft = (
  metric: ScoringMetric,
  draft: LabDraft,
): ScoringMetric => ({
  ...metric,
  type: draft.type,
  description: draft.description,
  customCode: textOrNull(draft.customCode),
  evaluationTrigger: draft.evaluationTrigger,
  triggerType: draft.triggerType,
  evaluationTriggerPrompt: textOrNull(draft.evaluationTriggerPrompt),
  evaluationTriggerCustomCode: textOrNull(draft.evaluationTriggerCustomCode),
});
