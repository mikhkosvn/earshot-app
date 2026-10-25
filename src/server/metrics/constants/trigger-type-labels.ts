import { TriggerType } from '@/generated/prisma/enums';

export const TriggerTypeLabel: Record<TriggerType, string> = {
  [TriggerType.llm_judge]: 'LLM Judge',
  [TriggerType.custom_code]: 'Python',
};
