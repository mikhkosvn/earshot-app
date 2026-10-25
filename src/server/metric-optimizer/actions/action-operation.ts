export const MetricOptimizerActionOperation = {
  listOptimizerSchedules: 'metric_optimizer.list_optimizer_schedules',
  startMetricOptimization: 'metric_optimizer.start_metric_optimization',
  applyOptimizationProposal: 'metric_optimizer.apply_optimization_proposal',
  dismissOptimizationProposal: 'metric_optimizer.dismiss_optimization_proposal',
  createOptimizerSchedule: 'metric_optimizer.create_optimizer_schedule',
  updateOptimizerSchedule: 'metric_optimizer.update_optimizer_schedule',
  deleteOptimizerSchedule: 'metric_optimizer.delete_optimizer_schedule',
} as const;

export type MetricOptimizerActionOperation =
  (typeof MetricOptimizerActionOperation)[keyof typeof MetricOptimizerActionOperation];
