import { InterruptionLevel } from '@/generated/prisma/enums';

export const InterruptionLevelLabel: Record<InterruptionLevel, string> = {
  [InterruptionLevel.off]: 'Off',
  [InterruptionLevel.low]: 'Low',
  [InterruptionLevel.medium]: 'Medium',
  [InterruptionLevel.high]: 'High',
};
