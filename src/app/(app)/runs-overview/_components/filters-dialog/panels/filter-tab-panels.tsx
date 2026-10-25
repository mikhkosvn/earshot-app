'use client';

import { TabsContent } from '@/components/ui/tabs';
import { OverviewFilterTab } from '@/server/runs-overview/constants';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

import { useFilterOptionsQuery } from '../../../_hooks/use-filter-options-query';
import { AgentPanel } from './agent-panel';
import { CheckboxPanel } from './checkbox-panel';
import { IdsPanel } from './ids-panel';
import { RunSourcePanel } from './run-source-panel';
import { ScenarioPanel } from './scenario-panel';

type FilterTabPanelsProps = {
  draft: RunsOverviewFilters;
  search: string;
  onChange: (draft: RunsOverviewFilters) => void;
};

const PANEL_CLASS = 'min-h-0 overflow-y-auto p-3';

export function FilterTabPanels({
  draft,
  search,
  onChange,
}: FilterTabPanelsProps) {
  const { data: options } = useFilterOptionsQuery();
  const panelProps = { draft, search, onChange };

  return (
    <>
      <TabsContent value={OverviewFilterTab.agents} className={PANEL_CLASS}>
        <AgentPanel {...panelProps} options={options.agents} />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.tags} className={PANEL_CLASS}>
        <CheckboxPanel
          {...panelProps}
          options={options.tags}
          listKey="tagIds"
        />
      </TabsContent>
      <TabsContent
        value={OverviewFilterTab.personality}
        className={PANEL_CLASS}
      >
        <CheckboxPanel
          {...panelProps}
          options={options.personalities}
          listKey="personalityIds"
        />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.scenarios} className={PANEL_CLASS}>
        <ScenarioPanel {...panelProps} options={options.scenarios} />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.folders} className={PANEL_CLASS}>
        <CheckboxPanel
          {...panelProps}
          options={options.folders}
          listKey="folderIds"
        />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.monitors} className={PANEL_CLASS}>
        <CheckboxPanel
          {...panelProps}
          options={options.monitors}
          listKey="monitorIds"
        />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.runSource} className={PANEL_CLASS}>
        <RunSourcePanel draft={draft} onChange={onChange} />
      </TabsContent>
      <TabsContent value={OverviewFilterTab.ids} className={PANEL_CLASS}>
        <IdsPanel draft={draft} onChange={onChange} />
      </TabsContent>
    </>
  );
}
