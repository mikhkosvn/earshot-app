'use client';

import { useIsMutating } from '@tanstack/react-query';

import { CreateMetricService } from '../_service';

export const useIsCreatingMetric = () =>
  useIsMutating({ mutationKey: CreateMetricService.createMutationKey }) > 0;
