'use client';

import type { TileRun } from '@/server/results/types';

import { MetricRunItem } from './metric-run-item';

type MetricRunListProps = {
  runs: TileRun[];
  onOpenRun: (runId: number) => void;
};

export function MetricRunList({ runs, onOpenRun }: MetricRunListProps) {
  if (runs.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No runs in this group.
      </p>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {runs.map((run) => (
        <MetricRunItem key={run.runId} run={run} onOpenRun={onOpenRun} />
      ))}
    </div>
  );
}
