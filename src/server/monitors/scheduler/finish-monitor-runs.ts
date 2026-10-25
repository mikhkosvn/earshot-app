import 'server-only';

import { MonitorRunStatus, RunStatus } from '@/generated/prisma/enums';
import { Prisma } from '@/generated/prisma/client';
import { MONITOR_CLAIM_LIMIT } from '@/server/monitors/constants/monitor-scheduler';
import { MonitorRunOutcome } from '@/server/monitors/constants/monitor-run-outcome';
import { notifyMonitorRun } from '@/server/monitors/scheduler/notify-monitor-run';
import { countRuns } from '@/server/runs/utils/run-counts';
import { claimRows } from '@/server/worker/claim-rows';

const FINISHED_RESULT_STATUSES: RunStatus[] = [
  RunStatus.completed,
  RunStatus.failed,
  RunStatus.timeout,
  RunStatus.cancelled,
];

interface FinishedRun {
  id: number;
  status: MonitorRunStatus;
  outcome: MonitorRunOutcome | null;
  detail: string;
}

interface ResultSummary {
  status: RunStatus;
  runs: Parameters<typeof countRuns>[0];
}

const summarize = (result: ResultSummary) => {
  const counts = countRuns(result.runs);
  const detail = `${counts.success} of ${counts.total} runs passed.`;
  if (result.status === RunStatus.cancelled) {
    return {
      status: MonitorRunStatus.skipped,
      outcome: null,
      detail: 'The result was cancelled.',
    };
  }
  if (
    result.status === RunStatus.completed &&
    counts.failed === 0 &&
    counts.total > 0
  ) {
    return {
      status: MonitorRunStatus.completed,
      outcome: MonitorRunOutcome.success,
      detail,
    };
  }
  return {
    status: MonitorRunStatus.failed,
    outcome: MonitorRunOutcome.failure,
    detail,
  };
};

const finishMonitorRun = async (
  tx: Prisma.TransactionClient,
  monitorRunId: number,
): Promise<FinishedRun> => {
  const run = await tx.monitorRun.findUniqueOrThrow({
    where: { id: monitorRunId },
    select: {
      result: {
        select: {
          status: true,
          completedAt: true,
          runs: { select: { status: true, evaluationStatus: true } },
        },
      },
    },
  });
  if (!run.result) {
    return {
      id: monitorRunId,
      status: MonitorRunStatus.failed,
      outcome: null,
      detail: '',
    };
  }
  const summary = summarize(run.result);
  await tx.monitorRun.update({
    where: { id: monitorRunId },
    data: {
      status: summary.status,
      finishedAt: run.result.completedAt ?? new Date(),
    },
  });
  return { id: monitorRunId, ...summary };
};

export const finishMonitorRuns = async () => {
  const finished: FinishedRun[] = [];
  await claimRows<number>({
    table: 'MonitorRun',
    where: Prisma.sql`"status" = 'running' AND "resultId" IN (
      SELECT "id" FROM "Result"
      WHERE "status"::text IN (${Prisma.join(FINISHED_RESULT_STATUSES)})
    )`,
    limit: MONITOR_CLAIM_LIMIT,
    claim: async (tx, ids) => {
      for (const id of ids) finished.push(await finishMonitorRun(tx, id));
    },
  });
  for (const run of finished) {
    if (!run.outcome) continue;
    await notifyMonitorRun({
      monitorRunId: run.id,
      outcome: run.outcome,
      detail: run.detail,
    });
  }
};
