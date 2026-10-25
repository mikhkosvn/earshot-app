import { MetricType } from '@/generated/prisma/enums';

export const MetricTypeLabel: Record<MetricType, string> = {
  [MetricType.basic]: 'Basic',
  [MetricType.custom_prompt]: 'Custom Prompt',
  [MetricType.custom_code]: 'Python',
  [MetricType.llm_judge]: 'LLM Judge',
};
