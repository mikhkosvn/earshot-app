import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  CallEvaluationStatus,
  CallProcessingStatus,
} from '@/generated/prisma/enums';
import { FilterOperator } from '@/server/call-logs/constants/call-filter';
import {
  FAILURE_STATUSES,
  REVIEW_STATUSES,
  SUCCESS_STATUSES,
} from '@/server/call-logs/constants/call-review';
import {
  filterError,
  filterValues,
} from '@/server/call-logs/utils/filters/scalar-filter';
import type { FilterCondition } from '@/server/call-logs/types';

const isEvaluationStatus = (value: string): value is CallEvaluationStatus =>
  Object.values<string>(CallEvaluationStatus).includes(value);

const isProcessingStatus = (value: string): value is CallProcessingStatus =>
  Object.values<string>(CallProcessingStatus).includes(value);

const oneStatusWhere = (value: string): Prisma.CallLogWhereInput => {
  if (isEvaluationStatus(value)) return { evaluationStatus: value };
  if (isProcessingStatus(value)) {
    return { status: value, evaluationStatus: null };
  }
  throw filterError('status');
};

export const statusWhere = (
  condition: FilterCondition,
): Prisma.CallLogWhereInput => {
  const values = filterValues(condition.value).map(String);
  if (condition.op === FilterOperator.eq && values.length === 1) {
    return oneStatusWhere(values[0]);
  }
  if (condition.op === FilterOperator.neq && values.length === 1) {
    return { NOT: oneStatusWhere(values[0]) };
  }
  if (condition.op === FilterOperator.in) {
    return { OR: values.map(oneStatusWhere) };
  }
  throw filterError(condition.field);
};

const statusesOf = (value: boolean) => {
  if (value) return SUCCESS_STATUSES;
  return FAILURE_STATUSES;
};

const wantsNull = ({ op, value }: FilterCondition) => {
  if (op === FilterOperator.isnull) return value !== false;
  return op === FilterOperator.eq;
};

export const successWhere = (
  condition: FilterCondition,
): Prisma.CallLogWhereInput => {
  const { op, value } = condition;
  if (value === null || op === FilterOperator.isnull) {
    if (wantsNull(condition)) return { evaluationStatus: null };
    return { evaluationStatus: { not: null } };
  }
  if (typeof value !== 'boolean') throw filterError(condition.field);
  if (op === FilterOperator.eq)
    return { evaluationStatus: { in: statusesOf(value) } };
  if (op === FilterOperator.neq) {
    return { evaluationStatus: { in: statusesOf(!value) } };
  }
  throw filterError(condition.field);
};

export const reviewedWhere = (
  condition: FilterCondition,
): Prisma.CallLogWhereInput => {
  const reviewed =
    (condition.op === FilterOperator.eq && condition.value === true) ||
    (condition.op === FilterOperator.neq && condition.value === false);
  if (reviewed) return { evaluationStatus: { in: REVIEW_STATUSES } };
  return {
    OR: [
      { evaluationStatus: null },
      { evaluationStatus: { notIn: REVIEW_STATUSES } },
    ],
  };
};
