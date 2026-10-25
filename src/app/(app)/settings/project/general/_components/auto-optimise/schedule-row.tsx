'use client';

import { describeCron } from '@/components/common/monitor-dialog/_utils/schedule/describe-cron';
import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';

import { DeleteScheduleButton } from './delete-schedule-button';
import { EditScheduleButton } from './edit-schedule-button';
import { ScheduleRunText } from './schedule-run-text';

type ScheduleRowProps = {
  schedule: OptimizerScheduleView;
};

export function ScheduleRow({ schedule }: ScheduleRowProps) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium">{schedule.name}</span>
        <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <code className="rounded-sm border bg-muted px-1.5 py-0.5">
            {schedule.cronExpression}
          </code>
          {describeCron(schedule.cronExpression)}
        </span>
        <ScheduleRunText schedule={schedule} />
      </div>
      <div className="flex items-center gap-2">
        <EditScheduleButton schedule={schedule} />
        <DeleteScheduleButton scheduleId={schedule.id} />
      </div>
    </li>
  );
}
