import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { MONITOR_CLAIM_LIMIT } from '@/server/monitors/constants/monitor-scheduler';
import { computeNextRunAt } from '@/server/monitors/utils/compute-next-run-at';
import { claimRows } from '@/server/worker/claim-rows';

const laterOf = (left: Date, right: Date) => {
  if (left.getTime() > right.getTime()) return left;
  return right;
};

const queueMonitor = async (
  tx: Prisma.TransactionClient,
  monitorId: number,
  now: Date,
) => {
  const monitor = await tx.monitor.findUniqueOrThrow({
    where: { id: monitorId },
    select: { cronExpression: true, timezone: true, nextRunAt: true },
  });
  if (!monitor.nextRunAt) return;
  await tx.monitorRun.createMany({
    data: [{ monitorId, scheduledFor: monitor.nextRunAt }],
    skipDuplicates: true,
  });
  await tx.monitor.update({
    where: { id: monitorId },
    data: {
      nextRunAt: computeNextRunAt(
        monitor.cronExpression,
        monitor.timezone,
        laterOf(monitor.nextRunAt, now),
      ),
    },
  });
};

export const queueDueMonitors = async () => {
  const now = new Date();
  return claimRows<number>({
    table: 'Monitor',
    where: Prisma.sql`"isActive" = true AND "nextRunAt" <= ${now}`,
    orderBy: Prisma.sql`"nextRunAt"`,
    limit: MONITOR_CLAIM_LIMIT,
    claim: async (tx, ids) => {
      for (const id of ids) await queueMonitor(tx, id, now);
    },
  });
};
