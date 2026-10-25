import { RunStatus } from '@/generated/prisma/enums';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import type { RunBatchStatus, RunBatchStatusRun } from '@/server/runs/types';

const QUEUED: RunStatus[] = [RunStatus.pending, RunStatus.in_queue];

export const runOutcomeText = (run: RunBatchStatusRun) => {
  if (run.status === RunStatus.completed && run.evaluationStatus) {
    return CallEvaluationStatusLabel[run.evaluationStatus];
  }
  return RunStatusLabel[run.status];
};

export const queuedRunCount = (status: RunBatchStatus) =>
  status.runs.filter((run) => QUEUED.includes(run.status)).length;

export const batchProgressText = (status: RunBatchStatus) =>
  `${status.finishedRuns} of ${status.totalRuns} runs finished · ${status.successRuns} passed · ${status.failedRuns} failed`;

export const batchProgressPercent = (status: RunBatchStatus) => {
  if (status.totalRuns === 0) return 0;
  return Math.round((status.finishedRuns / status.totalRuns) * 100);
};
