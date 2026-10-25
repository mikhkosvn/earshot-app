export const ScheduleMode = {
  everyHour: 'every_hour',
  daily: 'daily',
  weekdays: 'weekdays',
  weekly: 'weekly',
  custom: 'custom',
} as const;

export type ScheduleMode = (typeof ScheduleMode)[keyof typeof ScheduleMode];

export type PresetScheduleMode = Exclude<
  ScheduleMode,
  typeof ScheduleMode.custom
>;

export const PRESET_SCHEDULE_MODES: PresetScheduleMode[] = [
  ScheduleMode.everyHour,
  ScheduleMode.daily,
  ScheduleMode.weekdays,
  ScheduleMode.weekly,
];

export const SCHEDULE_MODE_CRON: Record<PresetScheduleMode, string> = {
  [ScheduleMode.everyHour]: '0 * * * *',
  [ScheduleMode.daily]: '0 6 * * *',
  [ScheduleMode.weekdays]: '0 6 * * 1-5',
  [ScheduleMode.weekly]: '0 2 * * 0',
};

export const ScheduleModeLabel: Record<ScheduleMode, string> = {
  [ScheduleMode.everyHour]: 'Every hour',
  [ScheduleMode.daily]: 'Daily · 6:00 AM',
  [ScheduleMode.weekdays]: 'Weekdays · 6:00 AM',
  [ScheduleMode.weekly]: 'Weekly · Sun 2:00 AM',
  [ScheduleMode.custom]: 'Custom...',
};

export const ScheduleModeCadence: Record<ScheduleMode, string> = {
  [ScheduleMode.everyHour]: 'Hourly heartbeat',
  [ScheduleMode.daily]: 'Daily quality check',
  [ScheduleMode.weekdays]: 'Weekday quality check',
  [ScheduleMode.weekly]: 'Weekly deep sweep',
  [ScheduleMode.custom]: 'Custom schedule',
};

export const DEFAULT_SCHEDULE_MODE = ScheduleMode.daily;
