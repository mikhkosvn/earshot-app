import { MetricPriority } from '@/generated/prisma/enums';

export const MetricPriorityLabel: Record<MetricPriority, string> = {
  [MetricPriority.critical]: 'Critical',
  [MetricPriority.non_critical]: 'Non Critical',
  [MetricPriority.not_a_bug]: 'Not A Bug',
};
