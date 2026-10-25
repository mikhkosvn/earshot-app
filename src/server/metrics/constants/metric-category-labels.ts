import { MetricCategory } from '@/generated/prisma/enums';

export const MetricCategoryLabel: Record<MetricCategory, string> = {
  [MetricCategory.speech_quality]: 'Speech Quality',
  [MetricCategory.conversation_quality]: 'Conversation Quality',
  [MetricCategory.accuracy]: 'Accuracy',
  [MetricCategory.customer_experience]: 'Customer Experience',
};
