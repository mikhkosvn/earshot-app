'use client';

import { useSelector } from '@tanstack/react-store';

import { useEvaluatorRowSelectionAtom } from './use-evaluator-row-selection-atom';

export const useIsEvaluatorRowSelected = (rowId: string) =>
  useSelector(
    useEvaluatorRowSelectionAtom(),
    (selection) => selection[rowId] === true,
  );
