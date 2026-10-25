import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { PROJECT_QUERY_KEY, ResultsView, RunsOverviewView } from './constants';

export const projectParser = {
  [PROJECT_QUERY_KEY]: parseAsInteger,
};

export const paginationParser = {
  page: parseAsInteger,
  pageSize: parseAsInteger,
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
};

export const monitorsParser = {
  ...projectParser,
  page: parseAsInteger,
};

export const callsParser = {
  ...paginationParser,
  callId: parseAsInteger,
};

export const alertsParser = {
  hours: parseAsInteger,
};
