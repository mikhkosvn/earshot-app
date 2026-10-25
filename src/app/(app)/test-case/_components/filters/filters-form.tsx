'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FilterTab, FilterTabLabel } from '../../_constants/filter-tab';
import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';
import { AgentFilterPanel } from './agent-filter-panel';
import { MetricFilterPanel } from './metric-filter-panel';
import { PersonalityFilterPanel } from './personality-filter-panel';
import { TagFilterPanel } from './tag-filter-panel';

type FiltersFormProps = {
  onDone: () => void;
};

export function FiltersForm({ onDone }: FiltersFormProps) {
  const [params, setParams] = useEvaluatorListParams();
  const initial = {
    tags: params.tags,
    tagLogic: params.tagLogic,
    personalities: params.personalities,
    agents: params.agents,
    metrics: params.metrics,
    metricLogic: params.metricLogic,
  };
  const [draft, setDraft] = useState(initial);
  const isChanged = JSON.stringify(draft) !== JSON.stringify(initial);

  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue={FilterTab.tags} className="gap-3">
        <TabsList>
          {Object.values(FilterTab).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {FilterTabLabel[tab]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={FilterTab.tags}>
          <TagFilterPanel
            value={draft.tags}
            onValueChange={(tags) => setDraft({ ...draft, tags })}
            logic={draft.tagLogic}
            onLogicChange={(tagLogic) => setDraft({ ...draft, tagLogic })}
          />
        </TabsContent>
        <TabsContent value={FilterTab.personality}>
          <PersonalityFilterPanel
            value={draft.personalities}
            onValueChange={(personalities) =>
              setDraft({ ...draft, personalities })
            }
          />
        </TabsContent>
        <TabsContent value={FilterTab.agents}>
          <AgentFilterPanel
            value={draft.agents}
            onValueChange={(agents) => setDraft({ ...draft, agents })}
          />
        </TabsContent>
        <TabsContent value={FilterTab.metrics}>
          <MetricFilterPanel
            value={draft.metrics}
            onValueChange={(metrics) => setDraft({ ...draft, metrics })}
            logic={draft.metricLogic}
            onLogicChange={(metricLogic) => setDraft({ ...draft, metricLogic })}
          />
        </TabsContent>
      </Tabs>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="ghost" />}>
          Cancel
        </DialogClose>
        <Button
          type="button"
          disabled={!isChanged}
          onClick={() => {
            void setParams({ ...draft, page: null });
            onDone();
          }}
        >
          Apply
        </Button>
      </DialogFooter>
    </div>
  );
}
