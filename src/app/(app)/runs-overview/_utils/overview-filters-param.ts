import { EMPTY_RUNS_OVERVIEW_FILTERS } from '@/server/runs-overview/constants/empty-filters';
import { runsOverviewFiltersSchema } from '@/server/runs-overview/schemas';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

const readJson = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const parseOverviewFilters = (value: string): RunsOverviewFilters => {
  if (!value) return EMPTY_RUNS_OVERVIEW_FILTERS;
  const parsed = runsOverviewFiltersSchema.safeParse(readJson(value));
  if (!parsed.success) return EMPTY_RUNS_OVERVIEW_FILTERS;
  return parsed.data;
};

export const activeFilterCount = (filters: RunsOverviewFilters) =>
  Number(filters.agentId !== null) +
  filters.tagIds.length +
  filters.personalityIds.length +
  filters.evaluatorIds.length +
  filters.folderIds.length +
  filters.monitorIds.length +
  filters.runSources.length +
  filters.resultIds.length +
  filters.runIds.length;

export const serializeOverviewFilters = (filters: RunsOverviewFilters) => {
  if (activeFilterCount(filters) === 0) return null;
  return JSON.stringify(filters);
};

export const sameOverviewFilters = (
  left: RunsOverviewFilters,
  right: RunsOverviewFilters,
) => JSON.stringify(left) === JSON.stringify(right);
