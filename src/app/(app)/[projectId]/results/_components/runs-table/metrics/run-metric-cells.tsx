import { TableCell } from '@/components/ui/table';
import type { MetricColumn, RunRow } from '@/server/results/types';

import { RunMetricValue } from './run-metric-value';

interface RunMetricCellsProps {
  run: RunRow;
  metricColumns: readonly MetricColumn[];
}

export function RunMetricCells({ run, metricColumns }: RunMetricCellsProps) {
  return metricColumns.map((column) => (
    <TableCell key={column.id} className="whitespace-nowrap tabular-nums">
      <RunMetricValue column={column} cell={run.metrics[column.id]} />
    </TableCell>
  ));
}
