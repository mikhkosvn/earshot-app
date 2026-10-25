'use client';

import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

import { useResultDetail } from './use-result-detail';

export const useIsResultOpen = () => {
  const result = useResultDetail();
  return !isTerminalRunStatus(result.status);
};
