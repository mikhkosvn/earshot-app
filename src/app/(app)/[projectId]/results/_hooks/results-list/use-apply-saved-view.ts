'use client';

import { DEFAULT_PAGE_PARAM_KEY } from '@/components/common/table-pagination/pagination-config';

import { useResetFilterPage } from '../filters/use-reset-filter-page';
import { useResultFilterParams } from '../use-result-filter-params';

export const useApplySavedView = () => {
  const [, setFilters] = useResultFilterParams();
  const resetPage = useResetFilterPage(DEFAULT_PAGE_PARAM_KEY);

  return (agentIds: number[]) => {
    void setFilters({ agent: agentIds });
    void resetPage();
  };
};
