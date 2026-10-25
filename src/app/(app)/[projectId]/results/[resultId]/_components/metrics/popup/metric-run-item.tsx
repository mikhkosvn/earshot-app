'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TileRun } from '@/server/results/types';

import { EMPTY_VALUE } from '../../../_constants/result-detail';
import { useResultRunRef } from '../../../_hooks/use-result-run-ref';
import { runTimeText } from '../../../_utils/date-format';
import { MetricRunScore } from './metric-run-score';

type MetricRunItemProps = {
  run: TileRun;
  onOpenRun: (runId: number) => void;
};

export function MetricRunItem({ run, onOpenRun }: MetricRunItemProps) {
  const runRef = useResultRunRef(run.runId);
  if (!runRef) return null;

  return (
    <Button
      variant="unstyled"
      size="unstyled"
      className="flex flex-col items-stretch gap-2 rounded-lg border border-border p-3 text-left font-normal whitespace-normal hover:bg-muted/60"
      onClick={() => onOpenRun(run.runId)}
    >
      <span className="flex items-center justify-between gap-2">
        <Badge variant="outline">{runTimeText(runRef.startedAt)}</Badge>
        <Badge variant="outline">{runRef.personalityName ?? EMPTY_VALUE}</Badge>
      </span>
      <span className="text-sm">
        <span className="text-muted-foreground">Scenario: </span>
        <span className="font-medium">{runRef.evaluatorName}</span>
      </span>
      <MetricRunScore run={run} />
    </Button>
  );
}
