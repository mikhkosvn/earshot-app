'use client';

import { Table, TableBody } from '@/components/ui/table';
import type { RunListPage, RunRow } from '@/server/results/types';

import type { RunColumn } from '../../_utils/runs/run-columns';
import { RunTableRow } from './run-table-row';
import { RunsTableEmptyRow } from './runs-table-empty-row';
import { RunsTableHeader } from './runs-table-header';

export type RunSelection = {
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
};

type RunsTableProps = {
  page: RunListPage;
  columns: RunColumn[];
  pageParamKey: string;
  selection?: RunSelection;
  onOpenRun: (run: RunRow) => void;
};

export function RunsTable({
  page,
  columns,
  pageParamKey,
  selection,
  onOpenRun,
}: RunsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <Table className="text-xs">
        <RunsTableHeader
          columns={columns}
          metricColumns={page.metricColumns}
          rows={page.rows}
          pageParamKey={pageParamKey}
          selection={selection}
        />
        <TableBody>
          {page.rows.map((run) => (
            <RunTableRow
              key={run.id}
              run={run}
              columns={columns}
              metricColumns={page.metricColumns}
              selection={selection}
              onOpenRun={onOpenRun}
            />
          ))}
          <RunsTableEmptyRow
            count={page.rows.length}
            columnCount={columns.length + page.metricColumns.length}
          />
        </TableBody>
      </Table>
    </div>
  );
}
