import { ComparisonOperator, MetricEvalType } from '@/generated/prisma/enums';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';

export const PASS_FIELD_LABEL = 'score';

export const PassOperatorLabel: Partial<Record<ComparisonOperator, string>> = {
  [ComparisonOperator.gt]: '>',
  [ComparisonOperator.gte]: '≥',
  [ComparisonOperator.lt]: '<',
  [ComparisonOperator.lte]: '≤',
  [ComparisonOperator.eq]: '=',
  [ComparisonOperator.neq]: '≠',
};

export const PASS_OPERATORS: Record<RubricValueKind, ComparisonOperator[]> = {
  [RubricValueKind.boolean]: [ComparisonOperator.eq, ComparisonOperator.neq],
  [RubricValueKind.number]: [
    ComparisonOperator.gt,
    ComparisonOperator.gte,
    ComparisonOperator.lt,
    ComparisonOperator.lte,
    ComparisonOperator.eq,
  ],
  [RubricValueKind.enum]: [ComparisonOperator.eq, ComparisonOperator.neq],
};

export const DEFAULT_PASS_NUMBER: Record<MetricEvalType, number> = {
  [MetricEvalType.numeric]: 1,
  [MetricEvalType.continuous_qualitative]: RATING_SCALE_MAX - 1,
  [MetricEvalType.binary]: 1,
  [MetricEvalType.enum]: 1,
};

export const BooleanPassValue = {
  true: 'true',
  false: 'false',
} as const;

export type BooleanPassValue =
  (typeof BooleanPassValue)[keyof typeof BooleanPassValue];
