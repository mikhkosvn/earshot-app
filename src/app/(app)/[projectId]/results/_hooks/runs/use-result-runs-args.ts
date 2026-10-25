'use client';

import { useQueryStates } from 'nuqs';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { ListRunsInput } from '@/server/results/types';

import {
  resultDetailParsers,
  resultFilterParsers,
  RUN_PAGE_PARAM,
  runSortParsers,
} from '../../_constants/result-params';
import { toResultFilters } from '../../_utils/filters-input';
import { useResultId } from '../use-result-id';

const resultRunsParsers = {
  [RUN_PAGE_PARAM]: resultDetailParsers[RUN_PAGE_PARAM],
  pageSize: resultDetailParsers.pageSize,
  ...resultFilterParsers,
  ...runSortParsers,
};

export const useResultRunsArgs = (): ListRunsInput => {
  const projectId = useCurrentProjectId();
  const resultId = useResultId();
  const [query] = useQueryStates(resultRunsParsers);

  return {
    projectId,
    resultId,
    filters: toResultFilters(query),
    sortBy: query.sort,
    sortDir: query.dir,
    page: query[RUN_PAGE_PARAM],
    pageSize: query.pageSize,
  };
};
