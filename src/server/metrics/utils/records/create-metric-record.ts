import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  EvaluationTrigger,
  HistoryChangeType,
  type MetricEvalType,
  type MetricType,
  TriggerType,
} from '@/generated/prisma/enums';
import { ActionError } from '@/server/common/run-action';
import { checkDependencies } from '@/server/metrics/utils/records/check-dependencies';
import { writeMetricVersion } from '@/server/metrics/utils/records/metric-version';
import { nextDisplayOrder } from '@/server/metrics/utils/records/next-display-order';
import { uniqueSlug } from '@/server/metrics/utils/records/unique-slug';

export interface NewMetricData {
  projectId: number;
  userId: number | null;
  type: MetricType;
  name: string;
  slug: string | null;
  evalType: MetricEvalType;
  enumValues?: string[];
  audioEnabled?: boolean;
  description?: string;
  customCode?: string;
  configuration?: Record<string, number> | null;
  dependencyIds?: number[];
  evaluationTrigger?: EvaluationTrigger;
  triggerType?: TriggerType;
  evaluationTriggerPrompt?: string;
  evaluationTriggerCustomCode?: string;
  addToNewAgents?: boolean;
  agentIds: number[];
}

const textOrNull = (value: string | undefined) => {
  if (!value?.trim()) return null;
  return value;
};

const jsonOrNull = (value: Record<string, number> | null | undefined) => {
  if (!value) return Prisma.DbNull;
  return value;
};

export const assertFreeSlug = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  slug: string,
  metricId: number | null,
) => {
  const existing = await tx.metric.findUnique({
    where: { projectId_slug: { projectId, slug } },
    select: { id: true },
  });
  if (existing && existing.id !== metricId) {
    throw new ActionError('Another metric of this project uses this slug.');
  }
};

const resolveSlug = async (
  tx: Prisma.TransactionClient,
  data: NewMetricData,
) => {
  if (!data.slug) return uniqueSlug(tx, data.projectId, data.name);
  await assertFreeSlug(tx, data.projectId, data.slug, null);
  return data.slug;
};

export const createMetricRecord = async (
  tx: Prisma.TransactionClient,
  data: NewMetricData,
) => {
  const dependencyIds = data.dependencyIds ?? [];
  await checkDependencies(tx, {
    projectId: data.projectId,
    metricId: null,
    dependencyIds,
  });
  const slug = await resolveSlug(tx, data);
  const metric = await tx.metric.create({
    data: {
      projectId: data.projectId,
      name: data.name,
      slug,
      type: data.type,
      evalType: data.evalType,
      audioEnabled: data.audioEnabled ?? false,
      description: data.description ?? '',
      customCode: textOrNull(data.customCode),
      configuration: jsonOrNull(data.configuration),
      evaluationTrigger: data.evaluationTrigger ?? EvaluationTrigger.always,
      triggerType: data.triggerType ?? TriggerType.llm_judge,
      evaluationTriggerPrompt: textOrNull(data.evaluationTriggerPrompt),
      evaluationTriggerCustomCode: textOrNull(data.evaluationTriggerCustomCode),
      addToNewAgents: data.addToNewAgents ?? true,
      displayOrder: await nextDisplayOrder(tx, data.projectId),
      enumOptions: {
        create: (data.enumValues ?? []).map((value, position) => ({
          position,
          value,
        })),
      },
      agents: {
        create: data.agentIds.map((agentId) => ({ agentId })),
      },
      dependencies: {
        create: dependencyIds.map((dependsOnMetricId) => ({
          dependsOnMetricId,
        })),
      },
    },
    select: { id: true, name: true, evalType: true },
  });
  await writeMetricVersion(tx, {
    metricId: metric.id,
    userId: data.userId,
    changeType: HistoryChangeType.created,
  });
  return metric;
};
