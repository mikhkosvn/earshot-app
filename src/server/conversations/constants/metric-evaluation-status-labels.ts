import { MetricEvaluationStatus } from '@/generated/prisma/enums';

export const MetricEvaluationStatusLabel: Record<
  MetricEvaluationStatus,
  string
> = {
  [MetricEvaluationStatus.pending]: 'Pending',
  [MetricEvaluationStatus.running]: 'Running',
  [MetricEvaluationStatus.completed]: 'Completed',
  [MetricEvaluationStatus.skipped]: 'Not applicable',
  [MetricEvaluationStatus.failed]: 'Failed',
};
