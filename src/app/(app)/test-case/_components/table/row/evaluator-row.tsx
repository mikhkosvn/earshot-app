'use client';

import { FlexRender } from '@tanstack/react-table';

import { TableCell, TableRow } from '@/components/ui/table';

import type { EvaluatorTableRow } from '../../../_constants/evaluator-table/evaluator-table-features';
import { useIsEvaluatorRowExpanded } from '../../../_hooks/table/use-is-evaluator-row-expanded';
import { useIsEvaluatorRowSelected } from '../../../_hooks/table/use-is-evaluator-row-selected';
import { EvaluatorRowDetails } from './evaluator-row-details';

interface EvaluatorRowProps {
  row: EvaluatorTableRow;
}

const rowState = (isSelected: boolean) => {
  if (isSelected) return 'selected';
  return undefined;
};

export function EvaluatorRow({ row }: EvaluatorRowProps) {
  const isSelected = useIsEvaluatorRowSelected(row.id);
  const isExpanded = useIsEvaluatorRowExpanded(row);

  return (
    <>
      <TableRow data-state={rowState(isSelected)}>
        {row.getAllCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={cell.column.columnDef.meta?.cellClassName}
          >
            <FlexRender cell={cell} />
          </TableCell>
        ))}
      </TableRow>
      <EvaluatorRowDetails row={row.original} isExpanded={isExpanded} />
    </>
  );
}
