import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';
import { enabledPersonalityWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { RunMessage } from '@/server/runs/constants/run-messages';

const runAgentSelect = {
  id: true,
  name: true,
  language: true,
  phoneNumber: true,
  mockToolsEnabled: true,
  defaultTestProfileId: true,
  mockTools: {
    select: { id: true, name: true },
    orderBy: { name: Prisma.SortOrder.asc },
  },
} satisfies Prisma.AgentSelect;

export type RunAgent = Prisma.AgentGetPayload<{
  select: typeof runAgentSelect;
}>;

export const loadRunAgent = async (projectId: number, agentId: number) => {
  const agent = await prisma.agent.findFirst({
    where: { id: agentId, projectId },
    select: runAgentSelect,
  });
  if (!agent) throw new ActionError(RunMessage.agentMissing, 404);
  return agent;
};

export const resolveAgentNumber = (
  override: string | null | undefined,
  agentPhoneNumber: string | null,
) => {
  const number = override?.trim() || agentPhoneNumber?.trim();
  if (!number) throw new ActionError(RunMessage.agentNoPhoneNumber);
  return number;
};

export const resolveMockToolIds = (
  agent: RunAgent,
  mockToolIds: number[] | null | undefined,
) => {
  if (mockToolIds === null || mockToolIds === undefined) {
    if (!agent.mockToolsEnabled) return [];
    return agent.mockTools.map((tool) => tool.id);
  }
  const own = new Set(agent.mockTools.map((tool) => tool.id));
  const unique = [...new Set(mockToolIds)];
  if (unique.some((id) => !own.has(id))) {
    throw new ActionError(RunMessage.mockToolOtherAgent);
  }
  return unique;
};

export const assertPersonalitiesEnabled = async (
  projectId: number,
  personalityIds: number[],
) => {
  const unique = [...new Set(personalityIds)];
  if (unique.length === 0) return;
  const count = await prisma.personality.count({
    where: { id: { in: unique }, ...enabledPersonalityWhere(projectId) },
  });
  if (count !== unique.length) {
    throw new ActionError(RunMessage.personalityNotEnabled);
  }
};

export const assertTestProfilesOfAgent = async (
  projectId: number,
  agentId: number,
  testProfileIds: number[],
) => {
  const unique = [...new Set(testProfileIds)];
  if (unique.length === 0) return;
  const count = await prisma.testProfile.count({
    where: { id: { in: unique }, projectId, agentId },
  });
  if (count !== unique.length) {
    throw new ActionError(RunMessage.testProfileOtherAgent);
  }
};
