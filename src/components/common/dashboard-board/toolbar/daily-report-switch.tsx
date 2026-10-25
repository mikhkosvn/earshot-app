'use client';

import { InfoIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DashboardSource } from '@/generated/prisma/enums';

import { useSetDailyReportMutation } from '../_hooks/mutations/use-set-daily-report-mutation';
import { useDashboardDetailQuery } from '../_hooks/queries/use-dashboard-detail-query';

type DailyReportSwitchProps = {
  dashboardId: number;
  source: DashboardSource;
};

const SWITCH_ID = 'dashboard-daily-report';

export function DailyReportSwitch({
  dashboardId,
  source,
}: DailyReportSwitchProps) {
  const { data: dashboard } = useDashboardDetailQuery(dashboardId);
  const setDailyReport = useSetDailyReportMutation();

  if (source !== DashboardSource.call_logs) return null;

  return (
    <div className="flex h-7 items-center gap-2 rounded-lg border px-2.5 text-xs">
      <label htmlFor={SWITCH_ID}>In Daily Report</label>
      <Switch
        id={SWITCH_ID}
        size="sm"
        checked={dashboard.includeInDailyReport}
        disabled={setDailyReport.isPending}
        onCheckedChange={(checked) =>
          setDailyReport.mutate({ dashboardId, includeInDailyReport: checked })
        }
      />
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              aria-label="About the daily report"
              className="inline-flex text-muted-foreground"
            />
          }
        >
          <InfoIcon className="size-3.5" />
        </TooltipTrigger>
        <TooltipContent className="max-w-64">
          The daily report email at 5:00 PM in the project time zone includes
          this dashboard.
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
