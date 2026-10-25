import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { runsOverviewParser } from '@/lib/url-generator/parsers';
import {
  OVERVIEW_PERIODS,
  OverviewChartType,
  RUNS_OVERVIEW_DEFAULTS,
} from '@/server/runs-overview/constants';

export const runsOverviewParsers = {
  project: runsOverviewParser.project,
  from: parseAsString.withDefault(RUNS_OVERVIEW_DEFAULTS.from),
  to: parseAsString.withDefault(RUNS_OVERVIEW_DEFAULTS.to),
  view: runsOverviewParser.view,
  dashboard: runsOverviewParser.dashboard,
  chartType: parseAsStringLiteral(Object.values(OverviewChartType)).withDefault(
    RUNS_OVERVIEW_DEFAULTS.chartType,
  ),
  period: parseAsStringLiteral(OVERVIEW_PERIODS).withDefault(
    RUNS_OVERVIEW_DEFAULTS.period,
  ),
  filters: parseAsString.withDefault(''),
  hidden: parseAsArrayOf(parseAsInteger).withDefault([]),
};

export const loadRunsOverviewParams = createLoader(runsOverviewParsers);
