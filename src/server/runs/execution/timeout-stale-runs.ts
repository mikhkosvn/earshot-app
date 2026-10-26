import 'server-only';

import { subSeconds } from 'date-fns';

import { RunStatus } from '@/generated/prisma/enums';
import { EventOutcome } from '@/lib/logging/constants';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
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
import { failRun } from '@/server/runs/execution/fail-run';

interface StaleCandidate {
  id: number;
  executedAt: Date | null;
  updatedAt: Date;
  result: { project: { maxCallDuration: number } };
}

const isStale = (run: StaleCandidate, now: Date) => {
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
  const stale = candidates.filter((run) => isStale(run, now));
  for (const run of stale) {
    await failRun({
      runId: run.id,
      status: RunStatus.timeout,
      errorMessage: RunMessage.runTimedOut,
    });
  }
  const resultIds = [...new Set(stale.map((run) => run.resultId))];
  addEventFields({
    timeout: {
      candidate_runs: candidates.length,
      stale_runs: stale.length,
      stale_run_ids: stale.map((run) => run.id),
      timed_out_result_ids: resultIds,
    },
  });
  return resultIds;
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
  addEventFields({
    timeout: {
      orphan_results: results.length,
      orphan_result_ids: results.map((result) => result.id),
    },
  });
  return results.length;
};

export const timeoutStaleRuns = async () => {
  const now = new Date();
  const resultIds = await timeoutRuns(now);
  for (const resultId of resultIds) await closeResultIfDone(resultId);
  const orphanResults = await closeOrphanResults(now);
  if (resultIds.length === 0 && orphanResults === 0) {
    addEventFields({ outcome: EventOutcome.skipped });
  }
  return resultIds.length;
};
