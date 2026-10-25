'use client';

import { useIsMutating } from '@tanstack/react-query';

import { DashboardService } from '../../_service';

export const useIsSavingDashboard = () =>
  useIsMutating({ mutationKey: DashboardService.saveMutationKey }) > 0;
