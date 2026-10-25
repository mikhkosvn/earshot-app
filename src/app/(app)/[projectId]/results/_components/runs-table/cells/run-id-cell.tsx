'use client';

import type { RunSelection } from '../runs-table';
import { RunSelectCheckbox } from './run-select-checkbox';

type RunIdCellProps = {
  runId: number;
  selection?: RunSelection;
};

export function RunIdCell({ runId, selection }: RunIdCellProps) {
  return (
    <div className="flex items-center gap-2">
      <RunSelectCheckbox runId={runId} selection={selection} />
      <span className="font-semibold tabular-nums">{runId}</span>
    </div>
  );
}
