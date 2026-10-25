'use client';

import { useQueryStates } from 'nuqs';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { ListRunsInput } from '@/server/results/types';

import {
  resultFilterParsers,
  resultsListParsers,
  runSortParsers,
} from '../../_constants/result-params';
import { toResultFilters } from '../../_utils/filters-input';

const projectRunsParsers = {
  page: resultsListParsers.page,
  pageSize: resultsListParsers.pageSize,
  ...resultFilterParsers,
  ...runSortParsers,
};

export const useProjectRunsArgs = (): ListRunsInput => {
  const projectId = useCurrentProjectId();
  const [query] = useQueryStates(projectRunsParsers);

  return {
    projectId,
    resultId: null,
    filters: toResultFilters(query),
    sortBy: query.sort,
    sortDir: query.dir,
    page: query.page,
    pageSize: query.pageSize,
  };
};
