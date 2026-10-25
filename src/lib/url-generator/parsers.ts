import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import {
  PROJECT_QUERY_KEY,
  ResultsView,
  RunsOverviewView,
  TEST_PROFILE_QUERY_KEY,
} from './constants';

export const projectParser = {
  [PROJECT_QUERY_KEY]: parseAsInteger,
};

export const paginationParser = {
  page: parseAsInteger,
  pageSize: parseAsInteger,
};

export const metricsParser = {
  ...projectParser,
  generation: parseAsString,
  view: parseAsInteger,
};

export const agentsParser = {
  ...projectParser,
  ...paginationParser,
};

export const personalityParser = {
  ...projectParser,
  language: parseAsString,
};

export const evaluatorsParser = {
  ...projectParser,
  ...paginationParser,
  folder: parseAsString,
  reopenSheet: parseAsBoolean,
  progressId: parseAsString,
  sessionId: parseAsInteger,
  [TEST_PROFILE_QUERY_KEY]: parseAsInteger,
};

export const evaluatorCreateParser = {
  ...projectParser,
  folder: parseAsString,
};

export const resultsParser = {
  ...paginationParser,
  view: parseAsStringLiteral(Object.values(ResultsView)),
};

export const resultParser = {
  runPage: parseAsInteger,
  pageSize: parseAsInteger,
  call_id: parseAsInteger,
};

export const runsOverviewParser = {
  ...projectParser,
  from: parseAsString,
  to: parseAsString,
  view: parseAsStringLiteral(Object.values(RunsOverviewView)),
  dashboard: parseAsInteger,
  chartType: parseAsString,
  period: parseAsString,
  filters: parseAsString,
  hidden: parseAsArrayOf(parseAsInteger),
};

export const monitorsParser = {
  ...projectParser,
  page: parseAsInteger,
};

export const callsParser = {
  ...paginationParser,
  callId: parseAsInteger,
  search: parseAsString,
  view: parseAsInteger,
  from: parseAsString,
  to: parseAsString,
  filters: parseAsString,
};

export const alertsParser = {
  hours: parseAsInteger,
};

export const fileParser = {
  download: parseAsInteger,
};

export const resultReportParser = {
  metrics: parseAsArrayOf(parseAsInteger),
};
