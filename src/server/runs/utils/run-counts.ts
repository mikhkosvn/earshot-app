import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

type CountedRun = {
  status: RunStatus;
  evaluationStatus: CallEvaluationStatus | null;
};

const SUCCESS_EVALUATIONS: CallEvaluationStatus[] = [
  CallEvaluationStatus.success,
  CallEvaluationStatus.reviewed_success,
];

export const isSuccessfulRun = (run: CountedRun) =>
  run.status === RunStatus.completed &&
  run.evaluationStatus !== null &&
  SUCCESS_EVALUATIONS.includes(run.evaluationStatus);

export const isFailedRun = (run: CountedRun) =>
  isTerminalRunStatus(run.status) &&
  run.status !== RunStatus.cancelled &&
  !isSuccessfulRun(run);

export const countRuns = (runs: CountedRun[]) => ({
  total: runs.length,
  finished: runs.filter((run) => isTerminalRunStatus(run.status)).length,
  success: runs.filter(isSuccessfulRun).length,
  failed: runs.filter(isFailedRun).length,
});
