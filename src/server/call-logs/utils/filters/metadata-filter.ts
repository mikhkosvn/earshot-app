import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { FilterOperator } from '@/server/call-logs/constants/call-filter';
import {
  filterError,
  filterValues,
} from '@/server/call-logs/utils/filters/scalar-filter';
import type { FilterCondition, FilterValue } from '@/server/call-logs/types';

const jsonValue = (value: FilterValue) => {
  if (value === null) return Prisma.AnyNull;
  return value;
};

const jsonFilter = (
  condition: FilterCondition,
  path: string[],
): Prisma.JsonNullableFilter<'Conversation'> => {
  const { op, value } = condition;
  switch (op) {
    case FilterOperator.eq:
      return { path, equals: jsonValue(value) };
    case FilterOperator.contains:
      return { path, string_contains: String(value) };
    case FilterOperator.startswith:
      return { path, string_starts_with: String(value) };
    case FilterOperator.gt:
      return { path, gt: Number(value) };
    case FilterOperator.gte:
      return { path, gte: Number(value) };
    case FilterOperator.lt:
      return { path, lt: Number(value) };
    case FilterOperator.lte:
      return { path, lte: Number(value) };
    default:
      throw filterError(condition.field);
  }
};

export const metadataWhere = (
  condition: FilterCondition,
  key: string,
): Prisma.CallLogWhereInput => {
  const path = [key];
  if (!key) throw filterError(condition.field);
  if (condition.op === FilterOperator.neq) {
    return {
      NOT: {
        conversation: {
          metadata: { path, equals: jsonValue(condition.value) },
        },
      },
    };
  }
  if (condition.op === FilterOperator.in) {
    return {
      OR: filterValues(condition.value).map((value) => ({
        conversation: { metadata: { path, equals: jsonValue(value) } },
      })),
    };
  }
  return { conversation: { metadata: jsonFilter(condition, path) } };
};
