'use client';

import type { EvaluatorTableRow } from '../../../_constants/evaluator-table/evaluator-table-features';
import { useIsEvaluatorRowExpanded } from '../../../_hooks/table/use-is-evaluator-row-expanded';
import { RowExpandButton } from './row-expand-button';

interface EvaluatorRowExpandButtonProps {
  row: EvaluatorTableRow;
}

export function EvaluatorRowExpandButton({
  row,
}: EvaluatorRowExpandButtonProps) {
  const isExpanded = useIsEvaluatorRowExpanded(row);

  return (
    <RowExpandButton
      isExpanded={isExpanded}
      onToggle={() => row.toggleExpanded()}
    />
  );
}
