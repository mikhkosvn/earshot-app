'use client';

import { useSelector } from '@tanstack/react-store';

import type { EvaluatorTableRow } from '@/app/(app)/test-case/_constants/evaluator-table/evaluator-table-features';

export const useIsEvaluatorRowExpanded = (row: EvaluatorTableRow) =>
  useSelector(
    row.table.atoms.expanded,
    (expanded) => expanded === true || expanded[row.id] === true,
  );
