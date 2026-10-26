import 'server-only';

import type { z } from 'zod';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { modifyEvaluatorsSchema } from '@/server/evaluators/schemas/evaluator-bulk';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { assertEvaluatorReferences } from '@/server/evaluators/utils/resolve-evaluator-references';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

type ModifyArgs = z.output<typeof modifyEvaluatorsSchema>;

interface TargetEvaluator {
  id: number;
  agentId: number | null;
  testProfileId: number | null;
  instructions: string;
}

const hasChange = (args: ModifyArgs) =>
  args.agentId !== null ||
  args.testProfileId !== null ||
  args.personalityId !== null ||
  args.firstMessage.trim() !== '' ||
  args.sendEmptyFirstMessage ||
  args.maxDurationSeconds !== null ||
  args.phoneNumberId !== null ||
  args.addMetricIds.length > 0 ||
  args.removeMetricIds.length > 0 ||
  args.appendInstructions.trim() !== '' ||
  args.addTools.length > 0 ||
  args.removeTools.length > 0;

const firstMessageData = (args: ModifyArgs) => {
  if (args.sendEmptyFirstMessage) return { firstMessage: '' };
  if (args.firstMessage.trim()) return { firstMessage: args.firstMessage };
  return {};
};

const instructionsData = (args: ModifyArgs, evaluator: TargetEvaluator) => {
  const extra = args.appendInstructions.trim();
  if (!extra) return {};
  return { instructions: `${evaluator.instructions}\n\n${extra}` };
};

const resolveTestProfileId = async (
  tx: Prisma.TransactionClient,
  args: ModifyArgs,
  evaluator: TargetEvaluator,
) => {
  if (args.testProfileId !== null) return args.testProfileId;
  if (args.agentId === null || args.agentId === evaluator.agentId) {
    return evaluator.testProfileId;
  }
  const agent = await tx.agent.findUniqueOrThrow({
    where: { id: args.agentId },
    select: { defaultTestProfileId: true },
  });
  return agent.defaultTestProfileId;
};

const modifyOne = async (
  tx: Prisma.TransactionClient,
  args: ModifyArgs,
  evaluator: TargetEvaluator,
  userId: number,
) => {
  const agentId = args.agentId ?? evaluator.agentId;
  const testProfileId = await resolveTestProfileId(tx, args, evaluator);
  await assertEvaluatorReferences(tx, {
    projectId: args.projectId,
    agentId,
    testProfileId,
  });
  if (agentId !== evaluator.agentId) {
    await tx.evaluatorExpectedToolCall.deleteMany({
      where: { evaluatorId: evaluator.id },
    });
  }
  await tx.evaluatorMetric.deleteMany({
    where: {
      evaluatorId: evaluator.id,
      metricId: { in: args.removeMetricIds },
    },
  });
  await tx.evaluatorMetric.createMany({
    data: args.addMetricIds.map((metricId) => ({
      evaluatorId: evaluator.id,
      metricId,
    })),
    skipDuplicates: true,
  });
  await tx.evaluatorTool.deleteMany({
    where: { evaluatorId: evaluator.id, tool: { in: args.removeTools } },
  });
  await tx.evaluatorTool.createMany({
    data: args.addTools.map((tool) => ({ evaluatorId: evaluator.id, tool })),
    skipDuplicates: true,
  });
  await tx.evaluator.update({
    where: { id: evaluator.id },
    data: {
      agentId,
      testProfileId,
      updatedById: userId,
      ...(args.personalityId !== null && { personalityId: args.personalityId }),
      ...(args.maxDurationSeconds !== null && {
        maxDurationSeconds: args.maxDurationSeconds,
      }),
      ...(args.phoneNumberId !== null && { phoneNumberId: args.phoneNumberId }),
      ...firstMessageData(args),
      ...instructionsData(args, evaluator),
    },
  });
  await recordEvaluatorVersion(tx, {
    evaluatorId: evaluator.id,
    userId,
    changeReason: 'Advanced Scenarios Edit',
  });
};

export const modifyEvaluators = withValidation(
  modifyEvaluatorsSchema,
  async (args) => {
    const { user } = await requireProjectAccess(args.projectId);
    if (!hasChange(args)) {
      throw new ActionError('Choose at least one change to apply.');
    }
    return prisma.$transaction(async (tx) => {
      await assertEvaluatorReferences(tx, {
        projectId: args.projectId,
        agentId: null,
        personalityId: args.personalityId,
        metricIds: args.addMetricIds,
        phoneNumberId: args.phoneNumberId,
      });
      const evaluators = await tx.evaluator.findMany({
        where: { projectId: args.projectId, id: { in: args.evaluatorIds } },
        select: {
          id: true,
          agentId: true,
          testProfileId: true,
          instructions: true,
        },
      });
      addEventFields({
        project: { id: args.projectId },
        evaluators: {
          requested_count: args.evaluatorIds.length,
          updated_count: evaluators.length,
        },
      });
      for (const evaluator of evaluators) {
        await modifyOne(tx, args, evaluator, user.id);
      }
      return { count: evaluators.length };
    });
  },
);
