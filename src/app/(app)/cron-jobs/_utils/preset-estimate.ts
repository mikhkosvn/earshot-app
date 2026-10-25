import {
  MONITOR_PRESETS,
  type MonitorPreset,
  ScenarioScope,
} from '@/components/common/monitor-dialog/_constants/monitor-preset';
import { SCHEDULE_MODE_CRON } from '@/components/common/monitor-dialog/_constants/schedule-mode';
import { callUnit } from '@/components/common/monitor-dialog/_utils/form/call-count-label';
import { countWeeklyRuns } from '@/components/common/monitor-dialog/_utils/schedule/count-weekly-runs';

const DAYS_PER_WEEK = 7;

const ESTIMATE_START = new Date(Date.UTC(2026, 0, 5));

const presetScenarioCount = (preset: MonitorPreset, scenarioCount: number) => {
  if (MONITOR_PRESETS[preset].scenarioScope === ScenarioScope.first) return 1;
  return scenarioCount;
};

const dailyRate = (runsPerWeek: number, callsPerWeek: number) => {
  if (runsPerWeek <= DAYS_PER_WEEK) return null;
  return `${callsPerWeek / DAYS_PER_WEEK}/day`;
};

export const presetEstimate = (
  preset: MonitorPreset,
  scenarioCount: number,
) => {
  const runsPerWeek = countWeeklyRuns(
    SCHEDULE_MODE_CRON[MONITOR_PRESETS[preset].scheduleMode],
    'UTC',
    ESTIMATE_START,
  );
  const callsPerWeek = runsPerWeek * presetScenarioCount(preset, scenarioCount);
  return {
    callsPerWeek,
    unit: callUnit(callsPerWeek),
    dailyRate: dailyRate(runsPerWeek, callsPerWeek),
  };
};
