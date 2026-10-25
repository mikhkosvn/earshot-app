'use client';

import { parseOverviewFilters } from '../_utils/overview-filters-param';
import { useRunsOverviewParams } from './use-runs-overview-params';

export const useOverviewFilters = () => {
  const [{ filters }] = useRunsOverviewParams();
  return parseOverviewFilters(filters);
};
