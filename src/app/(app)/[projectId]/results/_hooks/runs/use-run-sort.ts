'use client';

import { useQueryStates } from 'nuqs';

import {
  type RunSortField,
  SortDirection,
} from '@/server/results/constants/result-list';

import { runSortParsers } from '../../_constants/result-params';
import { useResetFilterPage } from '../filters/use-reset-filter-page';

const nextDirection = (isActive: boolean, current: SortDirection) => {
  if (isActive && current === SortDirection.desc) return SortDirection.asc;
  return SortDirection.desc;
};

export const useRunSort = (field: RunSortField, pageParamKey: string) => {
  const [{ sort, dir }, setSort] = useQueryStates(runSortParsers);
  const resetPage = useResetFilterPage(pageParamKey);
  const isActive = sort === field;
  const direction = nextDirection(isActive, dir);

  const applySort = () => {
    void setSort({ sort: field, dir: direction });
    void resetPage();
  };

  return {
    isActive,
    currentDirection: dir,
    nextDirection: direction,
    applySort,
  };
};
