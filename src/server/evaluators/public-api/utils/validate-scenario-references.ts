import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { ScenarioTool } from '@/generated/prisma/enums';
import {
  ScenarioField,
  ScenarioToolDbValue,
} from '@/server/evaluators/public-api/constants';
import type { CreatePublicScenarioBody } from '@/server/evaluators/public-api/schemas';
import type { FieldIssue } from '@/server/evaluators/public-api/utils/field-errors';
import {
  fieldErrors,
  throwFieldErrors,
} from '@/server/evaluators/public-api/utils/field-errors';
import { findPersonalityByPublicId } from '@/server/personalities/public-api/public-personality-id';

const toolByDbValue = new Map<string, ScenarioTool>(
  Object.entries(ScenarioToolDbValue).map(([tool, dbValue]) => [
    dbValue,
    tool as ScenarioTool,
  ]),
);

const agentIssues = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
): Promise<FieldIssue[]> => {
  const agent = await tx.agent.findFirst({
    where: { id: agentId, projectId },
    select: { id: true },
  });
  if (agent) return [];
  return [
    {
      field: ScenarioField.agent,
      message: `Agent with id ${agentId} not found in this project`,
    },
  ];
};

const folderIssues = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  path: string,
): Promise<FieldIssue[]> => {
  const folder = await tx.folder.findUnique({
    where: { projectId_path: { projectId, path } },
    select: { id: true },
  });
  if (folder) return [];
  return [
    {
      field: ScenarioField.folder_path,
      message: `Folder with path '${path}' not found in this project`,
    },
  ];
};

const metricIssues = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  metricIds: number[],
): Promise<FieldIssue[]> => {
  const unique = [...new Set(metricIds)];
  if (!unique.length) return [];
  const rows = await tx.metric.findMany({
    where: { id: { in: unique }, projectId },
    select: { id: true },
  });
  const found = new Set(rows.map((row) => row.id));
  return unique
    .filter((metricId) => !found.has(metricId))
    .map((metricId) => ({
      field: ScenarioField.metrics,
      message: `Metric with id ${metricId} not found in this project`,
    }));
};

const testProfileIssues = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  testProfileId: number | null | undefined,
): Promise<FieldIssue[]> => {
  if (!testProfileId) return [];
  const profile = await tx.testProfile.findFirst({
    where: { id: testProfileId, projectId },
    select: { id: true },
  });
  if (profile) return [];
  return [
    {
      field: ScenarioField.test_profile,
      message: `Test profile with id ${testProfileId} not found in this project`,
    },
  ];
};

const toolIssues = (toolIds: string[]): FieldIssue[] =>
  toolIds
    .filter((toolId) => !toolByDbValue.has(toolId))
    .map((toolId) => ({
      field: ScenarioField.tool_ids,
      message: `Tool '${toolId}' is not a valid tool`,
    }));

const personalityIssue = (publicId: number): FieldIssue => ({
  field: ScenarioField.personality,
  message: `Personality with id ${publicId} not found`,
});

const toTools = (toolIds: string[]) =>
  toolIds.flatMap((toolId) => {
    const tool = toolByDbValue.get(toolId);
    if (!tool) return [];
    return [tool];
  });

export const validateScenarioReferences = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  body: CreatePublicScenarioBody,
) => {
  const personality = await findPersonalityByPublicId(
    projectId,
    body.personality,
  );
  const issues = [
    ...(await agentIssues(tx, projectId, body.agent)),
    ...(await metricIssues(tx, projectId, body.metrics)),
    ...(await testProfileIssues(tx, projectId, body.test_profile)),
    ...(await folderIssues(tx, projectId, body.folder_path)),
    ...toolIssues(body.tool_ids),
  ];
  if (!personality) {
    throw fieldErrors([personalityIssue(body.personality), ...issues]);
  }
  throwFieldErrors(issues);
  return { personalityId: personality.id, tools: toTools(body.tool_ids) };
};
