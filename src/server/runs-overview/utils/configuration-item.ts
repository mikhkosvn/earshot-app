import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { EMPTY_RUNS_OVERVIEW_FILTERS } from '@/server/runs-overview/constants/empty-filters';
import { runsOverviewFiltersSchema } from '@/server/runs-overview/schemas';
import type { RunsOverviewConfigurationItem } from '@/server/runs-overview/types';

export const configurationSelect = {
  id: true,
  name: true,
  rangeFrom: true,
  rangeTo: true,
  filters: true,
  includeMetricVisibility: true,
  hiddenMetrics: { select: { metricId: true } },
} satisfies Prisma.RunsOverviewConfigurationSelect;

type ConfigurationRecord = Prisma.RunsOverviewConfigurationGetPayload<{
  select: typeof configurationSelect;
}>;

const filtersOf = (json: Prisma.JsonValue) => {
  const parsed = runsOverviewFiltersSchema.safeParse(json);
  if (!parsed.success) return EMPTY_RUNS_OVERVIEW_FILTERS;
  return parsed.data;
};

export const toConfigurationItem = (
  record: ConfigurationRecord,
): RunsOverviewConfigurationItem => ({
  id: record.id,
  name: record.name,
  rangeFrom: record.rangeFrom,
  rangeTo: record.rangeTo,
  filters: filtersOf(record.filters),
  includeMetricVisibility: record.includeMetricVisibility,
  hiddenMetricIds: record.hiddenMetrics.map((hidden) => hidden.metricId),
});
