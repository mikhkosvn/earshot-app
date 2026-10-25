import { filterNodeListSchema } from '@/server/call-logs/schemas/filters';
import type { FilterNode } from '@/server/call-logs/types';

const readJson = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const parseFilterParam = (value: string): FilterNode[] => {
  if (!value) return [];
  const parsed = filterNodeListSchema.safeParse(readJson(value));
  if (!parsed.success) return [];
  return parsed.data;
};

export const serializeFilterParam = (nodes: FilterNode[]) => {
  if (nodes.length === 0) return null;
  return JSON.stringify(nodes);
};
