'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { DashboardService } from '../../_service';

export const useDashboardDetailQuery = (dashboardId: number) =>
  useSuspenseQuery(DashboardService.getDetailQuery({ dashboardId }));
