'use client';

import { TableHead } from '@/components/ui/table';
import type { RunRow } from '@/server/results/types';

import {
  RUN_COLUMN_LABEL,
  RunColumn,
  runColumnSortField,
} from '../../../_utils/runs/run-columns';
import type { RunSelection } from '../runs-table';
import { RunColumnLabel } from './run-column-label';
import { SelectPageRunsCheckbox } from './select-page-runs-checkbox';

interface RunColumnHeadProps {
  column: RunColumn;
  rows: readonly RunRow[];
  pageParamKey: string;
  selection?: RunSelection;
}

export function RunColumnHead({
  column,
  rows,
  pageParamKey,
  selection,
}: RunColumnHeadProps) {
  if (column === RunColumn.menu) return <TableHead className="w-8" />;

  return (
    <TableHead className="whitespace-nowrap">
      <div className="flex items-center gap-2">
        <SelectPageRunsCheckbox
          column={column}
          rows={rows}
          selection={selection}
        />
        <RunColumnLabel
          label={RUN_COLUMN_LABEL[column]}
          sortField={runColumnSortField(column)}
          pageParamKey={pageParamKey}
        />
      </div>
    </TableHead>
  );
}
