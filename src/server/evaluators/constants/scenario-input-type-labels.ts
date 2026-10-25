import { ScenarioType } from '@/generated/prisma/enums';

export const ScenarioInputTypeLabel: Record<ScenarioType, string> = {
  [ScenarioType.instruction]: 'Instruction',
  [ScenarioType.conditional_actions]: 'Structured Test Case',
};

export const EvaluatorFormatLabel: Record<ScenarioType, string> = {
  [ScenarioType.instruction]: 'Prompt-based',
  [ScenarioType.conditional_actions]: 'Conditional actions',
};
