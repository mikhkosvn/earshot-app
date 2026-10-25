import type { MetricListItem } from '@/server/metrics/types';

import { MetricGroup } from '../_constants/metric-group';

export const metricGroupOf = (metric: MetricListItem): MetricGroup => {
  if (metric.userDefined) return MetricGroup.custom;
  return MetricGroup.predefined;
};

export const metricsOfGroup = (metrics: MetricListItem[], group: MetricGroup) =>
  metrics.filter((metric) => metricGroupOf(metric) === group);

export const orderByGroup = (metrics: MetricListItem[]) => [
  ...metricsOfGroup(metrics, MetricGroup.custom),
  ...metricsOfGroup(metrics, MetricGroup.predefined),
];
