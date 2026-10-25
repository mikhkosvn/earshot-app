import { ComparisonOperator } from '@/generated/prisma/enums';

export const ComparisonOperatorLabel: Record<ComparisonOperator, string> = {
  [ComparisonOperator.eq]: '=',
  [ComparisonOperator.neq]: '≠',
  [ComparisonOperator.gt]: '>',
  [ComparisonOperator.gte]: '≥',
  [ComparisonOperator.lt]: '<',
  [ComparisonOperator.lte]: '≤',
  [ComparisonOperator.in]: 'in',
};
