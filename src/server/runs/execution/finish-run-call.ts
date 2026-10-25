import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { CallEndedReason } from '@/server/call-engine/constants';
import { toPlacedCall } from '@/server/call-engine/events/to-placed-call';
import type {
  EndOfCallEvent,
  PlacedCall,
  RecordingLoader,
} from '@/server/call-engine/types';
import { scheduleAfterResponse } from '@/server/common/schedule-after-response';
import { closeResultIfDone } from '@/server/runs/completion/close-result';
import { RunMessage } from '@/server/runs/constants/run-messages';
import { failRun } from '@/server/runs/execution/fail-run';
import { scoreRun } from '@/server/runs/execution/score-run';
import { storeConversation } from '@/server/runs/execution/store-conversation';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

interface FinishRunCallArgs {
  runId: number;
  event: EndOfCallEvent;
  loadRecording: RecordingLoader;
}

const METRIC_FAILURE_MESSAGE = 'The metric evaluation failed.';

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
    console.error(`[runs] The scoring of run ${run.id} failed.`, error);
    return {
      evaluationStatus: CallEvaluationStatus.failure,
      errorMessage: METRIC_FAILURE_MESSAGE,
    };
  }
};

const scoreAndComplete = async (run: RunForFinish) => {
  try {
    const outcome = await evaluate(run);
    await prisma.run.updateMany({
      where: { id: run.id, status: RunStatus.evaluating },
      data: {
        status: RunStatus.completed,
        evaluationStatus: outcome.evaluationStatus,
        errorMessage: outcome.errorMessage,
      },
    });
    await closeResultIfDone(run.resultId);
  } catch (error) {
    console.error(`[runs] The completion of run ${run.id} failed.`, error);
  }
};

export const finishRunCall = async ({
  runId,
  event,
  loadRecording,
}: FinishRunCallArgs) => {
  const run = await prisma.run.findUnique({
    where: { id: runId },
    select: runFinishSelect,
  });
  if (run?.status !== RunStatus.in_progress) return;
  const call = toPlacedCall(
    event,
    await loadRecordingFile(event.recording_url, loadRecording),
  );
  const stored = await storeConversation({
    projectId: run.result.projectId,
    conversationId: run.conversationId,
    runId,
    call,
    dynamicVariables: readTestProfileVariables(run.testProfileSnapshot)
      .mainAgentVariables,
  });
  if (!stored) return;
  const failure = failureMessageOf(call);
  if (failure) {
    await failRun({ runId, errorMessage: failure });
    await closeResultIfDone(run.resultId);
    return;
  }
  scheduleAfterResponse(() => scoreAndComplete(run));
};
