'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { setDashboardDailyReportAction } from '@/server/dashboards/actions';
import type { SetDashboardDailyReportInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

const successText = (included: boolean) => {
  if (included) return 'The dashboard is in the daily report.';
  return 'The dashboard is not in the daily report.';
};

export const useSetDailyReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.dailyReportMutationKey,
    mutationFn: (input: SetDashboardDailyReportInput) =>
      setDashboardDailyReportAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success(successText(input.includeInDailyReport));
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: DashboardService.listKey }),
        queryClient.invalidateQueries({
          queryKey: DashboardService.getDetailQuery({
            dashboardId: input.dashboardId,
          }).queryKey,
        }),
      ]);
    },
  });
};
