import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

import type {
  CallMetricCell,
  CallMetricColumn,
} from '@/server/call-logs/types';

import { metricCellText } from '../../../_utils/call-format';

type CallMetricValueProps = {
  column: CallMetricColumn;
  cell: CallMetricCell | undefined;
};

export function CallMetricValue({ column, cell }: CallMetricValueProps) {
  if (!cell) return null;
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
  return <span>{metricCellText(cell, column)}</span>;
}
