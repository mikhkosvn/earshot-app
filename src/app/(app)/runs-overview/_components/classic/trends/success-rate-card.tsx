'use client';

import { Maximize2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';
import { useRunsOverviewQuery } from '../../../_hooks/use-runs-overview-query';
import { OverviewChart } from './overview-chart';

const TITLE = 'Success rate over time';

export function SuccessRateCard() {
  const { data: overview } = useRunsOverviewQuery();
  const [{ chartType }] = useRunsOverviewParams();
  const [expanded, setExpanded] = useState(false);
  const points = overview.successRateSummary.map((point) => ({
    key: point.key,
    label: point.label,
    value: point.successRate,
  }));
  const chart = (
    <OverviewChart
      points={points}
      chartType={chartType}
      percent
      name="Success rate"
    />
  );

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{TITLE}</h3>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Expand chart"
          onClick={() => setExpanded(true)}
        >
          <Maximize2Icon />
        </Button>
      </div>
      {chart}
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>{TITLE}</DialogTitle>
          </DialogHeader>
          {chart}
        </DialogContent>
      </Dialog>
    </div>
  );
}
