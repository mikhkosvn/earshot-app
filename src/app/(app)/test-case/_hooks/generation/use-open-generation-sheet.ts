'use client';

import { useEvaluatorListParams } from '@/app/(app)/test-case/_hooks/use-evaluator-list-params';

import { useGenerationSheetParams } from './use-generation-sheet-params';

export const useOpenGenerationSheet = () => {
  const [, setSheetParams] = useGenerationSheetParams();
  const [, setListParams] = useEvaluatorListParams();

  return async (sessionId: number, folderPath: string) => {
    await setListParams({ folder: folderPath, page: null });
    await setSheetParams({ reopenSheet: true, sessionId, progressId: null });
  };
};
