import { ScenarioType } from '@/generated/prisma/enums';

export const ScenarioTypeLabel: Record<ScenarioType, string> = {
  [ScenarioType.instruction]: 'Instruction',
  [ScenarioType.conditional_actions]: 'Conditional Actions',
};
