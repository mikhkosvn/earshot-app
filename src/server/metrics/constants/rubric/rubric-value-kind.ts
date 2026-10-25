import { ComparisonOperator } from '@/generated/prisma/enums';

export const RubricValueKind = {
  boolean: 'boolean',
  number: 'number',
  enum: 'enum',
} as const;

export type RubricValueKind =
  (typeof RubricValueKind)[keyof typeof RubricValueKind];

export const RUBRIC_OPERATORS: Record<RubricValueKind, ComparisonOperator[]> = {
  [RubricValueKind.boolean]: [ComparisonOperator.eq, ComparisonOperator.neq],
  [RubricValueKind.number]: [
    ComparisonOperator.gt,
    ComparisonOperator.gte,
    ComparisonOperator.lt,
    ComparisonOperator.lte,
    ComparisonOperator.eq,
  ],
  [RubricValueKind.enum]: [
    ComparisonOperator.eq,
    ComparisonOperator.neq,
    ComparisonOperator.in,
  ],
};

export const RubricField = {
  score: 'score',
  enum: 'enum',
} as const;

export type RubricField = (typeof RubricField)[keyof typeof RubricField];

export const LEGACY_PASS_SCORE = 5;

export const LEGACY_FAIL_SCORE = 0;
