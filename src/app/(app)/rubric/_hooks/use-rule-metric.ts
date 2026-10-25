'use client';

import { useWatch } from 'react-hook-form';

import type { RubricFormValues } from '../_schemas/rubric-form-schema';
import { useRubricMetrics } from './use-rubric-metrics';

export const useRuleMetric = (index: number) => {
  const metricId = useWatch<RubricFormValues, `rules.${number}.metricId`>({
    name: `rules.${index}.metricId`,
  });
  const metrics = useRubricMetrics();
  return metrics.find((metric) => metric.id === metricId) ?? null;
};
