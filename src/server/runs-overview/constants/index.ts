import { WidgetTimePeriod } from '@/generated/prisma/enums';

export const RunSource = {
  monitor: 'monitor',
  manual: 'manual',
} as const;

export type RunSource = (typeof RunSource)[keyof typeof RunSource];

export const RunSourceLabel: Record<RunSource, string> = {
  [RunSource.monitor]: 'Monitors',
  [RunSource.manual]: 'One-off runs',
};

export const RunSourceDescription: Record<RunSource, string> = {
  [RunSource.monitor]: "Runs a monitor's schedule started",
  [RunSource.manual]: 'Runs someone started by hand',
};

export const OverviewChartType = {
  line: 'line',
  bar: 'bar',
} as const;

export type OverviewChartType =
  (typeof OverviewChartType)[keyof typeof OverviewChartType];

export const OverviewChartTypeLabel: Record<OverviewChartType, string> = {
  [OverviewChartType.line]: 'Line',
  [OverviewChartType.bar]: 'Bar',
};

export const OVERVIEW_PERIODS = [
  WidgetTimePeriod.hour,
  WidgetTimePeriod.day,
  WidgetTimePeriod.week,
] as const;

export type OverviewPeriod = (typeof OVERVIEW_PERIODS)[number];

export const RUNS_OVERVIEW_DEFAULTS = {
  from: 'now-6h',
  to: 'now',
  chartType: OverviewChartType.bar,
  period: WidgetTimePeriod.day,
} as const;

export const SAVE_DEFAULT_RANGE_LABEL = 'Last 7 days';

export const MAX_OVERVIEW_BUCKETS = 400;

export const MAX_TOP_FAILED_SCENARIOS = 10;

export const OverviewFilterTab = {
  agents: 'agents',
  tags: 'tags',
  personality: 'personality',
  scenarios: 'scenarios',
  folders: 'folders',
  monitors: 'monitors',
  runSource: 'run_source',
  ids: 'ids',
} as const;

export type OverviewFilterTab =
  (typeof OverviewFilterTab)[keyof typeof OverviewFilterTab];

export const OverviewFilterTabLabel: Record<OverviewFilterTab, string> = {
  [OverviewFilterTab.agents]: 'Agents',
  [OverviewFilterTab.tags]: 'Tags',
  [OverviewFilterTab.personality]: 'Personality',
  [OverviewFilterTab.scenarios]: 'Scenarios',
  [OverviewFilterTab.folders]: 'Folders',
  [OverviewFilterTab.monitors]: 'Monitors',
  [OverviewFilterTab.runSource]: 'Run source',
  [OverviewFilterTab.ids]: 'IDs',
};
