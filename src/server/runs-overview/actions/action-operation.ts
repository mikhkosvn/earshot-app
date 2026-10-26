export const RunsOverviewActionOperation = {
  getRunsOverview: 'runs_overview.get_runs_overview',
  getRunsOverviewFilterOptions:
    'runs_overview.get_runs_overview_filter_options',
  listRunsOverviewConfigurations:
    'runs_overview.list_runs_overview_configurations',
  createRunsOverviewConfiguration:
    'runs_overview.create_runs_overview_configuration',
} as const;

export type RunsOverviewActionOperation =
  (typeof RunsOverviewActionOperation)[keyof typeof RunsOverviewActionOperation];
