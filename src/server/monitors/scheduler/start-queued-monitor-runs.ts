import 'server-only';

import { MonitorRunStatus, ResultSource } from '@/generated/prisma/enums';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';
import { MONITOR_RUN_START_FAILED } from '@/server/monitors/constants/monitor-messages';
import { MONITOR_CLAIM_LIMIT } from '@/server/monitors/constants/monitor-scheduler';
import { MonitorRunOutcome } from '@/server/monitors/constants/monitor-run-outcome';
import { notifyMonitorRun } from '@/server/monitors/scheduler/notify-monitor-run';
import { createRunBatch } from '@/server/runs/create-run-batch';
import { claimRows } from '@/server/worker/claim-rows';

const startErrorMessage = (error: unknown) => {
  if (error instanceof ActionError) return error.message;
  return MONITOR_RUN_START_FAILED;
};

const loadMonitorRun = (monitorRunId: number) =>
  prisma.monitorRun.findUniqueOrThrow({
    where: { id: monitorRunId },
    select: {
      id: true,
      monitor: {
        select: {
          projectId: true,
          agentId: true,
          name: true,
          frequency: true,
          concurrencyLimit: true,
          callsPerSecond: true,
          callerNumberMode: true,
          agentNumber: true,
          createdById: true,
          evaluators: { select: { evaluatorId: true } },
          personalities: { select: { personalityId: true } },
        },
      },
    },
  });

const failMonitorRun = async (monitorRunId: number, error: unknown) => {
  if (!(error instanceof ActionError)) {
    console.error(
      `[monitors] Monitor run ${monitorRunId} did not start.`,
      error,
    );
  }
  const errorMessage = startErrorMessage(error);
  await prisma.monitorRun.update({
    where: { id: monitorRunId },
    data: {
      status: MonitorRunStatus.failed,
      errorMessage,
      finishedAt: new Date(),
    },
  });
  await notifyMonitorRun({
    monitorRunId,
    outcome: MonitorRunOutcome.failure,
    detail: `The run did not start: ${errorMessage}`,
  });
};

const startMonitorRun = async (monitorRunId: number) => {
  try {
    const { monitor } = await loadMonitorRun(monitorRunId);
    await createRunBatch({
      projectId: monitor.projectId,
      createdById: monitor.createdById,
      agentId: monitor.agentId,
      evaluatorIds: monitor.evaluators.map((item) => item.evaluatorId),
      personalityIds: monitor.personalities.map((item) => item.personalityId),
      frequency: monitor.frequency,
      source: ResultSource.schedule,
      name: monitor.name,
      callsPerSecond: monitor.callsPerSecond,
      concurrencyLimit: monitor.concurrencyLimit,
      callerNumberMode: monitor.callerNumberMode,
      agentNumber: monitor.agentNumber,
      monitorRunId,
    });
  } catch (error) {
    await failMonitorRun(monitorRunId, error);
  }
};

export const startQueuedMonitorRuns = async () => {
  const ids = await claimRows<number>({
    table: 'MonitorRun',
    where: Prisma.sql`"status" = 'queued' AND "resultId" IS NULL`,
    orderBy: Prisma.sql`"scheduledFor"`,
    limit: MONITOR_CLAIM_LIMIT,
    claim: async (tx, claimed) => {
      await tx.monitorRun.updateMany({
        where: { id: { in: claimed } },
        data: { status: MonitorRunStatus.running, startedAt: new Date() },
      });
    },
  });
  for (const id of ids) await startMonitorRun(id);
};
