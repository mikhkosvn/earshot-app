'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  isPredefinedTab,
  PREDEFINED_TABS,
  PredefinedTab,
} from '../../_constants/predefined-tab';
import { MetricService } from '../../_service';
import { filterPredefinedCards } from '../../_utils/predefined-cards';
import { toggleItem } from '../../_utils/toggle-item';
import { PredefinedCardList } from './cards/predefined-card-list';
import { CreatePredefinedButton } from './create-predefined-button';
import { PredefinedSelectAll } from './predefined-select-all';

interface PredefinedMetricsContentProps {
  onCreated: () => void;
}

export function PredefinedMetricsContent({
  onCreated,
}: PredefinedMetricsContentProps) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<PredefinedTab>(PredefinedTab.all);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const projectId = useCurrentProjectId();
  const { data: cards } = useSuspenseQuery(
    MetricService.getPredefinedQuery({ projectId }),
  );
  const visible = filterPredefinedCards(cards, search, tab);
  const available = visible.filter((card) => !card.added);
  const added = visible.filter((card) => card.added);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-3 pb-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            placeholder="Search metrics by name, description, or code..."
            aria-label="Search metrics by name, description, or code..."
            className="h-9 pl-9 text-xs md:text-xs"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <Tabs
        value={tab}
        onValueChange={(value) => {
          if (isPredefinedTab(value)) setTab(value);
        }}
        className="border-y px-3 py-1.5"
      >
        <TabsList variant="line" className="h-7">
          {PREDEFINED_TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="text-xs"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <PredefinedSelectAll
        cards={available}
        selectedCodes={selectedCodes}
        onSelectedCodesChange={setSelectedCodes}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <PredefinedCardList
          available={available}
          added={added}
          selectedCodes={selectedCodes}
          onToggle={(code, checked) =>
            setSelectedCodes(toggleItem(selectedCodes, code, checked))
          }
        />
      </div>
      <div className="flex items-center justify-between border-t px-3 py-2.5 text-xs">
        <span className="text-muted-foreground">
          {selectedCodes.length} metrics selected
        </span>
        <CreatePredefinedButton codes={selectedCodes} onCreated={onCreated} />
      </div>
    </div>
  );
}
