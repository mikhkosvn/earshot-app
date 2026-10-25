import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { CreationMethod } from '@/generated/prisma/enums';
import type { EvaluatorFieldsOutput } from '@/server/evaluators/types';
import { assertEvaluatorReferences } from '@/server/evaluators/utils/resolve-evaluator-references';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import { upsertTags } from '@/server/tags/utils/upsert-tags';

type WriteEvaluatorArgs = {
  projectId: number;
  userId: number | null;
  fields: EvaluatorFieldsOutput;
  generationSessionId?: number | null;
};

type CreateEvaluatorArgs = WriteEvaluatorArgs & {
  creationMethod: CreationMethod;
};

type UpdateEvaluatorArgs = WriteEvaluatorArgs & {
  evaluatorId: number;
};

const prepareRelations = async (
  tx: Prisma.TransactionClient,
  { projectId, fields }: WriteEvaluatorArgs,
) => {
  await assertEvaluatorReferences(tx, {
    projectId,
    agentId: fields.agentId,
    testProfileId: fields.testProfileId,
    personalityId: fields.personalityId,
    metricIds: fields.metricIds,
    phoneNumberId: fields.phoneNumberId,
    mockToolIds: fields.expectedToolCalls.map((call) => call.mockToolId),
  });
  const folder = await findFolderOrThrow(tx, projectId, fields.folderPath);
  const tagIds = await upsertTags(tx, projectId, fields.tags);
  return { folderId: folder.id, tagIds };
};

const scalarData = (fields: EvaluatorFieldsOutput) => ({
  name: fields.name,
  scenarioType: fields.scenarioType,
  firstMessage: fields.firstMessage,
  instructions: fields.instructions,
  language: fields.language,
  expectedOutcomePrompt: fields.expectedOutcomePrompt,
  maxDurationSeconds: fields.maxDurationSeconds,
});

const relationRows = (fields: EvaluatorFieldsOutput, tagIds: number[]) => ({
  tags: tagIds.map((tagId) => ({ tagId })),
  tools: [...new Set(fields.tools)].map((tool) => ({ tool })),
  metrics: [...new Set(fields.metricIds)].map((metricId) => ({ metricId })),
  expectedToolCalls: fields.expectedToolCalls.map((call, position) => ({
    mockToolId: call.mockToolId,
    position,
    input: JSON.parse(call.input) as Prisma.InputJsonValue,
    output: JSON.parse(call.output) as Prisma.InputJsonValue,
  })),
});

export const createEvaluatorRecord = async (
  tx: Prisma.TransactionClient,
  args: CreateEvaluatorArgs,
) => {
  const { folderId, tagIds } = await prepareRelations(tx, args);
  const rows = relationRows(args.fields, tagIds);
  return tx.evaluator.create({
    data: {
      ...scalarData(args.fields),
      projectId: args.projectId,
      folderId,
      agentId: args.fields.agentId,
      personalityId: args.fields.personalityId,
      testProfileId: args.fields.testProfileId,
      phoneNumberId: args.fields.phoneNumberId,
      generationSessionId: args.generationSessionId ?? null,
      creationMethod: args.creationMethod,
      createdById: args.userId,
      updatedById: args.userId,
      tags: { create: rows.tags },
      tools: { create: rows.tools },
      metrics: { create: rows.metrics },
      expectedToolCalls: { create: rows.expectedToolCalls },
    },
    select: { id: true },
  });
};

export const updateEvaluatorRecord = async (
  tx: Prisma.TransactionClient,
  args: UpdateEvaluatorArgs,
) => {
  const { folderId, tagIds } = await prepareRelations(tx, args);
  const rows = relationRows(args.fields, tagIds);
  return tx.evaluator.update({
    where: { id: args.evaluatorId },
    data: {
      ...scalarData(args.fields),
      folderId,
      agentId: args.fields.agentId,
      personalityId: args.fields.personalityId,
      testProfileId: args.fields.testProfileId,
      phoneNumberId: args.fields.phoneNumberId,
      updatedById: args.userId,
      tags: { deleteMany: {}, create: rows.tags },
      tools: { deleteMany: {}, create: rows.tools },
      metrics: { deleteMany: {}, create: rows.metrics },
      expectedToolCalls: { deleteMany: {}, create: rows.expectedToolCalls },
    },
    select: { id: true },
  });
};
