'use client';

import { useEvaluatorRowSelectionAtom } from './use-evaluator-row-selection-atom';

export const useClearEvaluatorSelection = () => {
  const selectionAtom = useEvaluatorRowSelectionAtom();
  return () => selectionAtom.set({});
};
