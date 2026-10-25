'use client';

import type { RunsOverviewConfigurationItem } from '@/server/runs-overview/types';

import { serializeOverviewFilters } from '../_utils/overview-filters-param';
import { useRunsOverviewParams } from './use-runs-overview-params';

const hiddenOf = (configuration: RunsOverviewConfigurationItem) => {
  if (!configuration.includeMetricVisibility) return null;
  if (configuration.hiddenMetricIds.length === 0) return null;
  return configuration.hiddenMetricIds;
};

export const useApplyConfiguration = () => {
  const [, setParams] = useRunsOverviewParams();
  return (configuration: RunsOverviewConfigurationItem) =>
    setParams({
      from: configuration.rangeFrom,
      to: configuration.rangeTo,
      filters: serializeOverviewFilters(configuration.filters),
      hidden: hiddenOf(configuration),
    });
};
