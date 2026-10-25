import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { SCHEDULE_CLAIM_LIMIT } from '@/server/metric-optimizer/constants/optimizer-limits';
import { metricsWithNewLabRows } from '@/server/metric-optimizer/scheduler/metrics-with-new-lab-rows';
import { queueOptimization } from '@/server/metric-optimizer/utils/queue-optimization';
import { computeNextRunAt } from '@/server/monitors/utils/compute-next-run-at';
import { claimRows } from '@/server/worker/claim-rows';

interface ClaimedSchedule {
  id: number;
  name: string;
  projectId: number;
}

export interface ScheduleRunResult {
  scheduleId: number;
  sessionIds: number[];
}

const laterOf = (left: Date, right: Date) => {
  if (left.getTime() > right.getTime()) return left;
  return right;
};

const claimSchedule = async (
  tx: Prisma.TransactionClient,
  scheduleId: number,
  now: Date,
): Promise<ClaimedSchedule> => {
  const schedule = await tx.metricOptimizerSchedule.findUniqueOrThrow({
    where: { id: scheduleId },
    select: {
      id: true,
      name: true,
      projectId: true,
      cronExpression: true,
      timezone: true,
      nextRunAt: true,
    },
  });
  await tx.metricOptimizerSchedule.update({
    where: { id: scheduleId },
    data: {
      nextRunAt: computeNextRunAt(
        schedule.cronExpression,
        schedule.timezone,
        laterOf(schedule.nextRunAt ?? now, now),
      ),
    },
  });
  return {
    id: schedule.id,
    name: schedule.name,
    projectId: schedule.projectId,
  };
};

const optimizeMetric = async (schedule: ClaimedSchedule, metricId: number) => {
  try {
    const queued = await queueOptimization({
      metricId,
      userId: null,
      draft: null,
      schedule,
    });
    return [queued.sessionId];
  } catch (error) {
    console.error(
      `[metric-optimizer] The schedule ${schedule.id} did not start an optimisation of metric ${metricId}.`,
      error,
    );
    return [];
  }
};

const runSchedule = async (
  schedule: ClaimedSchedule,
): Promise<ScheduleRunResult> => {
  const metricIds = await metricsWithNewLabRows(schedule.projectId);
  const sessionIds: number[] = [];
  for (const metricId of metricIds) {
    sessionIds.push(...(await optimizeMetric(schedule, metricId)));
  }
  return { scheduleId: schedule.id, sessionIds };
};

export const runDueOptimizerSchedules = async (now = new Date()) => {
  const claimed: ClaimedSchedule[] = [];
  await claimRows<number>({
    table: 'MetricOptimizerSchedule',
    where: Prisma.sql`"isActive" = true AND "nextRunAt" <= ${now}`,
    orderBy: Prisma.sql`"nextRunAt"`,
    limit: SCHEDULE_CLAIM_LIMIT,
    claim: async (tx, ids) => {
      for (const id of ids) claimed.push(await claimSchedule(tx, id, now));
    },
  });
  const results: ScheduleRunResult[] = [];
  for (const schedule of claimed) results.push(await runSchedule(schedule));
  return results;
};
