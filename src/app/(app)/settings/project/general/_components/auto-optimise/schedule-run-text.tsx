import { formatCronDate } from '@/components/common/monitor-dialog/_utils/schedule/format-cron-date';
import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

type ScheduleRunTextProps = {
  schedule: OptimizerScheduleView;
};

const lastRunText = (schedule: OptimizerScheduleView) => {
  if (!schedule.lastRunAt) return 'Not run yet.';
  return `Last run: ${formatCronDate(new Date(schedule.lastRunAt), TimezoneLabel[schedule.timezone])}.`;
};

const nextRunText = (schedule: OptimizerScheduleView) => {
  if (!schedule.isActive || !schedule.nextRunAt) return 'Paused.';
  return `Next run: ${formatCronDate(new Date(schedule.nextRunAt), TimezoneLabel[schedule.timezone])}.`;
};

export function ScheduleRunText({ schedule }: ScheduleRunTextProps) {
  return (
    <span className="text-xs text-muted-foreground" suppressHydrationWarning>
      {nextRunText(schedule)} {lastRunText(schedule)}
    </span>
  );
}
