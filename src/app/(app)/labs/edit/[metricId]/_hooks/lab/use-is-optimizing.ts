'use client';

import { useIsMutating } from '@tanstack/react-query';

import { isOptimizationActive, LabService } from '@/app/(app)/labs/_service';

import { useLab } from './use-lab';

export const useIsOptimizing = () => {
  const lab = useLab();
  const isStarting =
    useIsMutating({ mutationKey: LabService.optimizeMutationKey }) > 0;
  return isStarting || isOptimizationActive(lab);
};
