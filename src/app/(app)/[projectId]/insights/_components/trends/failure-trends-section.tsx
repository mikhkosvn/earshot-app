'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { useInsightsOverviewQuery } from '../../_hooks/queries/use-insights-overview-query';
import { FailureTrendChart } from './failure-trend-chart';

export function FailureTrendsSection() {
  const { data: overview } = useInsightsOverviewQuery();

  return (
    <Collapsible className="rounded-lg border bg-background">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <p className="text-xs">
          <span className="font-semibold">Failure modes over time</span>{' '}
          <span className="text-muted-foreground">
            See how the rate of each failure mode moved in this range.
          </span>
        </p>
        <CollapsibleTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="group/trends text-xs"
            />
          }
        >
          <ChevronDownIcon className="transition-transform group-data-panel-open/trends:rotate-180" />
          View graphs
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="grid gap-3 border-t p-3 lg:grid-cols-2">
          {overview.trends.map((series) => (
            <FailureTrendChart key={series.metricId} series={series} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
