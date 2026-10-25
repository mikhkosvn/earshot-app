'use client';

import { ComparisonOperatorLabel } from '@/server/metrics/constants/comparison-operator-labels';
import { RUBRIC_OPERATORS } from '@/server/metrics/constants/rubric/rubric-value-kind';

import { useRuleMetric } from './use-rule-metric';

export const useRuleOperatorItems = (index: number) => {
  const metric = useRuleMetric(index);
  if (!metric) return [];
  return RUBRIC_OPERATORS[metric.kind].map((operator) => ({
    value: operator,
    label: ComparisonOperatorLabel[operator],
  }));
};
