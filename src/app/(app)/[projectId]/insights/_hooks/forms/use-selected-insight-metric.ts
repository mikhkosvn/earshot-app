'use client';

import { useWatch } from 'react-hook-form';

import type { SaveInsightConfigInput } from '@/server/insights/types';

import { useInsightMetricOptionsQuery } from '../queries/use-insight-metric-options-query';

export const useSelectedInsightMetric = () => {
  const metricId = useWatch<SaveInsightConfigInput, 'metricId'>({
    name: 'metricId',
  });
  const { data: metrics } = useInsightMetricOptionsQuery();
  return metrics.find((metric) => metric.id === metricId) ?? null;
};
