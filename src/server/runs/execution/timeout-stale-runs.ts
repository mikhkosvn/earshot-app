import 'server-only';

import { subSeconds } from 'date-fns';

import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  closeResultIfDone,
  finishStaleResult,
} from '@/server/runs/completion/close-result';
import { STALE_RUN_MARGIN_SECONDS } from '@/server/runs/constants/run-limits';
import { RunMessage } from '@/server/runs/constants/run-messages';
import {
  ACTIVE_RUN_STATUSES,
  OPEN_RUN_STATUSES,
} from '@/server/runs/constants/run-status-groups';
import { listRunsInFlight } from '@/server/runs/execution/dispatch-runs';
import { failRun } from '@/server/runs/execution/fail-run';

type StaleCandidate = {
  id: number;
  executedAt: Date | null;
  updatedAt: Date;
  result: { project: { maxCallDuration: number } };
};

const isStale = (run: StaleCandidate, inFlight: Set<number>, now: Date) => {
  if (!inFlight.has(run.id)) return true;
  const startedAt = run.executedAt ?? run.updatedAt;
  const limitSeconds =
    run.result.project.maxCallDuration + STALE_RUN_MARGIN_SECONDS;
  return now.getTime() - startedAt.getTime() > limitSeconds * 1000;
};

const timeoutRuns = async (now: Date) => {
  const cutoff = subSeconds(now, STALE_RUN_MARGIN_SECONDS);
  const candidates = await prisma.run.findMany({
    where: {
      status: { in: ACTIVE_RUN_STATUSES },
      updatedAt: { lt: cutoff },
    },
    select: {
      id: true,
      resultId: true,
      executedAt: true,
      updatedAt: true,
      result: { select: { project: { select: { maxCallDuration: true } } } },
    },
  });
  const inFlight = new Set(listRunsInFlight());
  const stale = candidates.filter((run) => isStale(run, inFlight, now));
  for (const run of stale) {
    await failRun({
      runId: run.id,
      status: RunStatus.timeout,
      errorMessage: RunMessage.runTimedOut,
    });
  }
  return [...new Set(stale.map((run) => run.resultId))];
};

const closeOrphanResults = async (now: Date) => {
  const cutoff = subSeconds(now, STALE_RUN_MARGIN_SECONDS);
  const results = await prisma.result.findMany({
    where: {
      status: { in: [RunStatus.running, RunStatus.evaluating] },
      updatedAt: { lt: cutoff },
      runs: { none: { status: { in: OPEN_RUN_STATUSES } } },
    },
    select: { id: true, status: true },
  });
  for (const result of results) {
    if (result.status === RunStatus.evaluating) {
      await finishStaleResult(result.id);
      continue;
    }
    await closeResultIfDone(result.id);
  }
};

export const timeoutStaleRuns = async () => {
  const now = new Date();
  const resultIds = await timeoutRuns(now);
  for (const resultId of resultIds) await closeResultIfDone(resultId);
  await closeOrphanResults(now);
  return resultIds.length;
};
