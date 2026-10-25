import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';
import {
  MONITOR_PERSONALITIES_NOT_FOUND,
  MONITOR_SCENARIOS_NOT_FOUND,
  VOICE_CONTACT_NUMBER_REQUIRED,
} from '@/server/monitors/constants/monitor-messages';
import type { MonitorFieldsInput } from '@/server/monitors/types';
import { visiblePersonalityWhere } from '@/server/personalities/utils/personality-access';

const uniqueIds = (ids: number[]) => [...new Set(ids)];

const assertScenarios = async (projectId: number, evaluatorIds: number[]) => {
  const ids = uniqueIds(evaluatorIds);
  const count = await prisma.evaluator.count({
    where: { projectId, id: { in: ids } },
  });
  if (count !== ids.length) {
    throw new ActionError(MONITOR_SCENARIOS_NOT_FOUND, 404);
  }
};

const assertPersonalities = async (
  projectId: number,
  personalityIds: number[],
) => {
  const ids = uniqueIds(personalityIds);
  if (ids.length === 0) return;
  const count = await prisma.personality.count({
    where: { id: { in: ids }, AND: [visiblePersonalityWhere(projectId)] },
  });
  if (count !== ids.length) {
    throw new ActionError(MONITOR_PERSONALITIES_NOT_FOUND, 404);
  }
};

const readVoiceAgent = async (projectId: number, agentId: number) => {
  const agent = await prisma.agent.findUniqueOrThrow({
    where: { id: agentId, projectId },
    select: { phoneNumber: true },
  });
  if (!agent.phoneNumber) {
    throw new ActionError(VOICE_CONTACT_NUMBER_REQUIRED, 400);
  }
  return { phoneNumber: agent.phoneNumber };
};

const overrideNumber = (agentNumber: string | null, phoneNumber: string) => {
  const value = agentNumber?.trim() ?? '';
  if (!value || value === phoneNumber) return null;
  return value;
};

export const validateMonitorFields = async (
  projectId: number,
  fields: MonitorFieldsInput,
) => {
  const agent = await readVoiceAgent(projectId, fields.agentId);
  await assertScenarios(projectId, fields.evaluatorIds);
  await assertPersonalities(projectId, fields.personalityIds);
  return {
    evaluatorIds: uniqueIds(fields.evaluatorIds),
    personalityIds: uniqueIds(fields.personalityIds),
    agentNumber: overrideNumber(fields.agentNumber, agent.phoneNumber),
  };
};
