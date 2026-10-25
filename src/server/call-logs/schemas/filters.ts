import { z } from 'zod';

import {
  FilterLogic,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';
import type {
  FilterCondition,
  FilterGroup,
  FilterNode,
} from '@/server/call-logs/types';

const filterScalarSchema = z.union([z.string(), z.number(), z.boolean()]);

export const filterValueSchema = z.union([
  filterScalarSchema,
  z.null(),
  z.array(filterScalarSchema),
]);

export const filterConditionSchema: z.ZodType<FilterCondition> = z.object({
  field: z.string().trim().min(1).max(200),
  op: z.enum(FilterOperator),
  value: filterValueSchema,
});

export const filterGroupSchema: z.ZodType<FilterGroup> = z.object({
  operator: z.enum(FilterLogic),
  get conditions(): z.ZodType<FilterNode[]> {
    return z.array(z.union([filterConditionSchema, filterGroupSchema])).max(50);
  },
});

export const filterNodeListSchema = z
  .array(z.union([filterConditionSchema, filterGroupSchema]))
  .max(50);
