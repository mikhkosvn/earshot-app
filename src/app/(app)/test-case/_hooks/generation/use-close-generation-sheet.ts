'use client';

import { useGenerationSheetParams } from './use-generation-sheet-params';

export const useCloseGenerationSheet = () => {
  const [, setParams] = useGenerationSheetParams();
  return () =>
    setParams({ reopenSheet: null, sessionId: null, progressId: null });
};
