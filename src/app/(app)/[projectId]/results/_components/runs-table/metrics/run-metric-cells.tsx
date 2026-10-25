import { TableCell } from '@/components/ui/table';
import type { MetricColumn, RunRow } from '@/server/results/types';

import { RunMetricValue } from './run-metric-value';

type RunMetricCellsProps = {
  run: RunRow;
  metricColumns: MetricColumn[];
};

export function RunMetricCells({ run, metricColumns }: RunMetricCellsProps) {
  return metricColumns.map((column) => (
    <TableCell key={column.id} className="whitespace-nowrap tabular-nums">
      <RunMetricValue column={column} cell={run.metrics[column.id]} />
    </TableCell>
  ));
}
