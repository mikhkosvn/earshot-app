'use client';

import { useSelector } from '@tanstack/react-store';

import { useEvaluatorRowSelectionAtom } from './use-evaluator-row-selection-atom';
import { usePageEvaluatorRowIds } from './use-page-evaluator-row-ids';

export const useAreAllPageEvaluatorsSelected = () => {
  const rowIds = usePageEvaluatorRowIds();
  return useSelector(
    useEvaluatorRowSelectionAtom(),
    (selection) =>
      rowIds.length > 0 && rowIds.every((rowId) => selection[rowId] === true),
  );
};
