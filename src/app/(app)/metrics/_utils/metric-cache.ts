import type { MetricListItem } from '@/server/metrics/types';

export const replaceMetric =
  (item: MetricListItem) => (metrics: MetricListItem[] | undefined) => {
    if (!metrics) return metrics;
    return metrics.map((metric) => {
      if (metric.id !== item.id) return metric;
      return item;
    });
  };

export const removeMetrics =
  (metricIds: number[]) => (metrics: MetricListItem[] | undefined) => {
    if (!metrics) return metrics;
    return metrics.filter((metric) => !metricIds.includes(metric.id));
  };
