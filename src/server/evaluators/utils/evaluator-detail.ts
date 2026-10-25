import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type {
  EvaluatorDetail,
  EvaluatorSnapshot,
} from '@/server/evaluators/types';

export const evaluatorDetailSelect = {
  id: true,
  projectId: true,
  name: true,
  agentId: true,
  scenarioType: true,
  testProfileId: true,
  firstMessage: true,
  instructions: true,
  personalityId: true,
  language: true,
  expectedOutcomePrompt: true,
  phoneNumberId: true,
  maxDurationSeconds: true,
  creationMethod: true,
  createdAt: true,
  updatedAt: true,
  agent: { select: { name: true } },
  folder: { select: { path: true } },
  testProfile: { select: { name: true } },
  personality: { select: { name: true } },
  phoneNumber: { select: { phoneNumber: true } },
  createdBy: { select: { name: true } },
  updatedBy: { select: { name: true } },
  tags: {
    select: { tag: { select: { name: true } } },
    orderBy: { tag: { name: Prisma.SortOrder.asc } },
  },
  tools: { select: { tool: true } },
  metrics: {
    select: { metricId: true, metric: { select: { name: true } } },
    orderBy: { metric: { displayOrder: Prisma.SortOrder.asc } },
  },
  expectedToolCalls: {
    select: {
      mockToolId: true,
      input: true,
      output: true,
      mockTool: { select: { name: true } },
    },
    orderBy: { position: Prisma.SortOrder.asc },
  },
} satisfies Prisma.EvaluatorSelect;

export type EvaluatorDetailRow = Prisma.EvaluatorGetPayload<{
  select: typeof evaluatorDetailSelect;
}>;

const prettyJson = (value: Prisma.JsonValue) => JSON.stringify(value, null, 2);

export const toEvaluatorDetail = (
  row: EvaluatorDetailRow,
): EvaluatorDetail => ({
  id: row.id,
  projectId: row.projectId,
  name: row.name,
  agentId: row.agentId,
  agentName: row.agent?.name ?? null,
  folderPath: row.folder?.path ?? null,
  tags: row.tags.map((entry) => entry.tag.name),
  scenarioType: row.scenarioType,
  testProfileId: row.testProfileId,
  testProfileName: row.testProfile?.name ?? null,
  firstMessage: row.firstMessage ?? '',
  instructions: row.instructions,
  personalityId: row.personalityId,
  personalityName: row.personality?.name ?? null,
  language: row.language,
  expectedOutcomePrompt: row.expectedOutcomePrompt ?? '',
  metricIds: row.metrics.map((entry) => entry.metricId),
  metricNames: row.metrics.map((entry) => entry.metric.name),
  expectedToolCalls: row.expectedToolCalls.map((call) => ({
    mockToolId: call.mockToolId,
    mockToolName: call.mockTool.name,
    input: prettyJson(call.input),
    output: prettyJson(call.output),
  })),
  phoneNumberId: row.phoneNumberId,
  phoneNumber: row.phoneNumber?.phoneNumber ?? null,
  tools: row.tools.map((entry) => entry.tool),
  maxDurationSeconds: row.maxDurationSeconds,
  creationMethod: row.creationMethod,
  createdAt: row.createdAt,
  createdByName: row.createdBy?.name ?? null,
  updatedAt: row.updatedAt,
  updatedByName: row.updatedBy?.name ?? null,
});

export const toEvaluatorSnapshot = (
  detail: EvaluatorDetail,
): EvaluatorSnapshot => ({
  name: detail.name,
  agentId: detail.agentId,
  agentName: detail.agentName,
  folderPath: detail.folderPath,
  tags: detail.tags,
  scenarioType: detail.scenarioType,
  testProfileId: detail.testProfileId,
  testProfileName: detail.testProfileName,
  firstMessage: detail.firstMessage,
  instructions: detail.instructions,
  personalityId: detail.personalityId,
  personalityName: detail.personalityName,
  language: detail.language,
  expectedOutcomePrompt: detail.expectedOutcomePrompt,
  metricIds: detail.metricIds,
  metricNames: detail.metricNames,
  expectedToolCalls: detail.expectedToolCalls,
  phoneNumberId: detail.phoneNumberId,
  phoneNumber: detail.phoneNumber,
  tools: detail.tools,
  maxDurationSeconds: detail.maxDurationSeconds,
});
