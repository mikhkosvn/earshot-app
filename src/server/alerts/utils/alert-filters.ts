import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { alertFiltersSchema } from '@/server/alerts/schemas';
import type { AlertFilters } from '@/server/alerts/types';

export const EMPTY_ALERT_FILTERS: AlertFilters = { agentIds: [], metadata: [] };

export const parseAlertFilters = (value: Prisma.JsonValue | null) => {
  const parsed = alertFiltersSchema.safeParse(value);
  if (!parsed.success) return EMPTY_ALERT_FILTERS;
  return parsed.data;
};

const metadataValueOf = (metadata: Prisma.JsonValue | null, key: string) => {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return undefined;
  }
  return metadata[key];
};

const textOf = (value: Prisma.JsonValue | undefined) => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

export const matchesAlertFilters = (
  filters: AlertFilters,
  call: { agentId: number | null; metadata: Prisma.JsonValue | null },
) => {
  if (
    filters.agentIds.length > 0 &&
    (call.agentId === null || !filters.agentIds.includes(call.agentId))
  ) {
    return false;
  }
  return filters.metadata.every(
    (row) => textOf(metadataValueOf(call.metadata, row.key)) === row.value,
  );
};

export const hasAlertFilters = (filters: AlertFilters) =>
  filters.agentIds.length > 0 || filters.metadata.length > 0;
