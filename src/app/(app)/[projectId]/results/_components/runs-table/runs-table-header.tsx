'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { MetricColumn, RunRow } from '@/server/results/types';

import type { RunColumn } from '../../_utils/runs/run-columns';
import { metricHeaderText } from '../../_utils/runs/run-format';
import { RunColumnHead } from './header/run-column-head';
import type { RunSelection } from './runs-table';

interface RunsTableHeaderProps {
  columns: readonly RunColumn[];
  metricColumns: readonly MetricColumn[];
  rows: readonly RunRow[];
  pageParamKey: string;
  selection?: RunSelection;
}

export function RunsTableHeader({
  columns,
  metricColumns,
  rows,
  pageParamKey,
  selection,
}: RunsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50">
        {columns.map((column) => (
          <RunColumnHead
            key={column}
            column={column}
            rows={rows}
            pageParamKey={pageParamKey}
            selection={selection}
          />
        ))}
        {metricColumns.map((metric) => (
          <TableHead key={metric.id} className="whitespace-nowrap">
            {metricHeaderText(metric)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
