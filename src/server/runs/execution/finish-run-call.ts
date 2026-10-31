import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import { EventOutcome, TriggerType } from '@/lib/logging/constants';
import { prisma } from '@/lib/prisma';
import { CallEndedReason } from '@/server/call-engine/constants';
import { toPlacedCall } from '@/server/call-engine/events/to-placed-call';
import type {
  EndOfCallEvent,
  PlacedCall,
  RecordingLoader,
} from '@/server/call-engine/types';
import { EventKind } from '@/server/common/logging/constants';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { scheduleAfterResponse } from '@/server/common/schedule-after-response';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import {
  RunBranch,
  RunOperation,
  RunStep,
} from '@/server/runs/constants/run-logging';
import { RunMessage } from '@/server/runs/constants/run-messages';
import { failRun } from '@/server/runs/execution/fail-run';
import { enrichProviderCallData } from '@/server/runs/execution/provider-call-data/enrich-provider-call-data';
import { scoreRun } from '@/server/runs/execution/score-run';
import { storeConversation } from '@/server/runs/execution/store-conversation';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

interface FinishRunCallArgs {
  runId: number;
  event: EndOfCallEvent;
  loadRecording: RecordingLoader;
}

const METRIC_FAILURE_MESSAGE = 'The metric evaluation failed.';

const ignoreLoggedFailure = () => undefined;

const runFinishSelect = {
  id: true,
  status: true,
  resultId: true,
  conversationId: true,
  evaluatorId: true,
  evaluatorSnapshot: true,
  testProfileSnapshot: true,
  result: { select: { projectId: true } },
} satisfies Prisma.RunSelect;

type RunForFinish = Prisma.RunGetPayload<{ select: typeof runFinishSelect }>;

const loadRecordingFile = async (
  url: string | null,
  loadRecording: RecordingLoader,
) => {
  if (!url) return null;
  return loadRecording(url);
};

const failureMessageOf = (call: PlacedCall) => {
  if (call.endedReason === CallEndedReason.error && call.turns.length === 0) {
    return RunMessage.callFailed;
  }
  if (
    call.endedReason === CallEndedReason.no_answer ||
    call.turns.length === 0
  ) {
    return RunMessage.callNotAnswered;
  }
  return null;
};

const evaluate = async (run: RunForFinish) => {
  try {
    const evaluationStatus = await scoreRun({
      projectId: run.result.projectId,
      conversationId: run.conversationId,
      evaluatorId: run.evaluatorId,
      evaluatorSnapshot: run.evaluatorSnapshot,
    });
    return { evaluationStatus, errorMessage: null };
  } catch (error) {
    recordStepFailure(RunStep.scoring, error);
    return {
      evaluationStatus: CallEvaluationStatus.failure,
      errorMessage: METRIC_FAILURE_MESSAGE,
    };
  }
};

const scoreAndComplete = async (run: RunForFinish) => {
  try {
    const outcome = await evaluate(run);
    const { count } = await prisma.run.updateMany({
      where: { id: run.id, status: RunStatus.evaluating },
      data: {
        status: RunStatus.completed,
        evaluationStatus: outcome.evaluationStatus,
        errorMessage: outcome.errorMessage,
      },
    });
    addEventFields({
      run: {
        evaluation_status: outcome.evaluationStatus,
        completed: count > 0,
      },
    });
    await closeResultIfDone(run.resultId);
  } catch (error) {
    recordStepFailure(RunStep.completion, error);
    addEventFields({ outcome: EventOutcome.failure });
  }
};

const scheduleScoring = (run: RunForFinish) =>
  scheduleAfterResponse(() =>
    runWithEvent(
      {
        kind: EventKind.background_task,
        operation: RunOperation.score,
        trigger: TriggerType.programmatic,
        fields: {
          run: { id: run.id },
          result: { id: run.resultId },
          project: { id: run.result.projectId },
          conversation: { id: run.conversationId },
          evaluator: { id: run.evaluatorId },
        },
      },
      () => scoreAndComplete(run),
    ).catch(ignoreLoggedFailure),
  );

export const finishRunCall = async ({
  runId,
  event,
  loadRecording,
}: FinishRunCallArgs) => {
  const run = await prisma.run.findUnique({
    where: { id: runId },
    select: runFinishSelect,
  });
  addEventFields({ run: { id: runId, status: run?.status ?? null } });
  if (run?.status !== RunStatus.in_progress) {
    addEventFields({ run: { branch: RunBranch.not_in_progress } });
    return;
  }
  addEventFields({
    result: { id: run.resultId },
    project: { id: run.result.projectId },
    conversation: { id: run.conversationId },
  });
  const call = await enrichProviderCallData({
    runId,
    event,
    call: toPlacedCall(
      event,
      await loadRecordingFile(event.recording_url, loadRecording),
    ),
  });
  const stored = await storeConversation({
    projectId: run.result.projectId,
    conversationId: run.conversationId,
    runId,
    call,
    dynamicVariables: readTestProfileVariables(run.testProfileSnapshot)
      .mainAgentVariables,
  });
  if (!stored) {
    addEventFields({ run: { branch: RunBranch.not_stored } });
    return;
  }
  const failure = failureMessageOf(call);
  if (failure) {
    const failed = await failRun({ runId, errorMessage: failure });
    addEventFields({ run: { branch: RunBranch.call_not_completed, failed } });
    await closeResultIfDone(run.resultId);
    return;
  }
  addEventFields({ run: { branch: RunBranch.scoring_scheduled } });
  scheduleScoring(run);
};
