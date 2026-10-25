import {
  OverviewFilterTab,
  OverviewFilterTabLabel,
  RunSourceLabel,
} from '@/server/runs-overview/constants';
import type {
  FilterOption,
  RunsOverviewFilterOptions,
  RunsOverviewFilters,
} from '@/server/runs-overview/types';

const labelsOf = (ids: number[], options: FilterOption[]) =>
  ids.map(
    (id) => options.find((option) => option.id === id)?.label ?? String(id),
  );

const line = (title: string, values: string[]) => {
  if (values.length === 0) return [];
  return [`${title}: ${values.join(', ')}`];
};

const agentValues = (agentId: number | null, options: FilterOption[]) => {
  if (agentId === null) return [];
  return labelsOf([agentId], options);
};

export const filterSummaryLines = (
  filters: RunsOverviewFilters,
  options: RunsOverviewFilterOptions,
) => [
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.agents],
    agentValues(filters.agentId, options.agents),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.tags],
    labelsOf(filters.tagIds, options.tags),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.personality],
    labelsOf(filters.personalityIds, options.personalities),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.scenarios],
    labelsOf(filters.evaluatorIds, options.scenarios),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.folders],
    labelsOf(filters.folderIds, options.folders),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.monitors],
    labelsOf(filters.monitorIds, options.monitors),
  ),
  ...line(
    OverviewFilterTabLabel[OverviewFilterTab.runSource],
    filters.runSources.map((source) => RunSourceLabel[source]),
  ),
  ...line('Result IDs', filters.resultIds.map(String)),
  ...line('Run IDs', filters.runIds.map(String)),
];
