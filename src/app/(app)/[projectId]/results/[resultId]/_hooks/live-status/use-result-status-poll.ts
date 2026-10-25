'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import type { ResultStatusView } from '@/server/results/types';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

import { useResultId } from '../../../_hooks/use-result-id';
import { ResultService } from '../../../_service';
import { RESULT_STATUS_POLL_MS } from '../../_constants/result-detail';

const pollInterval = (status: ResultStatusView | undefined) => {
  if (!status) return false;
  if (isTerminalRunStatus(status.status)) return false;
  return RESULT_STATUS_POLL_MS;
};

export const useResultStatusPoll = () => {
  const resultId = useResultId();
  const { data } = useSuspenseQuery({
    ...ResultService.getStatusQuery({ resultId }),
    refetchInterval: (query) => pollInterval(query.state.data),
  });
  return data;
};
