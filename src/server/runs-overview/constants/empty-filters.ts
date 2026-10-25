import type { RunsOverviewFilters } from '@/server/runs-overview/types';

export const EMPTY_RUNS_OVERVIEW_FILTERS: RunsOverviewFilters = {
  agentId: null,
  tagIds: [],
  personalityIds: [],
  evaluatorIds: [],
  folderIds: [],
  monitorIds: [],
  runSources: [],
  resultIds: [],
  runIds: [],
};
