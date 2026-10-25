import { ThresholdOperator } from '@/generated/prisma/enums';

export const ThresholdOperatorLabel: Record<ThresholdOperator, string> = {
  [ThresholdOperator.gt]: 'Value > threshold',
  [ThresholdOperator.lt]: 'Value < threshold',
  [ThresholdOperator.outside]: 'Outside [low, high]',
};
