import {
  PRESET_SCHEDULE_MODES,
  SCHEDULE_MODE_CRON,
  ScheduleMode,
} from '../../_constants/schedule-mode';

export const scheduleModeForCron = (expression: string): ScheduleMode => {
  const normalized = expression.trim().split(/\s+/).join(' ');
  const preset = PRESET_SCHEDULE_MODES.find(
    (mode) => SCHEDULE_MODE_CRON[mode] === normalized,
  );
  return preset ?? ScheduleMode.custom;
};
