'use client';

import { useIsMutating } from '@tanstack/react-query';

import { isLabRunActive, LabService } from '@/app/(app)/labs/_service';

import { useLab } from './use-lab';

export const useIsLabRunning = () => {
  const lab = useLab();
  const isStarting =
    useIsMutating({ mutationKey: LabService.runMutationKey }) > 0;
  return isStarting || isLabRunActive(lab);
};
