'use client';

import { RelativeTime } from '@/components/common/relative-time';

import { useLab } from '../../_hooks/lab/use-lab';
import { runSummaryText } from '../../_utils/run-summary-text';

export function LabRunSummary() {
  const { run } = useLab();

  if (!run) return null;

  return (
    <p
      role="status"
      className="flex flex-wrap items-center gap-1.5 rounded-md border bg-muted/40 px-3 py-2 text-sm"
    >
      <span>{runSummaryText(run)}</span>
      <span className="text-xs text-muted-foreground">
        <RelativeTime date={run.createdAt} />
      </span>
    </p>
  );
}
