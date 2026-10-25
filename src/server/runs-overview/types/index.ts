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

export type OverviewStat = {
  value: number;
  previous: number;
  change: number;
};

export type SuccessRatePoint = {
  key: string;
  label: string;
  totalCalls: number;
  successfulCalls: number;
  successRate: number;
};

export type OverviewPoint = {
  key: string;
  label: string;
  value: number;
};

export type MetricOverTime = {
  metricId: number;
  name: string;
  percent: boolean;
  aggregationLabel: string;
  points: OverviewPoint[];
};

export type FailedScenario = {
  name: string;
  failedCount: number;
  totalCount: number;
};

export type RunsOverview = {
  successRate: OverviewStat;
  totalCalls: OverviewStat;
  avgTalkRatio: OverviewStat;
  avgLatency: OverviewStat;
  successRateSummary: SuccessRatePoint[];
  latencySummary: OverviewPoint[];
  metricSummary: MetricOverTime[];
  topScenariosFailed: FailedScenario[];
};

export type FilterOption = {
  id: number;
  label: string;
};

export type RunsOverviewFilterOptions = {
  agents: FilterOption[];
  tags: FilterOption[];
  personalities: FilterOption[];
  scenarios: FilterOption[];
  folders: FilterOption[];
  monitors: FilterOption[];
};

export type RunsOverviewConfigurationItem = {
  id: number;
  name: string;
  rangeFrom: string;
  rangeTo: string;
  filters: RunsOverviewFilters;
  includeMetricVisibility: boolean;
  hiddenMetricIds: number[];
};
