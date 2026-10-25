import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { EVALUATOR_COPY_PREFIX } from '@/server/evaluators/constants/evaluator-limits';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { upsertTags } from '@/server/tags/utils/upsert-tags';

const copySourceSelect = {
  id: true,
  projectId: true,
  name: true,
  agentId: true,
  personalityId: true,
  testProfileId: true,
  phoneNumberId: true,
  scenarioType: true,
  instructions: true,
  expectedOutcomePrompt: true,
  firstMessage: true,
  simulationDescription: true,
  language: true,
  maxDurationSeconds: true,
  creationMethod: true,
  personality: { select: { projectId: true } },
  tags: { select: { tag: { select: { name: true } } } },
  tools: { select: { tool: true } },
  metrics: { select: { metric: { select: { id: true, name: true } } } },
  expectedToolCalls: {
    select: {
      mockToolId: true,
      position: true,
      input: true,
      output: true,
    },
  },
} satisfies Prisma.EvaluatorSelect;

type CopySource = Prisma.EvaluatorGetPayload<{
  select: typeof copySourceSelect;
}>;

interface CopyTarget {
  projectId: number;
  folderId: number;
  agentId: number | null;
  userId: number;
  namePrefix: string;
}

const mapMetricIds = async (
  tx: Prisma.TransactionClient,
  source: CopySource,
  targetProjectId: number,
) => {
  if (source.projectId === targetProjectId) {
    return source.metrics.map((entry) => entry.metric.id);
  }
  const names = source.metrics.map((entry) => entry.metric.name);
  const targetMetrics = await tx.metric.findMany({
    where: { projectId: targetProjectId, name: { in: names } },
    select: { id: true },
  });
  return targetMetrics.map((metric) => metric.id);
};

const copiedPersonalityId = (source: CopySource, targetProjectId: number) => {
  if (source.projectId === targetProjectId) return source.personalityId;
  if (source.personality?.projectId === null) return source.personalityId;
  return null;
};

const keepsAgentData = (source: CopySource, target: CopyTarget) =>
  source.projectId === target.projectId && target.agentId === source.agentId;

const copiedTestProfileId = (source: CopySource, target: CopyTarget) => {
  if (!keepsAgentData(source, target)) return null;
  return source.testProfileId;
};

const copiedToolCalls = (source: CopySource, target: CopyTarget) => {
  if (!keepsAgentData(source, target)) return [];
  return source.expectedToolCalls.map((call) => ({
    mockToolId: call.mockToolId,
    position: call.position,
    input: call.input as Prisma.InputJsonValue,
    output: call.output as Prisma.InputJsonValue,
  }));
};

const copiedAgentId = (
  source: CopySource,
  targetProjectId: number,
  agentId: number | null | undefined,
) => {
  if (agentId) return agentId;
  if (source.projectId !== targetProjectId) return null;
  return source.agentId;
};

const copyOne = async (
  tx: Prisma.TransactionClient,
  source: CopySource,
  target: CopyTarget,
) => {
  const tagIds = await upsertTags(
    tx,
    target.projectId,
    source.tags.map((entry) => entry.tag.name),
  );
  const metricIds = await mapMetricIds(tx, source, target.projectId);
  const created = await tx.evaluator.create({
    data: {
      projectId: target.projectId,
      folderId: target.folderId,
      agentId: target.agentId,
      personalityId: copiedPersonalityId(source, target.projectId),
      testProfileId: copiedTestProfileId(source, target),
      phoneNumberId: source.phoneNumberId,
      name: `${target.namePrefix}${source.name}`,
      scenarioType: source.scenarioType,
      instructions: source.instructions,
      expectedOutcomePrompt: source.expectedOutcomePrompt,
      firstMessage: source.firstMessage,
      simulationDescription: source.simulationDescription,
      language: source.language,
      maxDurationSeconds: source.maxDurationSeconds,
      creationMethod: source.creationMethod,
      createdById: target.userId,
      updatedById: target.userId,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
      tools: { create: source.tools.map(({ tool }) => ({ tool })) },
      metrics: { create: metricIds.map((metricId) => ({ metricId })) },
      expectedToolCalls: { create: copiedToolCalls(source, target) },
    },
    select: { id: true },
  });
  await recordEvaluatorVersion(tx, {
    evaluatorId: created.id,
    userId: target.userId,
    changeReason: `Copy of evaluator ${source.id}`,
  });
  return created.id;
};

export const copyEvaluators = async (
  tx: Prisma.TransactionClient,
  where: Prisma.EvaluatorWhereInput,
  target: Omit<CopyTarget, 'agentId' | 'namePrefix'> & {
    agentId?: number | null;
    namePrefix?: string;
  },
) => {
  const sources = await tx.evaluator.findMany({
    where,
    select: copySourceSelect,
    orderBy: { id: Prisma.SortOrder.asc },
  });
  const createdIds: number[] = [];
  for (const source of sources) {
    createdIds.push(
      await copyOne(tx, source, {
        ...target,
        agentId: copiedAgentId(source, target.projectId, target.agentId),
        namePrefix: target.namePrefix ?? EVALUATOR_COPY_PREFIX,
      }),
    );
  }
  return createdIds;
};
