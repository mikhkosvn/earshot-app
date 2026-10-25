import { MetricSubCategory } from '@/generated/prisma/enums';

export const MetricSubCategoryLabel: Record<MetricSubCategory, string> = {
  [MetricSubCategory.latency]: 'Latency',
  [MetricSubCategory.interruption]: 'Interruption',
  [MetricSubCategory.silence]: 'Silence',
  [MetricSubCategory.termination]: 'Termination',
  [MetricSubCategory.repetition]: 'Repetition',
};
