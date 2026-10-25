'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';

import { RunDialogService } from '../_service';
import {
  batchProgressPercent,
  batchProgressText,
} from '../_utils/run-status-text';
import { RunStatusRow } from './run-status-row';

type RunStatusProgressProps = {
  resultId: number;
};

export function RunStatusProgress({ resultId }: RunStatusProgressProps) {
  const { data: status } = useSuspenseQuery(
    RunDialogService.getBatchStatusQuery({ resultId }),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span>{batchProgressText(status)}</span>
        <Badge variant="secondary">{RunStatusLabel[status.status]}</Badge>
      </div>
      <Progress
        value={batchProgressPercent(status)}
        aria-label="Run progress"
      />
      <ul
        aria-label="Runs"
        className="max-h-64 divide-y overflow-y-auto rounded-lg border px-3"
      >
        {status.runs.map((run) => (
          <RunStatusRow key={run.id} run={run} />
        ))}
      </ul>
    </div>
  );
}
