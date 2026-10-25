import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { ScoringSource } from '@/server/metric-scoring/constants';
import type {
  ScoringConversation,
  ScoringMetric,
} from '@/server/metric-scoring/types';
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
  displayOrder: true,
  predefinedMetric: { select: { functionName: true } },
  enumOptions: {
    select: { value: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
  dependencies: { select: { dependsOnMetricId: true } },
} satisfies Prisma.MetricSelect;

type ScoringMetricRow = Prisma.MetricGetPayload<{
  select: typeof scoringMetricSelect;
}>;

const toScoringMetric = (row: ScoringMetricRow): ScoringMetric => ({
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
  dependencyIds: row.dependencies.map(
    (dependency) => dependency.dependsOnMetricId,
  ),
});

const sourceFilter = (
  conversation: ScoringConversation,
): Prisma.MetricWhereInput => {
  if (conversation.source === ScoringSource.observability) {
    return { observabilityEnabled: true };
  }
  const evaluatorMetricIds = conversation.evaluator?.metricIds ?? [];
  if (evaluatorMetricIds.length > 0) {
    return { simulationEnabled: true, id: { in: evaluatorMetricIds } };
  }
  return { simulationEnabled: true };
};

const agentFilter = (
  conversation: ScoringConversation,
): Prisma.MetricWhereInput => {
  if (!conversation.agent) return {};
  return {
    OR: [
      { agents: { some: { agentId: conversation.agent.id } } },
      { agents: { none: {} } },
    ],
  };
};

const selectionFilter = (
  conversation: ScoringConversation,
  metricIds: number[] | undefined,
): Prisma.MetricWhereInput => {
  if (metricIds) return { id: { in: metricIds } };
  return { AND: [sourceFilter(conversation), agentFilter(conversation)] };
};

const isSampledOut = (
  conversation: ScoringConversation,
  metric: ScoringMetric,
) => {
  if (conversation.source !== ScoringSource.observability) return false;
  if (!metric.samplingEnabled) return false;
  const rate = metric.sampleRate ?? conversation.projectSampleRate;
  return Math.random() >= rate;
};

export const orderByDependencies = (metrics: ScoringMetric[]) => {
  const byId = new Map(metrics.map((metric) => [metric.id, metric]));
  const ordered: ScoringMetric[] = [];
  const visited = new Set<number>();
  const visit = (metric: ScoringMetric, path: Set<number>) => {
    if (visited.has(metric.id) || path.has(metric.id)) return;
    const nextPath = new Set(path).add(metric.id);
    for (const dependencyId of metric.dependencyIds) {
      const dependency = byId.get(dependencyId);
      if (dependency) visit(dependency, nextPath);
    }
    visited.add(metric.id);
    ordered.push(metric);
  };
  for (const metric of metrics) visit(metric, new Set());
  return ordered;
};

export const selectMetrics = async (
  conversation: ScoringConversation,
  metricIds: number[] | undefined,
) => {
  const rows = await prisma.metric.findMany({
    where: {
      projectId: conversation.projectId,
      ...selectionFilter(conversation, metricIds),
    },
    orderBy: [
      { displayOrder: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: scoringMetricSelect,
  });
  const metrics = rows.map(toScoringMetric);
  const sampled = metrics.filter(
    (metric) => metricIds || !isSampledOut(conversation, metric),
  );
  return orderByDependencies(sampled);
};
