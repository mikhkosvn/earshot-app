import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import { ResultsView } from '@/lib/url-generator/constants';
import {
  RunSortField,
  SortDirection,
} from '@/server/results/constants/result-list';

export const RUN_PAGE_PARAM = 'runPage';

export const RUN_DETAIL_PARAM = 'call_id';

export const resultFilterParsers = {
  agent: parseAsArrayOf(parseAsInteger).withDefault([]),
  evaluator: parseAsArrayOf(parseAsInteger).withDefault([]),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
  status: parseAsArrayOf(parseAsStringLiteral(Object.values(RunStatus))).withDefault(
    [],
  ),
  evaluation: parseAsArrayOf(
    parseAsStringLiteral(Object.values(CallEvaluationStatus)),
  ).withDefault([]),
};

export const runSortParsers = {
  sort: parseAsStringLiteral(Object.values(RunSortField)).withDefault(
    RunSortField.id,
  ),
  dir: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.desc,
  ),
};

export const resultsListParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  view: parseAsStringLiteral(Object.values(ResultsView)).withDefault(
    ResultsView.results,
  ),
  ...resultFilterParsers,
  ...runSortParsers,
};

export const resultDetailParsers = {
  [RUN_PAGE_PARAM]: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  [RUN_DETAIL_PARAM]: parseAsInteger,
  ...resultFilterParsers,
  ...runSortParsers,
};

export const loadResultsListParams = createLoader(resultsListParsers);

export const loadResultDetailParams = createLoader(resultDetailParsers);
