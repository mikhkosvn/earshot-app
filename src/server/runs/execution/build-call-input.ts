import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  BackgroundNoise,
  Gender,
  InterruptionLevel,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallDirection } from '@/server/call-engine/constants';
import type {
  CallPersonality,
  CallVariable,
  PlaceCallInput,
} from '@/server/call-engine/types';
import {
  FAST_SPEED_ABOVE,
  SLOW_SPEED_BELOW,
} from '@/server/runs/constants/run-limits';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

export const DEFAULT_PERSONALITY_NAME = 'Default caller';

const runCallSelect = {
  id: true,
  status: true,
  resultId: true,
  conversationId: true,
  evaluatorId: true,
  evaluatorSnapshot: true,
  testProfileSnapshot: true,
  personality: {
    select: {
      name: true,
      gender: true,
      language: true,
      speed: true,
      interruptionLevel: true,
      backgroundNoise: true,
    },
  },
  result: {
    select: {
      projectId: true,
      agentNumber: true,
      project: { select: { maxCallDuration: true } },
      agent: {
        select: {
          id: true,
          name: true,
          description: true,
          language: true,
          phoneNumber: true,
          inbound: true,
        },
      },
    },
  },
} satisfies Prisma.RunSelect;

export type RunForCall = Prisma.RunGetPayload<{
  select: typeof runCallSelect;
}>;

export type RunCallAgent = NonNullable<RunForCall['result']['agent']>;

export const loadRunForCall = (runId: number) =>
  prisma.run.findUnique({ where: { id: runId }, select: runCallSelect });

const speedLabel = (speed: number | null) => {
  if (speed === null) return 'normal';
  if (speed < SLOW_SPEED_BELOW) return 'slow';
  if (speed > FAST_SPEED_ABOVE) return 'fast';
  return 'normal';
};

const directionOf = (inbound: boolean) => {
  if (inbound) return CallDirection.outbound;
  return CallDirection.inbound;
};

const personalityOf = (
  run: RunForCall,
  agent: RunCallAgent,
): CallPersonality => {
  const personality = run.personality;
  if (!personality) {
    return {
      name: DEFAULT_PERSONALITY_NAME,
      gender: Gender.neutral,
      language: agent.language,
      speed: speedLabel(null),
      interruptionLevel: InterruptionLevel.off,
      backgroundNoise: BackgroundNoise.off,
    };
  }
  return {
    name: personality.name,
    gender: personality.gender,
    language: personality.language,
    speed: speedLabel(personality.speed),
    interruptionLevel: personality.interruptionLevel ?? InterruptionLevel.off,
    backgroundNoise: personality.backgroundNoise,
  };
};

const toVariables = (record: Record<string, string>): CallVariable[] =>
  Object.entries(record).map(([key, value]) => ({ key, value }));

export const buildCallInput = (
  run: RunForCall,
  agent: RunCallAgent,
): PlaceCallInput => {
  const evaluator = readEvaluatorSnapshot(run.evaluatorSnapshot);
  const variables = readTestProfileVariables(run.testProfileSnapshot);
  return {
    direction: directionOf(agent.inbound),
    agent: {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      language: agent.language,
      phoneNumber: run.result.agentNumber ?? agent.phoneNumber,
    },
    evaluator: {
      name: evaluator.name,
      instructions: evaluator.instructions,
      expectedOutcome: evaluator.expectedOutcomePrompt ?? '',
      firstMessage: evaluator.firstMessage,
    },
    personality: personalityOf(run, agent),
    mainAgentVariables: toVariables(variables.mainAgentVariables),
    testingAgentVariables: toVariables(variables.testingAgentVariables),
    maxDurationSeconds:
      evaluator.maxDurationSeconds ?? run.result.project.maxCallDuration,
  };
};
