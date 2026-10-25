'use client';

import { useRunDetailQuery } from '../../../../_hooks/runs/use-run-detail-query';
import { RunRubricCard } from '../rubric/run-rubric-card';
import { RunDetailChips } from './run-detail-chips';
import { RunDetailStatus } from './run-detail-status';
import { RunFeedbackRow } from './run-feedback-row';
import { RunTitleRow } from './run-title-row';

type RunDetailHeaderProps = {
  runId: number;
};

export function RunDetailHeader({ runId }: RunDetailHeaderProps) {
  const { data: run } = useRunDetailQuery(runId);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 border-b pb-3">
        <RunTitleRow run={run} />
        <RunDetailChips run={run} />
        <div>
          <RunDetailStatus run={run} />
        </div>
      </div>
      <RunFeedbackRow
        key={run.feedback ?? ''}
        runId={run.id}
        feedback={run.feedback}
      />
      <RunRubricCard rubric={run.rubric} />
    </div>
  );
}
