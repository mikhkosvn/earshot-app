'use client';

import { RunDetailBody } from './run-detail-body';

interface RunDetailContentProps {
  runId: number | null;
}

export function RunDetailContent({ runId }: RunDetailContentProps) {
  if (runId === null) return null;
  return <RunDetailBody runId={runId} />;
}
