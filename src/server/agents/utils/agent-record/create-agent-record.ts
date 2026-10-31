import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { RedactionField } from '@/generated/prisma/enums';
import {
  DEFAULT_AGENT_PERSONALITY_NAME,
  DEFAULT_TEST_PROFILE_PREFIX,
} from '@/server/agents/constants/agent-limits';
import { saveAgentVersion } from '@/server/agents/utils/save-agent-version';

type AgentRecordData = Omit<
  Prisma.AgentUncheckedCreateInput,
  'projectId' | 'redactionFields' | 'defaultTestProfileId'
>;

interface CreateAgentRecordArgs {
  projectId: number;
  userId: number | null;
  data: AgentRecordData;
  redactionFields: RedactionField[];
}

const defaultTestProfileName = (agentName: string, agentId: number) =>
  `${DEFAULT_TEST_PROFILE_PREFIX} - ${agentName} (${agentId})`;

const linkAutoMetrics = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
) => {
  const metrics = await tx.metric.findMany({
    where: { projectId, addToNewAgents: true },
    select: { id: true },
  });
  await tx.metricAgent.createMany({
    data: metrics.map((metric) => ({ metricId: metric.id, agentId })),
    skipDuplicates: true,
  });
};

const enableDefaultPersonality = async (
  tx: Prisma.TransactionClient,
  agentId: number,
) => {
  const personality = await tx.personality.findFirst({
    where: { projectId: null, name: DEFAULT_AGENT_PERSONALITY_NAME },
    orderBy: { id: Prisma.SortOrder.asc },
    select: { id: true },
  });
  if (!personality) return;
  await tx.agentPersonality.create({
    data: { agentId, personalityId: personality.id },
  });
};

export const createAgentRecord = async (
  tx: Prisma.TransactionClient,
  { projectId, userId, data, redactionFields }: CreateAgentRecordArgs,
) => {
  const agent = await tx.agent.create({
    data: {
      ...data,
      projectId,
      redactionFields: {
        create: redactionFields.map((field) => ({ field })),
      },
    },
    select: { id: true, name: true },
  });
  const testProfile = await tx.testProfile.create({
    data: {
      projectId,
      agentId: agent.id,
      name: defaultTestProfileName(agent.name, agent.id),
      createdById: userId,
      updatedById: userId,
    },
    select: { id: true },
  });
  await tx.agent.update({
    where: { id: agent.id },
    data: { defaultTestProfileId: testProfile.id },
  });
  await linkAutoMetrics(tx, projectId, agent.id);
  await enableDefaultPersonality(tx, agent.id);
  await saveAgentVersion(tx, { agentId: agent.id, userId });
  return agent;
};
