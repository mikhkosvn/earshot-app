'use client';

import { FilterIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs } from '@/components/ui/tabs';
import { EMPTY_RUNS_OVERVIEW_FILTERS } from '@/server/runs-overview/constants/empty-filters';
import { OverviewFilterTab } from '@/server/runs-overview/constants';

import { useOverviewFilters } from '../../_hooks/use-overview-filters';
import { useRunsOverviewParams } from '../../_hooks/use-runs-overview-params';
import {
  sameOverviewFilters,
  serializeOverviewFilters,
} from '../../_utils/overview-filters-param';
import { FilterTabList } from './filter-tab-list';
import { FilterTabPanels } from './panels/filter-tab-panels';

type OverviewFiltersFormProps = {
  onApplied: () => void;
};

export function OverviewFiltersForm({ onApplied }: OverviewFiltersFormProps) {
  const applied = useOverviewFilters();
  const [, setParams] = useRunsOverviewParams();
  const [draft, setDraft] = useState(applied);
  const [search, setSearch] = useState('');

  return (
    <Tabs
      defaultValue={OverviewFilterTab.agents}
      orientation="vertical"
      className="grid min-h-0 grid-cols-[13rem_1fr] grid-rows-[auto_1fr] gap-0"
      onValueChange={() => setSearch('')}
    >
      <div className="col-span-2 flex items-center justify-between border-b px-4 py-3">
        <DialogTitle className="text-base">Filter options</DialogTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDraft(EMPTY_RUNS_OVERVIEW_FILTERS)}
        >
          Clear all
        </Button>
      </div>
      <div className="flex min-h-0 flex-col gap-2 border-r bg-muted/40 p-2">
        <h2 className="px-1 text-sm font-medium">Select your filter</h2>
        <FilterTabList draft={draft} />
        <Button
          size="sm"
          className="mt-auto"
          disabled={sameOverviewFilters(draft, applied)}
          onClick={() => {
            void setParams({ filters: serializeOverviewFilters(draft) });
            onApplied();
          }}
        >
          <FilterIcon />
          Apply filters
        </Button>
      </div>
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center gap-2 border-b p-2">
          <SearchIcon className="size-4 text-muted-foreground" />
          <Input
            value={search}
            placeholder="Search..."
            aria-label="Search..."
            className="h-8 border-none shadow-none focus-visible:ring-0"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <FilterTabPanels draft={draft} search={search} onChange={setDraft} />
      </div>
    </Tabs>
  );
}
