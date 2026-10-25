import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type { MetricColumn, RunMetricCell } from '@/server/results/types';

import {
  fixedNumberText,
  isLatencyColumn,
  isPercentColumn,
  latencyText,
} from '../../../_utils/runs/run-format';
import { RunMetricPercent } from './run-metric-percent';

interface RunMetricValueProps {
  column: MetricColumn;
  cell: RunMetricCell | undefined;
}

export function RunMetricValue({ column, cell }: RunMetricValueProps) {
  if (!cell) return null;
  if (isLatencyColumn(column) && typeof cell.value === 'number') {
    return <span>{latencyText(cell)}</span>;
  }
  if (cell.value === null) {
    return (
      <Badge variant="secondary" className="text-[10px]">
        NONE
      </Badge>
    );
  }
  if (cell.value === true) {
    return (
      <CircleCheckIcon
        aria-label="Passed"
        className="size-4 text-emerald-600"
      />
    );
  }
  if (cell.value === false) {
    return <CircleXIcon aria-label="Failed" className="size-4 text-red-600" />;
  }
  if (typeof cell.value === 'string') {
    return <span className="block max-w-40 truncate">{cell.value}</span>;
  }
  if (isPercentColumn(column)) {
    return <RunMetricPercent name={column.name} value={cell.value} />;
  }
  return <span>{fixedNumberText(cell.value)}</span>;
}
