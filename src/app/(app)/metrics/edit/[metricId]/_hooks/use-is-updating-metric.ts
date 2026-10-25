'use client';

import { useIsMutating } from '@tanstack/react-query';

import { EditMetricService } from '@/components/common/metric-history/_service';

export const useIsUpdatingMetric = () =>
  useIsMutating({ mutationKey: EditMetricService.updateMutationKey }) > 0;
