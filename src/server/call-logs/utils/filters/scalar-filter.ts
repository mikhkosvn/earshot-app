import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { FilterOperator } from '@/server/call-logs/constants/call-filter';
import type { FilterCondition, FilterValue } from '@/server/call-logs/types';
import { ActionError } from '@/server/common/run-action';

export const filterError = (field: string) =>
  new ActionError(`The filter on "${field}" is not valid.`, 400);

const listOf = (value: FilterValue) => {
  if (Array.isArray(value)) return value;
  if (value === null) return [];
  return [value];
};

export const textFilter = ({
  field,
  op,
  value,
}: FilterCondition): Prisma.StringFilter => {
  const text = String(value ?? '');
  switch (op) {
    case FilterOperator.eq:
      return { equals: text };
    case FilterOperator.neq:
      return { not: text };
    case FilterOperator.contains:
      return { contains: text, mode: Prisma.QueryMode.insensitive };
    case FilterOperator.startswith:
      return { startsWith: text, mode: Prisma.QueryMode.insensitive };
    case FilterOperator.in:
      return { in: listOf(value).map(String) };
    default:
      throw filterError(field);
  }
};

export const nullableTextFilter = (
  condition: FilterCondition,
): Prisma.StringNullableFilter => {
  if (condition.op !== FilterOperator.isnull) return textFilter(condition);
  if (condition.value === false) return { not: null };
  return { equals: null };
};

export const numberFilter = (
  { field, op, value }: FilterCondition,
  number: number,
): Prisma.FloatNullableFilter => {
  switch (op) {
    case FilterOperator.eq:
      return { equals: number };
    case FilterOperator.neq:
      return { not: number };
    case FilterOperator.gt:
      return { gt: number };
    case FilterOperator.gte:
      return { gte: number };
    case FilterOperator.lt:
      return { lt: number };
    case FilterOperator.lte:
      return { lte: number };
    case FilterOperator.in:
      return { in: listOf(value).map(Number) };
    default:
      throw filterError(field);
  }
};

export const idFilter = ({
  field,
  op,
  value,
}: FilterCondition): Prisma.IntFilter => {
  const ids = listOf(value).map(Number);
  if (ids.length === 0 || ids.some((id) => !Number.isInteger(id))) {
    throw filterError(field);
  }
  switch (op) {
    case FilterOperator.eq:
      return { equals: ids[0] };
    case FilterOperator.neq:
      return { not: ids[0] };
    case FilterOperator.in:
      return { in: ids };
    default:
      throw filterError(field);
  }
};

export const nullableIdFilter = (
  condition: FilterCondition,
): Prisma.IntNullableFilter => {
  if (condition.op !== FilterOperator.isnull) return idFilter(condition);
  if (condition.value === false) return { not: null };
  return { equals: null };
};

export const dateFilter = (
  { field, op }: FilterCondition,
  date: Date,
): Prisma.DateTimeNullableFilter => {
  switch (op) {
    case FilterOperator.eq:
      return { equals: date };
    case FilterOperator.gt:
      return { gt: date };
    case FilterOperator.gte:
      return { gte: date };
    case FilterOperator.lt:
      return { lt: date };
    case FilterOperator.lte:
      return { lte: date };
    default:
      throw filterError(field);
  }
};

export const filterValues = listOf;
