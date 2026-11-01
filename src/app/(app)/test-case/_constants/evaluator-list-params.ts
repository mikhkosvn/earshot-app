import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import {
  EvaluatorSortField,
  FilterLogic,
  SortDirection,
} from '@/server/evaluators/constants/evaluator-list';

export const legacyFolderParams = {
  folder: parseAsString,
};

export const evaluatorListParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  search: parseAsString.withDefault(''),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  tagLogic: parseAsStringLiteral(Object.values(FilterLogic)).withDefault(
    FilterLogic.or,
  ),
  personalities: parseAsArrayOf(parseAsInteger).withDefault([]),
  agents: parseAsArrayOf(parseAsInteger).withDefault([]),
  metrics: parseAsArrayOf(parseAsInteger).withDefault([]),
  metricLogic: parseAsStringLiteral(Object.values(FilterLogic)).withDefault(
    FilterLogic.or,
  ),
  sortBy: parseAsStringLiteral(Object.values(EvaluatorSortField)).withDefault(
    EvaluatorSortField.id,
  ),
  sortDir: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.desc,
  ),
};
