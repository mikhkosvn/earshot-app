import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getRunsOverviewAction,
  getRunsOverviewFilterOptionsAction,
  listRunsOverviewConfigurationsAction,
} from '@/server/runs-overview/actions';
import type { GetRunsOverviewInput } from '@/server/runs-overview/types';

export const RunsOverviewKey = {
  overview: 'runs-overview',
  configurations: 'runs-overview-configurations',
  filterOptions: 'runs-overview-filter-options',
  createConfiguration: 'runs-overview-create-configuration',
} as const;

export type RunsOverviewKey =
  (typeof RunsOverviewKey)[keyof typeof RunsOverviewKey];

export class RunsOverviewService {
  static readonly configurationsKey = [RunsOverviewKey.configurations];
  static readonly createConfigurationMutationKey = [
    RunsOverviewKey.createConfiguration,
  ];

  static getOverviewQuery(args: GetRunsOverviewInput) {
    return queryOptions({
      queryKey: [RunsOverviewKey.overview, args],
      queryFn: () => deferAction(() => getRunsOverviewAction(args)),
    });
  }

  static getConfigurationsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [RunsOverviewKey.configurations, projectId],
      queryFn: () =>
        deferAction(() => listRunsOverviewConfigurationsAction({ projectId })),
    });
  }

  static getFilterOptionsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [RunsOverviewKey.filterOptions, projectId],
      queryFn: () =>
        deferAction(() => getRunsOverviewFilterOptionsAction({ projectId })),
    });
  }
}
