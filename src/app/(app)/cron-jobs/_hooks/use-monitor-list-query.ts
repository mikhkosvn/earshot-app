'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { MonitorService } from '@/components/common/monitor-dialog/_service';
import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';
import { usePaginationParams } from '@/components/common/table-pagination/use-pagination-params';

export const useMonitorListQuery = () => {
  const projectId = useCurrentProjectId();
  const { page, pageSize } = usePaginationParams(DEFAULT_PAGE_PARAM_KEY);
  return useSuspenseQuery(
    MonitorService.getListQuery({ projectId, page, pageSize }),
  );
};
