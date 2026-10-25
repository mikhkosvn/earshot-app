'use client';

import { TableRow } from '@/components/ui/table';
import type { MetricColumn, RunRow } from '@/server/results/types';

import type { RunColumn } from '../../_utils/runs/run-columns';
import { RunColumnCell } from './cells/run-column-cell';
import { RunMetricCells } from './metrics/run-metric-cells';
import type { RunSelection } from './runs-table';

type RunTableRowProps = {
  run: RunRow;
  columns: RunColumn[];
  metricColumns: MetricColumn[];
  selection?: RunSelection;
  onOpenRun: (run: RunRow) => void;
};

export function RunTableRow({
  run,
  columns,
  metricColumns,
  selection,
  onOpenRun,
}: RunTableRowProps) {
  const selected = selection?.selectedIds.includes(run.id) ?? false;

  return (
    <TableRow
      data-state={selected && 'selected'}
      className="cursor-pointer"
      onClick={() => onOpenRun(run)}
    >
      {columns.map((column) => (
        <RunColumnCell
          key={column}
          column={column}
          run={run}
          selection={selection}
          onOpenRun={onOpenRun}
        />
      ))}
      <RunMetricCells run={run} metricColumns={metricColumns} />
    </TableRow>
  );
}
