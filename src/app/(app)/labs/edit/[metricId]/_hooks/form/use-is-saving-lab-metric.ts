'use client';

import { useIsMutating } from '@tanstack/react-query';

import { LabService } from '@/app/(app)/labs/_service';

export const useIsSavingLabMetric = () =>
  useIsMutating({ mutationKey: LabService.saveMetricMutationKey }) > 0;
