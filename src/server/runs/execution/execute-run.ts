import 'server-only';

import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallEndedReason } from '@/server/call-engine/constants';
import { getCallEngine } from '@/server/call-engine/get-call-engine';
import type { PlacedCall } from '@/server/call-engine/types';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import { RunMessage } from '@/server/runs/constants/run-messages';
import {
  buildCallInput,
  loadRunForCall,
  type RunCallAgent,
  type RunForCall,
} from '@/server/runs/execution/build-call-input';
import { failRun } from '@/server/runs/execution/fail-run';
import { scoreRun } from '@/server/runs/execution/score-run';
import { storeConversation } from '@/server/runs/execution/store-conversation';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

const METRIC_FAILURE_MESSAGE = 'The metric evaluation failed.';

const callErrorText = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return `${RunMessage.callFailed} ${error.message}`;
  }
  return RunMessage.callFailed;
};

const isUnanswered = (call: PlacedCall) =>
  call.endedReason === CallEndedReason.no_answer || call.turns.length === 0;

type PlaceCallOutcome = { call: PlacedCall } | { error: string };

const placeCall = async (
  run: RunForCall,
  agent: RunCallAgent,
): Promise<PlaceCallOutcome> => {
  try {
    return {
      call: await getCallEngine().placeCall(buildCallInput(run, agent)),
    };
  } catch (error) {
    console.error(`[runs] The call of run ${run.id} failed.`, error);
    return { error: callErrorText(error) };
  }
};

const markEvaluating = async (runId: number) => {
  const { count } = await prisma.run.updateMany({
    where: { id: runId, status: RunStatus.in_progress },
    data: { status: RunStatus.evaluating },
  });
  return count > 0;
};

const evaluate = async (run: RunForCall) => {
  try {
    const evaluationStatus = await scoreRun({
      projectId: run.result.projectId,
      conversationId: run.conversationId,
      evaluatorId: run.evaluatorId,
      evaluatorSnapshot: run.evaluatorSnapshot,
    });
    return { evaluationStatus, errorMessage: null };
  } catch (error) {
    console.error(`[runs] The scoring of run ${run.id} failed.`, error);
    return {
      evaluationStatus: CallEvaluationStatus.failure,
      errorMessage: METRIC_FAILURE_MESSAGE,
    };
  }
};

const runCall = async (run: RunForCall) => {
  const agent = run.result.agent;
  if (!agent) {
    await failRun({ runId: run.id, errorMessage: RunMessage.agentMissing });
    return;
  }
  const placed = await placeCall(run, agent);
  if ('error' in placed) {
    await failRun({ runId: run.id, errorMessage: placed.error });
    return;
  }
  await storeConversation({
    projectId: run.result.projectId,
    conversationId: run.conversationId,
    runId: run.id,
    call: placed.call,
    dynamicVariables: readTestProfileVariables(run.testProfileSnapshot)
      .mainAgentVariables,
  });
  if (isUnanswered(placed.call)) {
    await failRun({ runId: run.id, errorMessage: RunMessage.callNotAnswered });
    return;
  }
  if (!(await markEvaluating(run.id))) return;
  const outcome = await evaluate(run);
  await prisma.run.updateMany({
    where: { id: run.id, status: RunStatus.evaluating },
    data: {
      status: RunStatus.completed,
      evaluationStatus: outcome.evaluationStatus,
      errorMessage: outcome.errorMessage,
    },
  });
};

export const executeRun = async (runId: number) => {
  const run = await loadRunForCall(runId);
  if (!run || run.status !== RunStatus.in_progress) return;
  try {
    await runCall(run);
  } catch (error) {
    console.error(`[runs] The run ${runId} failed.`, error);
    await failRun({ runId, errorMessage: callErrorText(error) });
  } finally {
    await closeResultIfDone(run.resultId);
  }
};
