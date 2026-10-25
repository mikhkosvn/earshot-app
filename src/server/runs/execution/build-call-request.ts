import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { BackgroundNoise, InterruptionLevel } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallDirection, CallRefKind } from '@/server/call-engine/constants';
import type { CallerSetup, StartCallRequest } from '@/server/call-engine/types';
import { formatCallRef } from '@/server/call-engine/utils/call-ref';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

type CallerPersona = Omit<
  CallerSetup,
  'instructions' | 'first_message' | 'variables'
>;

const runCallSelect = {
  id: true,
  status: true,
  resultId: true,
  conversationId: true,
  callerNumber: true,
  evaluatorSnapshot: true,
  testProfileSnapshot: true,
  personality: {
    select: {
      prompt: true,
      language: true,
      accent: true,
      voiceModel: true,
      voiceId: true,
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

const directionOf = (inbound: boolean) => {
  if (inbound) return CallDirection.outbound;
  return CallDirection.inbound;
};

const callerPersonaOf = (
  run: RunForCall,
  agent: RunCallAgent,
): CallerPersona => {
  const personality = run.personality;
  if (!personality) {
    return {
      prompt: '',
      language: agent.language,
      accent: null,
      voice_model: null,
      voice_id: null,
      speed: null,
      interruption_level: InterruptionLevel.off,
      background_noise: BackgroundNoise.off,
    };
  }
  return {
    prompt: personality.prompt,
    language: personality.language,
    accent: personality.accent,
    voice_model: personality.voiceModel,
    voice_id: personality.voiceId,
    speed: personality.speed,
    interruption_level: personality.interruptionLevel ?? InterruptionLevel.off,
    background_noise: personality.backgroundNoise,
  };
};

export const buildCallRequest = (
  run: RunForCall,
  agent: RunCallAgent,
): StartCallRequest | null => {
  const toNumber = run.result.agentNumber ?? agent.phoneNumber;
  if (!toNumber) return null;
  const evaluator = readEvaluatorSnapshot(run.evaluatorSnapshot);
  return {
    call_ref: formatCallRef(CallRefKind.run, run.id),
    direction: directionOf(agent.inbound),
    to_number: toNumber,
    from_number: run.callerNumber,
    max_duration_seconds:
      evaluator.maxDurationSeconds ?? run.result.project.maxCallDuration,
    caller: {
      instructions: evaluator.instructions,
      first_message: evaluator.firstMessage,
      variables: readTestProfileVariables(run.testProfileSnapshot)
        .testingAgentVariables,
      ...callerPersonaOf(run, agent),
    },
  };
};
