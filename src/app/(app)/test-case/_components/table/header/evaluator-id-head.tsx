'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { EvaluatorSortField } from '@/server/evaluators/constants/evaluator-list';

import type { EvaluatorTableInstance } from '../../../_constants/evaluator-table/evaluator-table-features';
import { useAreAllPageEvaluatorsSelected } from '../../../_hooks/table/use-are-all-page-evaluators-selected';
import { SortableHead } from './sortable-head';

interface EvaluatorIdHeadProps {
  table: EvaluatorTableInstance;
}

export function EvaluatorIdHead({ table }: EvaluatorIdHeadProps) {
  const allSelected = useAreAllPageEvaluatorsSelected();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        aria-label="Select all evaluators"
        checked={allSelected}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
      />
      <SortableHead field={EvaluatorSortField.id} label="ID" />
    </div>
  );
}
