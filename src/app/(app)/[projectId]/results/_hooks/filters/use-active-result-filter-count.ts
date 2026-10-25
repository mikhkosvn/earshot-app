'use client';

import { activeFilterCount } from '../../_utils/filters-input';
import { useResultFilterParams } from '../use-result-filter-params';

export const useActiveResultFilterCount = () => {
  const [params] = useResultFilterParams();
  return activeFilterCount(params);
};
