'use client';

import { TableCell } from '@/components/ui/table';
import type { CallMetricCell } from '@/server/call-logs/types';

import { useMetricColumnsQuery } from '../../../_hooks/call-list/use-metric-columns-query';
import { CallMetricValue } from './call-metric-value';

type CallMetricCellsProps = {
  metrics: CallMetricCell[];
};

export function CallMetricCells({ metrics }: CallMetricCellsProps) {
  const { data: columns } = useMetricColumnsQuery();

  return columns.map((column) => (
    <TableCell key={column.id} className="whitespace-nowrap">
      <CallMetricValue
        column={column}
        cell={metrics.find((metric) => metric.metricId === column.id)}
      />
    </TableCell>
  ));
}
