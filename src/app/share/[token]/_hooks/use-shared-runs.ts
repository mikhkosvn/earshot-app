'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { usePaginationParams } from '@/components/common/table-pagination/use-pagination-params';

import { RUN_PAGE_PARAM } from '../_constants/share-params';
import { ShareService } from '../_service';
import { useShareToken } from './use-share-token';

export const useSharedRuns = () => {
  const token = useShareToken();
  const { page, pageSize } = usePaginationParams(RUN_PAGE_PARAM);
  return useSuspenseQuery(
    ShareService.getRunsQuery({ token, page, pageSize }),
  ).data;
};
