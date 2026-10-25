'use client';

import { useRuleMetric } from './use-rule-metric';

export const useRuleEnumValues = (index: number) => {
  const metric = useRuleMetric(index);
  if (!metric) return [];
  return metric.enumValues;
};
