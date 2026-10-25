import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { loadConversation } from '@/server/metric-scoring/context/load-conversation';
import { selectMetrics } from '@/server/metric-scoring/context/select-metrics';
import { scoreMetric } from '@/server/metric-scoring/score-metric';
import type {
  DependencyResult,
  ScoreConversationInput,
  ScoreOutcome,
  ScoringMetric,
} from '@/server/metric-scoring/types';
import { normalizeScore } from '@/server/metric-scoring/utils/normalize-score';
import {
  valueFromParts,
  valueParts,
} from '@/server/metric-scoring/utils/value-parts';

const extraInput = (extra: Record<string, unknown> | null) => {
  if (!extra) return Prisma.DbNull;
  return extra as Prisma.InputJsonObject;
};

const evaluationData = (metric: ScoringMetric, outcome: ScoreOutcome) => {
  const parts = valueParts(outcome.value);
  return {
    status: outcome.status,
    valueNumber: parts.number,
    valueBoolean: parts.boolean,
    valueText: parts.text,
    normalizedScore: normalizeScore(metric.evalType, outcome.value),
    explanation: outcome.explanation,
    extra: extraInput(outcome.extra),
    errorMessage: outcome.errorMessage,
    evaluatedAt: new Date(),
  };
};

const storedDependencies = async (
  conversationId: number,
  metrics: ScoringMetric[],
) => {
  const selected = new Set(metrics.map((metric) => metric.id));
  const outside = [
    ...new Set(metrics.flatMap((metric) => metric.dependencyIds)),
  ].filter((id) => !selected.has(id));
  if (outside.length === 0) return [];
  const rows = await prisma.metricEvaluation.findMany({
    where: { conversationId, metricId: { in: outside } },
    select: {
      metricId: true,
      valueNumber: true,
      valueBoolean: true,
      valueText: true,
      explanation: true,
      metric: { select: { name: true, slug: true } },
    },
  });
  return rows.map((row): DependencyResult => ({
    id: row.metricId,
    name: row.metric.name,
    slug: row.metric.slug,
    value: valueFromParts({
      number: row.valueNumber,
      boolean: row.valueBoolean,
      text: row.valueText,
    }),
    explanation: row.explanation,
  }));
};

export const scoreConversation = async ({
  projectId,
  conversationId,
  metricIds,
}: ScoreConversationInput) => {
  const conversation = await loadConversation(projectId, conversationId);
  const metrics = await selectMetrics(conversation, metricIds);
  const results = new Map<number, DependencyResult>(
    (await storedDependencies(conversationId, metrics)).map((result) => [
      result.id,
      result,
    ]),
  );
  const rows = [];
  for (const metric of metrics) {
    const dependencies = metric.dependencyIds.flatMap((id) => {
      const result = results.get(id);
      if (!result) return [];
      return [result];
    });
    const outcome = await scoreMetric({ conversation, metric, dependencies });
    const data = evaluationData(metric, outcome);
    rows.push(
      await prisma.metricEvaluation.upsert({
        where: {
          conversationId_metricId: { conversationId, metricId: metric.id },
        },
        create: { conversationId, metricId: metric.id, ...data },
        update: data,
      }),
    );
    results.set(metric.id, {
      id: metric.id,
      name: metric.name,
      slug: metric.slug,
      value: outcome.value,
      explanation: outcome.explanation,
    });
  }
  return rows;
};
