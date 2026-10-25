'use client';

import { useResultDetail } from './use-result-detail';

export const useResultRunRef = (runId: number) => {
  const result = useResultDetail();
  return result.runIndex.find((run) => run.runId === runId) ?? null;
};
