import { ThresholdOperator } from '@/generated/prisma/enums';

export const ThresholdOperatorLabel: Record<ThresholdOperator, string> = {
  [ThresholdOperator.gt]: 'Above',
  [ThresholdOperator.lt]: 'Below',
  [ThresholdOperator.outside]: 'Outside',
};
