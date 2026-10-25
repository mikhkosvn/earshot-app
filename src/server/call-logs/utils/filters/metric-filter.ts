import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  CallFilterField,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';
import {
  filterError,
  idFilter,
  nullableTextFilter,
  numberFilter,
} from '@/server/call-logs/utils/filters/scalar-filter';
import type { FilterCondition } from '@/server/call-logs/types';

const nullValueWhere = (
  condition: FilterCondition,
): Prisma.MetricEvaluationWhereInput => {
  const allNull = { valueNumber: null, valueBoolean: null, valueText: null };
  if (condition.op === FilterOperator.eq) return allNull;
  if (condition.op === FilterOperator.neq) return { NOT: allNull };
  throw filterError(condition.field);
};

const valueWhere = (
  condition: FilterCondition,
): Prisma.MetricEvaluationWhereInput => {
  const { value, op } = condition;
  if (value === null) return nullValueWhere(condition);
  if (typeof value === 'boolean') {
    if (op === FilterOperator.eq) return { valueBoolean: value };
    if (op === FilterOperator.neq) return { valueBoolean: !value };
    throw filterError(condition.field);
  }
  if (typeof value === 'number') {
    return { valueNumber: numberFilter(condition, value) };
  }
  return { valueText: nullableTextFilter(condition) };
};

export const metricConditionWhere = (
  condition: FilterCondition,
): Prisma.MetricEvaluationWhereInput => {
  if (condition.field === CallFilterField.metricId) {
    return { metricId: idFilter(condition) };
  }
  if (condition.field === CallFilterField.metricValue) {
    return valueWhere(condition);
  }
  throw filterError(condition.field);
};
