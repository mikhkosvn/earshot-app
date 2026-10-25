'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  OverviewFilterTab,
  OverviewFilterTabLabel,
} from '@/server/runs-overview/constants';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

import { FilterCountBadge } from './filter-count-badge';

interface FilterTabListProps {
  draft: RunsOverviewFilters;
}

const tabCount = (tab: OverviewFilterTab, draft: RunsOverviewFilters) => {
  switch (tab) {
    case OverviewFilterTab.agents:
      return Number(draft.agentId !== null);
    case OverviewFilterTab.tags:
      return draft.tagIds.length;
    case OverviewFilterTab.personality:
      return draft.personalityIds.length;
    case OverviewFilterTab.scenarios:
      return draft.evaluatorIds.length;
    case OverviewFilterTab.folders:
      return draft.folderIds.length;
    case OverviewFilterTab.monitors:
      return draft.monitorIds.length;
    case OverviewFilterTab.runSource:
      return draft.runSources.length;
    default:
      return draft.resultIds.length + draft.runIds.length;
  }
};

export function FilterTabList({ draft }: FilterTabListProps) {
  return (
    <TabsList className="w-full gap-1 bg-transparent p-0">
      {Object.values(OverviewFilterTab).map((tab) => (
        <TabsTrigger
          key={tab}
          value={tab}
          className="justify-between rounded-md border bg-background px-3 py-1.5 text-sm data-active:bg-muted"
        >
          {OverviewFilterTabLabel[tab]}
          <FilterCountBadge count={tabCount(tab, draft)} />
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
