import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { TriggerType } from '@/lib/logging/constants';
import { prisma } from '@/lib/prisma';
import { EventKind } from '@/server/common/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { RUN_DISPATCH_INTERVAL_MS } from '@/server/runs/constants/run-limits';
import { RunOperation } from '@/server/runs/constants/run-logging';
import { ACTIVE_RUN_STATUSES } from '@/server/runs/constants/run-status-groups';
import { executeRun } from '@/server/runs/execution/execute-run';
import { claimRows } from '@/server/worker/claim-rows';

interface QueuedResult {
  id: number;
  concurrencyLimit: number | null;
  callsPerSecond: number | null;
  organizationId: number;
  maxConcurrentRuns: number;
  activeRuns: number;
}

const loadQueuedResults = async (): Promise<QueuedResult[]> => {
  const rows = await prisma.result.findMany({
    where: {
      status: RunStatus.running,
      runs: { some: { status: RunStatus.in_queue } },
    },
    orderBy: [
      { createdAt: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: {
      id: true,
      concurrencyLimit: true,
      callsPerSecond: true,
      project: {
        select: {
          organizationId: true,
          organization: { select: { maxConcurrentRuns: true } },
        },
      },
      _count: {
        select: { runs: { where: { status: { in: ACTIVE_RUN_STATUSES } } } },
      },
    },
  });
  return rows.map((row) => ({
    id: row.id,
    concurrencyLimit: row.concurrencyLimit,
    callsPerSecond: row.callsPerSecond,
    organizationId: row.project.organizationId,
    maxConcurrentRuns: row.project.organization.maxConcurrentRuns,
    activeRuns: row._count.runs,
  }));
};

const organizationCapacity = async (results: QueuedResult[]) => {
  const capacity = new Map<number, number>();
  for (const result of results) {
    if (capacity.has(result.organizationId)) continue;
    const active = await prisma.run.count({
      where: {
        status: { in: ACTIVE_RUN_STATUSES },
        result: { project: { organizationId: result.organizationId } },
      },
    });
    capacity.set(
      result.organizationId,
      Math.max(0, result.maxConcurrentRuns - active),
    );
  }
  return capacity;
};

const rateAllowance = async (result: QueuedResult) => {
  const rate = result.callsPerSecond;
  if (rate === null || rate <= 0) return Number.POSITIVE_INFINITY;
  const perTick = Math.floor((rate * RUN_DISPATCH_INTERVAL_MS) / 1000);
  if (perTick >= 1) return perTick;
  const last = await prisma.run.findFirst({
    where: { resultId: result.id, executedAt: { not: null } },
    orderBy: { executedAt: Prisma.SortOrder.desc },
    select: { executedAt: true },
  });
  if (!last?.executedAt) return 1;
  const elapsedMs = Date.now() - last.executedAt.getTime();
  if (elapsedMs >= 1000 / rate) return 1;
  return 0;
};

const resultCapacity = (result: QueuedResult) => {
  const limit = result.concurrencyLimit ?? result.maxConcurrentRuns;
  return Math.max(0, limit - result.activeRuns);
};

const claimQueuedRuns = (resultId: number, limit: number) =>
  claimRows<number>({
    table: 'Run',
    where: Prisma.sql`"resultId" = ${resultId} AND "status" = ${RunStatus.in_queue}::"RunStatus"`,
    orderBy: Prisma.sql`"id"`,
    limit,
    claim: async (tx, ids) => {
      await tx.run.updateMany({
        where: { id: { in: ids } },
        data: { status: RunStatus.in_progress, executedAt: new Date() },
      });
    },
  });

const ignoreLoggedFailure = () => undefined;

const launchRun = (result: QueuedResult, runId: number) => {
  void runWithEvent(
    {
      kind: EventKind.background_task,
      operation: RunOperation.execute,
      trigger: TriggerType.programmatic,
      fields: {
        run: { id: runId },
        result: { id: result.id },
        organization: { id: result.organizationId },
      },
    },
    () => executeRun(runId),
  ).catch(ignoreLoggedFailure);
};

export const dispatchRuns = async () => {
  const results = await loadQueuedResults();
  addEventFields({ dispatch: { queued_results: results.length } });
  if (results.length === 0) return [];
  const capacity = await organizationCapacity(results);
  const launched: number[] = [];
  for (const result of results) {
    const available = capacity.get(result.organizationId) ?? 0;
    if (available <= 0) continue;
    const limit = Math.min(
      available,
      resultCapacity(result),
      await rateAllowance(result),
    );
    if (limit <= 0) continue;
    const runIds = await claimQueuedRuns(result.id, limit);
    capacity.set(result.organizationId, available - runIds.length);
    runIds.forEach((runId) => launchRun(result, runId));
    launched.push(...runIds);
  }
  addEventFields({
    dispatch: { claimed_runs: launched.length, run_ids: launched },
  });
  return launched;
};
