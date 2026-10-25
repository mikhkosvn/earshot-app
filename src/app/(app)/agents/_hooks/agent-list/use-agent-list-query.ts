'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { usePaginationParams } from '@/components/common/table-pagination/use-pagination-params';
import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';

import { AgentService } from '../../_service';
import { useAgentSearchParam } from './use-agent-search-param';

export const useAgentListQuery = () => {
  const projectId = useCurrentProjectId();
  const { page, pageSize } = usePaginationParams(DEFAULT_PAGE_PARAM_KEY);
  const { search } = useAgentSearchParam();
  return useQuery({
    ...AgentService.getListQuery({ projectId, page, pageSize, search }),
    placeholderData: keepPreviousData,
  });
};
