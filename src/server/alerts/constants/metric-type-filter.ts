import { MetricEvalType } from '@/generated/prisma/enums';

export const MetricEvalTypeLabel: Record<MetricEvalType, string> = {
  [MetricEvalType.binary]: 'Boolean',
  [MetricEvalType.continuous_qualitative]: 'Rating',
  [MetricEvalType.enum]: 'Enum',
  [MetricEvalType.numeric]: 'Numeric',
};

export const METRIC_TYPE_FILTER_ORDER: MetricEvalType[] = [
  MetricEvalType.binary,
  MetricEvalType.continuous_qualitative,
  MetricEvalType.enum,
  MetricEvalType.numeric,
];
