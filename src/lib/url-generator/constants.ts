export const PROJECT_QUERY_KEY = 'project' as const;

export const TEST_PROFILE_QUERY_KEY = 'test_profile' as const;

export const ResultsView = {
  results: 'results',
  runs: 'runs',
} as const;

export type ResultsView = (typeof ResultsView)[keyof typeof ResultsView];

export const RunsOverviewView = {
  new: 'new',
} as const;

export type RunsOverviewView =
  (typeof RunsOverviewView)[keyof typeof RunsOverviewView];
