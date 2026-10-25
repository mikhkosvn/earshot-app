import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { ActionError } from '@/server/common/run-action';
import { personalityForProjectWhere } from '@/server/evaluators/utils/evaluator-access-where';

interface ReferenceArgs {
  projectId: number;
  agentId: number | null;
  testProfileId?: number | null;
  personalityId?: number | null;
  metricIds?: number[];
  phoneNumberId?: number | null;
  mockToolIds?: number[];
}

const assertAgent = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number | null,
) => {
  if (agentId === null) return;
  const agent = await tx.agent.findFirst({
    where: { id: agentId, projectId },
    select: { id: true },
  });
  if (!agent) throw new ActionError('The agent does not exist.', 404);
};

const assertTestProfile = async (
  tx: Prisma.TransactionClient,
  args: ReferenceArgs,
) => {
  if (!args.testProfileId) return;
  const profile = await tx.testProfile.findFirst({
    where: { id: args.testProfileId, projectId: args.projectId },
    select: { agentId: true },
  });
  if (!profile) throw new ActionError('The test profile does not exist.', 404);
  if (args.agentId !== null && profile.agentId !== args.agentId) {
    throw new ActionError(
      'The test profile belongs to another agent. Select a test profile of this agent.',
    );
  }
};

const assertPersonality = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  personalityId: number | null | undefined,
) => {
  if (!personalityId) return;
  const personality = await tx.personality.findFirst({
    where: { id: personalityId, ...personalityForProjectWhere(projectId) },
    select: { id: true },
  });
  if (!personality) {
    throw new ActionError('The personality does not exist.', 404);
  }
};

const assertMetrics = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  metricIds: number[] | undefined,
) => {
  if (!metricIds?.length) return;
  const unique = [...new Set(metricIds)];
  const count = await tx.metric.count({
    where: { id: { in: unique }, projectId },
  });
  if (count !== unique.length) {
    throw new ActionError('A selected metric does not exist.', 404);
  }
};

const assertPhoneNumber = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  phoneNumberId: number | null | undefined,
) => {
  if (!phoneNumberId) return;
  const phoneNumber = await tx.telephonyPhoneNumber.findFirst({
    where: {
      id: phoneNumberId,
      organization: { projects: { some: { id: projectId } } },
    },
    select: { id: true },
  });
  if (!phoneNumber) {
    throw new ActionError('The phone number does not exist.', 404);
  }
};

const assertMockTools = async (
  tx: Prisma.TransactionClient,
  agentId: number | null,
  mockToolIds: number[] | undefined,
) => {
  if (!mockToolIds?.length) return;
  const unique = [...new Set(mockToolIds)];
  const count = await tx.mockTool.count({
    where: { id: { in: unique }, ...(agentId !== null && { agentId }) },
  });
  if (count !== unique.length) {
    throw new ActionError(
      'An expected mock tool does not belong to the agent.',
      404,
    );
  }
};

export const assertEvaluatorReferences = async (
  tx: Prisma.TransactionClient,
  args: ReferenceArgs,
) => {
  await assertAgent(tx, args.projectId, args.agentId);
  await assertTestProfile(tx, args);
  await assertPersonality(tx, args.projectId, args.personalityId);
  await assertMetrics(tx, args.projectId, args.metricIds);
  await assertPhoneNumber(tx, args.projectId, args.phoneNumberId);
  await assertMockTools(tx, args.agentId, args.mockToolIds);
};
