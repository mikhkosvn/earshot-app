'use client';

import { useOptimizerSchedules } from '../../_hooks/auto-optimise/use-optimizer-schedules';
import { ScheduleEmpty } from './schedule-empty';
import { ScheduleRow } from './schedule-row';

export function ScheduleList() {
  const schedules = useOptimizerSchedules();

  if (schedules.length === 0) return <ScheduleEmpty />;

  return (
    <ul aria-label="Schedules" className="flex flex-col divide-y rounded-md border">
      {schedules.map((schedule) => (
        <ScheduleRow key={schedule.id} schedule={schedule} />
      ))}
    </ul>
  );
}
