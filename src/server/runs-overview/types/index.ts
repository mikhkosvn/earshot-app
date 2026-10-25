import type { z } from 'zod';

import type {
  createConfigurationSchema,
  getRunsOverviewSchema,
  projectIdSchema,
  runsOverviewFiltersSchema,
} from '../schemas';

export type RunsOverviewFilters = z.output<typeof runsOverviewFiltersSchema>;
export type GetRunsOverviewInput = z.input<typeof getRunsOverviewSchema>;
export type ProjectIdInput = z.input<typeof projectIdSchema>;
export type CreateConfigurationInput = z.input<
  typeof createConfigurationSchema
>;

export interface OverviewStat {
  value: number;
  previous: number;
  change: number;
}

export interface SuccessRatePoint {
  key: string;
  label: string;
  totalCalls: number;
  successfulCalls: number;
  successRate: number;
}

export interface OverviewPoint {
  key: string;
  label: string;
  value: number;
}

export interface MetricOverTime {
  metricId: number;
  name: string;
  percent: boolean;
  aggregationLabel: string;
  points: OverviewPoint[];
}

export interface FailedScenario {
  name: string;
  failedCount: number;
  totalCount: number;
}

export interface RunsOverview {
  successRate: OverviewStat;
  totalCalls: OverviewStat;
  avgTalkRatio: OverviewStat;
  avgLatency: OverviewStat;
  successRateSummary: SuccessRatePoint[];
  latencySummary: OverviewPoint[];
  metricSummary: MetricOverTime[];
  topScenariosFailed: FailedScenario[];
}

export interface FilterOption {
  id: number;
  label: string;
}

export interface RunsOverviewFilterOptions {
  agents: FilterOption[];
  tags: FilterOption[];
  personalities: FilterOption[];
  scenarios: FilterOption[];
  folders: FilterOption[];
  monitors: FilterOption[];
}

export interface RunsOverviewConfigurationItem {
  id: number;
  name: string;
  rangeFrom: string;
  rangeTo: string;
  filters: RunsOverviewFilters;
  includeMetricVisibility: boolean;
  hiddenMetricIds: number[];
}
