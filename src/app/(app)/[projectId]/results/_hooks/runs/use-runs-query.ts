'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { OPEN_RUN_STATUSES } from '@/server/runs/constants/run-status-groups';
import type { ListRunsInput, RunListPage } from '@/server/results/types';

import { ResultService } from '../../_service';

const RUNS_POLL_INTERVAL_MS = 3000;

const pollInterval = (page: RunListPage | undefined) => {
  if (!page) return false;
  if (page.rows.some((row) => OPEN_RUN_STATUSES.includes(row.status))) {
    return RUNS_POLL_INTERVAL_MS;
  }
  return false;
};

export const useRunsQuery = (args: ListRunsInput) =>
  useSuspenseQuery({
    ...ResultService.getRunsQuery(args),
    refetchInterval: (query) => pollInterval(query.state.data),
  });
