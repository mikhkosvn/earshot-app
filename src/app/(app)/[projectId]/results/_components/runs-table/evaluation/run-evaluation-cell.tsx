'use client';

import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import type { RunRow } from '@/server/results/types';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

import {
  ALL_EVALUATION_OPTIONS,
  EvaluationStatusMenu,
} from './evaluation-status-menu';

type RunEvaluationCellProps = {
  run: RunRow;
};

export function RunEvaluationCell({ run }: RunEvaluationCellProps) {
  if (!isTerminalRunStatus(run.status)) {
    return <span className="whitespace-nowrap">In Progress</span>;
  }
  if (!run.evaluationStatus) {
    return (
      <span className="whitespace-nowrap text-muted-foreground">
        {RunStatusLabel[run.status]}
      </span>
    );
  }
  return (
    <EvaluationStatusMenu
      runId={run.id}
      evaluationStatus={run.evaluationStatus}
      options={ALL_EVALUATION_OPTIONS}
    />
  );
}
