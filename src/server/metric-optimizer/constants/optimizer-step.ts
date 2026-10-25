export const MetricOptimizerStep = {
  schedule_optimization: 'metric_optimizer.schedule_optimization',
  review_optimization: 'metric_optimizer.review_optimization',
} as const;

export type MetricOptimizerStep =
  (typeof MetricOptimizerStep)[keyof typeof MetricOptimizerStep];
