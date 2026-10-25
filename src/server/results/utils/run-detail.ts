import 'server-only';

import { prisma } from '@/lib/prisma';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import type { RunDetail } from '@/server/results/types';
import {
  evaluatorRefOf,
  runStartOf,
  toAgentRef,
  toNamedRef,
} from '@/server/results/utils/refs';

const namedSelect = { select: { id: true, name: true } } as const;

export const loadRunDetail = async (runId: number): Promise<RunDetail> => {
  const run = await prisma.run.findUniqueOrThrow({
    where: { id: runId },
    select: {
      id: true,
      resultId: true,
      conversationId: true,
      status: true,
      evaluationStatus: true,
      feedback: true,
      errorMessage: true,
      callerNumber: true,
      evaluatorSnapshot: true,
      executedAt: true,
      createdAt: true,
      evaluator: namedSelect,
      personality: namedSelect,
      testProfile: namedSelect,
      conversation: { select: { startedAt: true } },
      result: {
        select: {
          agent: { select: { id: true, name: true, inbound: true } },
          agentVersion: { select: { version: true } },
        },
      },
    },
  });
  const rubric = await computeRubricVerdict({
    conversationId: run.conversationId,
  });
  return {
    id: run.id,
    resultId: run.resultId,
    conversationId: run.conversationId,
    status: run.status,
    evaluationStatus: run.evaluationStatus,
    feedback: run.feedback,
    errorMessage: run.errorMessage,
    evaluator: evaluatorRefOf(run.evaluator, run.evaluatorSnapshot),
    agent: toAgentRef(run.result.agent, run.result.agentVersion),
    personality: toNamedRef(run.personality),
    testProfile: toNamedRef(run.testProfile),
    startedAt: runStartOf(run),
    inbound: run.result.agent?.inbound ?? true,
    testingNumber: run.callerNumber,
    rubric,
  };
};
