'use client';

import type { ResultFilterParams } from '../../_utils/filters-input';
import { useResultFilterParams } from '../use-result-filter-params';
import { useResetFilterPage } from './use-reset-filter-page';

export const useApplyResultFilters = (pageParamKey: string) => {
  const [, setFilters] = useResultFilterParams();
  const resetPage = useResetFilterPage(pageParamKey);

  return (params: ResultFilterParams) => {
    void setFilters(params);
    void resetPage();
  };
};
