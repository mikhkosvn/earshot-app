import { type PresetScheduleMode, ScheduleMode } from './schedule-mode';

export const MonitorPreset = {
  heartbeat: 'heartbeat',
  qualityCheck: 'quality_check',
  deepSweep: 'deep_sweep',
} as const;

export type MonitorPreset = (typeof MonitorPreset)[keyof typeof MonitorPreset];

export const ScenarioScope = {
  first: 'first',
  all: 'all',
} as const;

export type ScenarioScope = (typeof ScenarioScope)[keyof typeof ScenarioScope];

export type MonitorPresetConfig = {
  caption: string;
  title: string;
  description: string;
  scheduleMode: PresetScheduleMode;
  scenarioScope: ScenarioScope;
};

export const MONITOR_PRESETS: Record<MonitorPreset, MonitorPresetConfig> = {
  [MonitorPreset.heartbeat]: {
    caption: 'Every hour',
    title: 'Heartbeat',
    description: 'One quick call: does it answer, is it fast, is it coherent?',
    scheduleMode: ScheduleMode.everyHour,
    scenarioScope: ScenarioScope.first,
  },
  [MonitorPreset.qualityCheck]: {
    caption: 'Daily at 6:00 AM',
    title: 'Quality check',
    description:
      'Your critical scenarios, every morning, before call volume starts.',
    scheduleMode: ScheduleMode.daily,
    scenarioScope: ScenarioScope.all,
  },
  [MonitorPreset.deepSweep]: {
    caption: 'Weekly',
    title: 'Deep sweep',
    description: 'Full regression across personas, accents, and edge cases.',
    scheduleMode: ScheduleMode.weekly,
    scenarioScope: ScenarioScope.all,
  },
};

export const MONITOR_PRESET_ORDER: MonitorPreset[] = [
  MonitorPreset.heartbeat,
  MonitorPreset.qualityCheck,
  MonitorPreset.deepSweep,
];
