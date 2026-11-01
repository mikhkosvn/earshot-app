'use client';

import { useSelector } from '@tanstack/react-store';

import type { EvaluatorTableInstance } from '@/app/(app)/test-case/_constants/evaluator-table/evaluator-table-features';

import { usePageEvaluatorRowIds } from './use-page-evaluator-row-ids';

export const useAreAllEvaluatorRowsExpanded = (
  table: EvaluatorTableInstance,
) => {
  const rowIds = usePageEvaluatorRowIds();
  return useSelector(
    table.atoms.expanded,
    (expanded) =>
      rowIds.length > 0 &&
      (expanded === true || rowIds.every((rowId) => expanded[rowId] === true)),
  );
};
