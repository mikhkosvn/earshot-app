import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { analyzeResult } from '@/server/result-analysis/analyze-result';
import { notifyResultCompleted } from '@/server/runs/completion/notify-result-completed';
import { OPEN_RUN_STATUSES } from '@/server/runs/constants/run-status-groups';

const CLOSABLE_RESULT_STATUSES: RunStatus[] = [
  RunStatus.pending,
  RunStatus.in_queue,
  RunStatus.scaling_up,
  RunStatus.running,
  RunStatus.in_progress,
];

interface ClosedRun {
  status: RunStatus;
}

export const finalResultStatus = (runs: ClosedRun[]) => {
  if (runs.some((run) => run.status === RunStatus.completed)) {
    return RunStatus.completed;
  }
  if (runs.every((run) => run.status === RunStatus.cancelled)) {
    return RunStatus.cancelled;
  }
  return RunStatus.failed;
};

const loadFinalStatus = async (resultId: number) => {
  const runs = await prisma.run.findMany({
    where: { resultId },
    select: { status: true },
  });
  return finalResultStatus(runs);
};

const analyzeSafely = async (resultId: number) => {
  try {
    await analyzeResult(resultId);
  } catch (error) {
    console.error(`[runs] The analysis of result ${resultId} failed.`, error);
  }
};

const notifySafely = async (resultId: number) => {
  try {
    await notifyResultCompleted(resultId);
  } catch (error) {
    console.error(
      `[runs] The completion notices of result ${resultId} failed.`,
      error,
    );
  }
};

export const closeResultIfDone = async (resultId: number) => {
  const openRuns = await prisma.run.count({
    where: { resultId, status: { in: OPEN_RUN_STATUSES } },
  });
  if (openRuns > 0) return;
  const { count } = await prisma.result.updateMany({
    where: { id: resultId, status: { in: CLOSABLE_RESULT_STATUSES } },
    data: { status: RunStatus.evaluating },
  });
  if (count === 0) return;
  const status = await loadFinalStatus(resultId);
  if (status !== RunStatus.cancelled) await analyzeSafely(resultId);
  await prisma.result.update({
    where: { id: resultId },
    data: { status, completedAt: new Date() },
  });
  if (status === RunStatus.cancelled) return;
  await notifySafely(resultId);
};

export const finishStaleResult = async (resultId: number) => {
  const status = await loadFinalStatus(resultId);
  await prisma.result.updateMany({
    where: { id: resultId, status: RunStatus.evaluating },
    data: { status, completedAt: new Date() },
  });
};
