'use client';

import { Checkbox } from '@/components/ui/checkbox';

import type { EvaluatorTableRow } from '../../../_constants/evaluator-table/evaluator-table-features';
import { useIsEvaluatorRowSelected } from '../../../_hooks/table/use-is-evaluator-row-selected';

interface EvaluatorSelectCellProps {
  row: EvaluatorTableRow;
}

export function EvaluatorSelectCell({ row }: EvaluatorSelectCellProps) {
  const isSelected = useIsEvaluatorRowSelected(row.id);

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        aria-label={`Select evaluator ${row.original.id}`}
        checked={isSelected}
        onCheckedChange={(checked) => row.toggleSelected(checked)}
      />
      <span className="font-semibold">{row.original.id}</span>
    </div>
  );
}
