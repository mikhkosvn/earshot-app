import { EvaluationTrigger } from '@/generated/prisma/enums';

export const EvaluationTriggerLabel: Record<EvaluationTrigger, string> = {
  [EvaluationTrigger.always]: 'Always',
  [EvaluationTrigger.automatic]: 'Automatic',
  [EvaluationTrigger.custom]: 'Custom',
};
