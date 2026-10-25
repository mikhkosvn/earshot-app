import { MetricEvalType } from '@/generated/prisma/enums';

export const MetricEvalTypeLabel: Record<MetricEvalType, string> = {
  [MetricEvalType.binary]: 'Boolean',
  [MetricEvalType.continuous_qualitative]: 'Rating',
  [MetricEvalType.numeric]: 'Numeric',
  [MetricEvalType.enum]: 'Enum',
};
