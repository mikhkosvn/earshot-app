import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { OBSERVABILITY_LOCKED_FUNCTIONS } from '@/server/metrics/constants/scoring/predefined-function';
import type {
  MetricDetail,
  MetricListItem,
  MetricOption,
} from '@/server/metrics/types';

const enumOptionsOrder = { orderBy: { position: Prisma.SortOrder.asc } };

export const metricOrder = [
  { displayOrder: Prisma.SortOrder.asc },
  { id: Prisma.SortOrder.asc },
] satisfies Prisma.MetricOrderByWithRelationInput[];

export const metricListSelect = {
  id: true,
  name: true,
  description: true,
  type: true,
  evalType: true,
  evaluationTrigger: true,
  observabilityEnabled: true,
  simulationEnabled: true,
  samplingEnabled: true,
  sampleRate: true,
  displayOrder: true,
  addToNewAgents: true,
  predefinedMetricId: true,
  predefinedMetric: {
    select: { code: true, editable: true, functionName: true },
  },
  agents: { select: { agentId: true } },
  dependencies: {
    select: { dependsOn: { select: { id: true, name: true } } },
  },
} satisfies Prisma.MetricSelect;

type MetricListRow = Prisma.MetricGetPayload<{
  select: typeof metricListSelect;
}>;

const functionNameOf = (row: {
  predefinedMetric: { functionName: string | null } | null;
}) => row.predefinedMetric?.functionName ?? null;

export const toMetricListItem = (row: MetricListRow): MetricListItem => ({
  id: row.id,
  name: row.name,
  description: row.description,
  type: row.type,
  evalType: row.evalType,
  evaluationTrigger: row.evaluationTrigger,
  observabilityEnabled: row.observabilityEnabled,
  simulationEnabled: row.simulationEnabled,
  samplingEnabled: row.samplingEnabled,
  sampleRate: row.sampleRate,
  displayOrder: row.displayOrder,
  userDefined: row.predefinedMetricId === null,
  editable: row.predefinedMetric?.editable ?? true,
  observabilityLocked: OBSERVABILITY_LOCKED_FUNCTIONS.includes(
    functionNameOf(row) ?? '',
  ),
  code: row.predefinedMetric?.code ?? null,
  functionName: functionNameOf(row),
  addToNewAgents: row.addToNewAgents,
  agentIds: row.agents.map((agent) => agent.agentId),
  dependencies: row.dependencies.map((dependency) => dependency.dependsOn),
});

export const metricDetailSelect = {
  id: true,
  projectId: true,
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
  addToNewAgents: true,
  predefinedMetricId: true,
  createdAt: true,
  updatedAt: true,
  predefinedMetric: {
    select: { code: true, editable: true, functionName: true },
  },
  enumOptions: { select: { value: true }, ...enumOptionsOrder },
  agents: { select: { agentId: true } },
  dependencies: { select: { dependsOnMetricId: true } },
} satisfies Prisma.MetricSelect;

type MetricDetailRow = Prisma.MetricGetPayload<{
  select: typeof metricDetailSelect;
}>;

export const toConfiguration = (
  value: Prisma.JsonValue | null,
): Record<string, number> | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries = Object.entries(value).filter(
    (entry): entry is [string, number] => typeof entry[1] === 'number',
  );
  return Object.fromEntries(entries);
};

export const toMetricDetail = (row: MetricDetailRow): MetricDetail => ({
  id: row.id,
  projectId: row.projectId,
  name: row.name,
  slug: row.slug ?? '',
  type: row.type,
  evalType: row.evalType,
  enumValues: row.enumOptions.map((option) => option.value),
  audioEnabled: row.audioEnabled,
  description: row.description,
  customCode: row.customCode ?? '',
  configuration: toConfiguration(row.configuration),
  dependencyIds: row.dependencies.map(
    (dependency) => dependency.dependsOnMetricId,
  ),
  evaluationTrigger: row.evaluationTrigger,
  triggerType: row.triggerType,
  evaluationTriggerPrompt: row.evaluationTriggerPrompt ?? '',
  evaluationTriggerCustomCode: row.evaluationTriggerCustomCode ?? '',
  addToNewAgents: row.addToNewAgents,
  userDefined: row.predefinedMetricId === null,
  editable: row.predefinedMetric?.editable ?? true,
  code: row.predefinedMetric?.code ?? null,
  functionName: functionNameOf(row),
  agentIds: row.agents.map((agent) => agent.agentId),
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export const metricOptionSelect = {
  id: true,
  name: true,
  slug: true,
  type: true,
  evalType: true,
  predefinedMetricId: true,
} satisfies Prisma.MetricSelect;

type MetricOptionRow = Prisma.MetricGetPayload<{
  select: typeof metricOptionSelect;
}>;

export const toMetricOption = (row: MetricOptionRow): MetricOption => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  type: row.type,
  evalType: row.evalType,
  userDefined: row.predefinedMetricId === null,
});
