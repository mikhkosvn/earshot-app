'use client';

import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import type { RunDetail } from '@/server/results/types';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

import {
  EvaluationStatusMenu,
  REVIEW_EVALUATION_OPTIONS,
} from '../../../../_components/runs-table/evaluation/evaluation-status-menu';

type RunDetailStatusProps = {
  run: RunDetail;
};

export function RunDetailStatus({ run }: RunDetailStatusProps) {
  if (!isTerminalRunStatus(run.status)) {
    return <span className="text-xs text-muted-foreground">In Progress</span>;
  }
  if (!run.evaluationStatus) {
    return (
      <span className="text-xs text-muted-foreground">
        {RunStatusLabel[run.status]}
      </span>
    );
  }
  return (
    <EvaluationStatusMenu
      runId={run.id}
      evaluationStatus={run.evaluationStatus}
      options={REVIEW_EVALUATION_OPTIONS}
    />
  );
}
