'use client';

import { shallow, useSelector } from '@tanstack/react-store';
import type { RowSelectionState } from '@tanstack/react-table';

import { useEvaluatorRowSelectionAtom } from './use-evaluator-row-selection-atom';

const toSelectedIds = (selection: RowSelectionState) =>
  Object.keys(selection)
    .filter((rowId) => selection[rowId])
    .map(Number);

export const useSelectedEvaluatorIds = () =>
  useSelector(useEvaluatorRowSelectionAtom(), toSelectedIds, {
    compare: shallow,
  });
