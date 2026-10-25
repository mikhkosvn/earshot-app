import { MetricCategory } from '@/generated/prisma/enums';
import { MetricCategoryLabel } from '@/server/metrics/constants/metric-category-labels';

export const PredefinedTab = {
  all: 'all',
  ...MetricCategory,
} as const;

export type PredefinedTab = (typeof PredefinedTab)[keyof typeof PredefinedTab];

export const PREDEFINED_TABS: { value: PredefinedTab; label: string }[] = [
  { value: PredefinedTab.all, label: 'All' },
  {
    value: MetricCategory.accuracy,
    label: MetricCategoryLabel[MetricCategory.accuracy],
  },
  {
    value: MetricCategory.conversation_quality,
    label: MetricCategoryLabel[MetricCategory.conversation_quality],
  },
  {
    value: MetricCategory.customer_experience,
    label: MetricCategoryLabel[MetricCategory.customer_experience],
  },
  {
    value: MetricCategory.speech_quality,
    label: MetricCategoryLabel[MetricCategory.speech_quality],
  },
];
