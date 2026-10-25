'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { ResultService } from '../../_service';
import { toResultFilters } from '../../_utils/filters-input';
import { useResultsListParams } from './use-results-list-params';

export const useResultListQuery = () => {
  const projectId = useCurrentProjectId();
  const [params] = useResultsListParams();
  return useSuspenseQuery(
    ResultService.getListQuery({
      projectId,
      filters: toResultFilters(params),
      page: params.page,
      pageSize: params.pageSize,
    }),
  );
};
