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
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';

export const evaluatorListParams = {
  folder: parseAsString.withDefault(DEFAULT_FOLDER_PATH),
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
