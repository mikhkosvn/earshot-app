'use client';

import { useIsMutating } from '@tanstack/react-query';

import { CreateMetricService } from '../_service';

export const useIsBuildingQuickMetric = () =>
  useIsMutating({ mutationKey: CreateMetricService.quickBuildMutationKey }) > 0;
