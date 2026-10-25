'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ResultMetricTile } from '@/server/results/types';

import { MetricRunTab } from '../../../_constants/result-detail';
import { defaultRunTab, runsOfTab } from '../../../_utils/metric-runs';
import { MetricPopupInfo } from './metric-popup-info';
import { MetricRunList } from './metric-run-list';

interface MetricOutcomeTabsProps {
  tile: ResultMetricTile;
  onOpenRun: (runId: number) => void;
}

export function MetricOutcomeTabs({ tile, onOpenRun }: MetricOutcomeTabsProps) {
  const failureRuns = runsOfTab(tile.runs, MetricRunTab.failure);
  const successRuns = runsOfTab(tile.runs, MetricRunTab.success);

  return (
    <Tabs defaultValue={defaultRunTab(tile.runs)} className="gap-3">
      <DialogHeader className="flex-row flex-wrap items-center gap-4">
        <DialogTitle>{tile.name}</DialogTitle>
        <TabsList>
          <TabsTrigger value={MetricRunTab.failure} className="text-red-600">
            Failure ({failureRuns.length})
          </TabsTrigger>
          <TabsTrigger value={MetricRunTab.success} className="text-green-700">
            Success ({successRuns.length})
          </TabsTrigger>
        </TabsList>
      </DialogHeader>
      <MetricPopupInfo tile={tile} />
      <TabsContent value={MetricRunTab.failure}>
        <MetricRunList runs={failureRuns} onOpenRun={onOpenRun} />
      </TabsContent>
      <TabsContent value={MetricRunTab.success}>
        <MetricRunList runs={successRuns} onOpenRun={onOpenRun} />
      </TabsContent>
    </Tabs>
  );
}
