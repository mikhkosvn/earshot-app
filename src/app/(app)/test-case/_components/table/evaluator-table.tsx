'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTable } from '@tanstack/react-table';

import { Table, TableBody } from '@/components/ui/table';
import type { EvaluatorListRow } from '@/server/evaluators/types';

import { evaluatorTableColumns } from '../../_constants/evaluator-table/evaluator-table-columns';
import { evaluatorTableFeatures } from '../../_constants/evaluator-table/evaluator-table-features';
import { useEvaluatorRowSelectionAtom } from '../../_hooks/table/use-evaluator-row-selection-atom';
import { useEvaluatorListQuery } from '../../_hooks/use-evaluator-list-query';
import { EvaluatorEmptyState } from './evaluator-empty-state';
import { EvaluatorTableHeader } from './header/evaluator-table-header';
import { EvaluatorRow } from './row/evaluator-row';

const toRowId = (row: EvaluatorListRow) => String(row.id);

const canExpandRow = () => true;

export function EvaluatorTable() {
  const { data } = useSuspenseQuery(useEvaluatorListQuery());
  const rowSelectionAtom = useEvaluatorRowSelectionAtom();
  const table = useTable({
    features: evaluatorTableFeatures,
    columns: evaluatorTableColumns,
    data: data.rows,
    getRowId: toRowId,
    getRowCanExpand: canExpandRow,
    autoResetExpanded: false,
    atoms: { rowSelection: rowSelectionAtom },
  });

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <Table className="text-xs">
        <EvaluatorTableHeader table={table} />
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <EvaluatorRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
      <EvaluatorEmptyState count={data.rows.length} />
    </div>
  );
}
