import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { CallDirection, CallRefKind } from '@/server/call-engine/constants';
import type { CallerSetup, StartCallRequest } from '@/server/call-engine/types';
import { formatCallRef } from '@/server/call-engine/utils/call-ref';
import { defaultPersonalityIdOf } from '@/server/personalities/utils/default-personality';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

type CallerPersona = Omit<
  CallerSetup,
  'instructions' | 'first_message' | 'variables'
>;

const callerPersonalitySelect = {
  prompt: true,
  language: true,
  accent: true,
  voice: true,
} satisfies Prisma.PersonalitySelect;

const runCallSelect = {
  id: true,
  status: true,
  resultId: true,
  conversationId: true,
  callerNumber: true,
  evaluatorSnapshot: true,
  testProfileSnapshot: true,
  personality: { select: callerPersonalitySelect },
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

const loadDefaultCaller = async (projectId: number) =>
  prisma.personality.findUniqueOrThrow({
    where: { id: await defaultPersonalityIdOf(projectId) },
    select: callerPersonalitySelect,
  });

export const loadRunForCall = async (runId: number) => {
  const run = await prisma.run.findUnique({
    where: { id: runId },
    select: runCallSelect,
  });
  if (!run) return null;
  if (run.personality) return { ...run, personality: run.personality };
  return {
    ...run,
    personality: await loadDefaultCaller(run.result.projectId),
  };
};

export type RunForCall = NonNullable<
  Awaited<ReturnType<typeof loadRunForCall>>
>;

export type RunCallAgent = NonNullable<RunForCall['result']['agent']>;

const directionOf = (inbound: boolean) => {
  if (inbound) return CallDirection.outbound;
  return CallDirection.inbound;
};

const callerPersonaOf = (run: RunForCall): CallerPersona => ({
  prompt: run.personality.prompt,
  language: run.personality.language,
  accent: run.personality.accent,
  voice: run.personality.voice,
});

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
      ...callerPersonaOf(run),
    },
  };
};
