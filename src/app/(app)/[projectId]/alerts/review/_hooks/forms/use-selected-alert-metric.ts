'use client';

import { useWatch } from 'react-hook-form';

import type { CreateAlertInput } from '@/server/alerts/types';

import { useAlertMetricOptionsQuery } from '../queries/use-alert-metric-options-query';

export const useSelectedAlertMetric = () => {
  const metricId = useWatch<CreateAlertInput, 'metricId'>({ name: 'metricId' });
  const { data: metrics } = useAlertMetricOptionsQuery();
  return metrics.find((metric) => metric.id === metricId) ?? null;
};
