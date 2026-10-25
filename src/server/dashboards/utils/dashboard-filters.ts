import 'server-only';

import { z } from 'zod';

import type { Prisma } from '@/generated/prisma/client';
import { DEFAULT_DASHBOARD_FILTERS } from '@/server/dashboards/constants/dashboard-defaults';
import {
  FilterField,
  FilterGroupOperator,
  FilterOp,
  METADATA_FIELD_PREFIX,
} from '@/server/dashboards/constants/filter-grammar';
import type { DashboardFilterState } from '@/server/dashboards/types';

const storedConditionSchema = z.object({
  field: z.string(),
  op: z.string(),
  value: z.unknown(),
});

const storedGroupSchema = z.object({
  operator: z.string(),
  conditions: z.array(z.unknown()),
});

type StoredCondition = z.output<typeof storedConditionSchema>;

const conditionsOf = (json: unknown): StoredCondition[] => {
  const group = storedGroupSchema.safeParse(json);
  if (!group.success) return [];
  return group.data.conditions.flatMap((condition) => {
    const parsed = storedConditionSchema.safeParse(condition);
    if (!parsed.success) return [];
    return [parsed.data];
  });
};

const findValue = (conditions: StoredCondition[], field: string, op: string) =>
  conditions.find((item) => item.field === field && item.op === op)?.value;

const stringOr = (value: unknown, fallback: string) => {
  if (typeof value === 'string' && value.trim()) return value;
  return fallback;
};

const agentIdOf = (value: unknown) => {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value;
  }
  return null;
};

export const fromStoredFilters = (json: unknown): DashboardFilterState => {
  const conditions = conditionsOf(json);
  return {
    from: stringOr(
      findValue(conditions, FilterField.timestamp, FilterOp.gte),
      DEFAULT_DASHBOARD_FILTERS.from,
    ),
    to: stringOr(
      findValue(conditions, FilterField.timestamp, FilterOp.lte),
      DEFAULT_DASHBOARD_FILTERS.to,
    ),
    agentId: agentIdOf(findValue(conditions, FilterField.agentId, FilterOp.eq)),
    metadata: conditions.flatMap((condition) => {
      if (!condition.field.startsWith(METADATA_FIELD_PREFIX)) return [];
      if (condition.op !== FilterOp.eq) return [];
      return [
        {
          key: condition.field.slice(METADATA_FIELD_PREFIX.length),
          value: String(condition.value),
        },
      ];
    }),
  };
};

const agentConditions = (agentId: number | null) => {
  if (agentId === null) return [];
  return [{ field: FilterField.agentId, op: FilterOp.eq, value: agentId }];
};

export const toStoredFilters = (
  filters: DashboardFilterState,
): Prisma.InputJsonObject => ({
  operator: FilterGroupOperator.and,
  conditions: [
    { field: FilterField.timestamp, op: FilterOp.gte, value: filters.from },
    { field: FilterField.timestamp, op: FilterOp.lte, value: filters.to },
    ...agentConditions(filters.agentId),
    ...filters.metadata.map((condition) => ({
      field: `${METADATA_FIELD_PREFIX}${condition.key}`,
      op: FilterOp.eq,
      value: condition.value,
    })),
  ],
});

export const storedOutcomeFilter = (json: unknown) => {
  const value = findValue(conditionsOf(json), FilterField.success, FilterOp.eq);
  if (typeof value === 'boolean') return value;
  return null;
};
