'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MonitorService } from '@/components/common/monitor-dialog/_service';

const RUN_HISTORY_REFRESH_MS = 10_000;

export const useMonitorRunsQuery = (monitorId: number) =>
  useSuspenseQuery({
    ...MonitorService.getRunsQuery({ monitorId }),
    refetchInterval: RUN_HISTORY_REFRESH_MS,
  });
