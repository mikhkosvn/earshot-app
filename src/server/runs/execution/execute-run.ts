import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import { EventOutcome } from '@/lib/logging/constants';
import { prisma } from '@/lib/prisma';
import { getCallEngine } from '@/server/call-engine/get-call-engine';
import type { StartCallRequest, StartedCall } from '@/server/call-engine/types';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import { RunBranch, RunStep } from '@/server/runs/constants/run-logging';
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
  request: StartCallRequest,
): Promise<StartCallOutcome> => {
  try {
    return { call: await getCallEngine().startCall(request) };
  } catch (error) {
    recordStepFailure(RunStep.call_start, error);
    return { error: callErrorText(error) };
  }
};

const failRunAt = async (
  runId: number,
  branch: RunBranch,
  errorMessage: string,
) => {
  const failed = await failRun({ runId, errorMessage });
  addEventFields({ run: { branch, failed } });
};

const runCall = async (run: RunForCall) => {
  const agent = run.result.agent;
  if (!agent) {
    await failRunAt(run.id, RunBranch.agent_missing, RunMessage.agentMissing);
    return;
  }
  addEventFields({ agent: { inbound: agent.inbound } });
  const request = buildCallRequest(run, agent);
  if (!request) {
    await failRunAt(
      run.id,
      RunBranch.agent_no_phone_number,
      RunMessage.agentNoPhoneNumber,
    );
    return;
  }
  addEventFields({
    call: {
      direction: request.direction,
      max_duration_seconds: request.max_duration_seconds,
    },
  });
  const started = await startCall(request);
  if ('error' in started) {
    await failRunAt(run.id, RunBranch.call_start_failed, started.error);
    return;
  }
  await prisma.conversation.update({
    where: { id: run.conversationId },
    data: { providerCallId: started.call.providerCallId },
  });
  addEventFields({
    run: { branch: RunBranch.call_started },
    call: { provider_call_id: started.call.providerCallId },
  });
};

export const executeRun = async (runId: number) => {
  const run = await loadRunForCall(runId);
  addEventFields({ run: { id: runId, status: run?.status ?? null } });
  if (!run || run.status !== RunStatus.in_progress) {
    addEventFields({
      outcome: EventOutcome.skipped,
      run: { branch: RunBranch.not_in_progress },
    });
    return;
  }
  addEventFields({
    result: { id: run.resultId },
    project: { id: run.result.projectId },
    conversation: { id: run.conversationId },
  });
  try {
    await runCall(run);
  } catch (error) {
    recordStepFailure(RunStep.execution, error);
    addEventFields({ outcome: EventOutcome.failure });
    await failRun({ runId, errorMessage: callErrorText(error) });
  } finally {
    await closeResultIfDone(run.resultId);
  }
};
