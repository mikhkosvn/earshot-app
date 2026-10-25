import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { getCallEngine } from '@/server/call-engine/get-call-engine';
import type { StartCallRequest, StartedCall } from '@/server/call-engine/types';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import { RunMessage } from '@/server/runs/constants/run-messages';
import {
  buildCallRequest,
  loadRunForCall,
  type RunForCall,
} from '@/server/runs/execution/build-call-request';
import { failRun } from '@/server/runs/execution/fail-run';

const callErrorText = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return `${RunMessage.callFailed} ${error.message}`;
  }
  return RunMessage.callFailed;
};

type StartCallOutcome = { call: StartedCall } | { error: string };

const startCall = async (
  runId: number,
  request: StartCallRequest,
): Promise<StartCallOutcome> => {
  try {
    return { call: await getCallEngine().startCall(request) };
  } catch (error) {
    console.error(`[runs] The call of run ${runId} did not start.`, error);
    return { error: callErrorText(error) };
  }
};

const runCall = async (run: RunForCall) => {
  const agent = run.result.agent;
  if (!agent) {
    await failRun({ runId: run.id, errorMessage: RunMessage.agentMissing });
    return;
  }
  const request = buildCallRequest(run, agent);
  if (!request) {
    await failRun({
      runId: run.id,
      errorMessage: RunMessage.agentNoPhoneNumber,
    });
    return;
  }
  const started = await startCall(run.id, request);
  if ('error' in started) {
    await failRun({ runId: run.id, errorMessage: started.error });
    return;
  }
  await prisma.conversation.update({
    where: { id: run.conversationId },
    data: { providerCallId: started.call.providerCallId },
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
