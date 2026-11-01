'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';

import { useInsightsOverviewQuery } from '../../_hooks/queries/use-insights-overview-query';
import { FailureTrendChart } from './failure-trend-chart';

const TRENDS_ITEM_VALUE = 'trends';

const VIEW_GRAPHS_TRIGGER = buttonVariants({
  variant: 'outline',
  size: 'sm',
  className: 'flex-none items-center text-xs hover:no-underline',
});

export function FailureTrendsSection() {
  const { data: overview } = useInsightsOverviewQuery();

  return (
    <Accordion className="rounded-lg border bg-background">
      <AccordionItem value={TRENDS_ITEM_VALUE}>
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <p className="text-xs">
            <span className="font-semibold">Failure modes over time</span>{' '}
            <span className="text-muted-foreground">
              See how the rate of each failure mode moved in this range.
            </span>
          </p>
          <AccordionTrigger className={VIEW_GRAPHS_TRIGGER}>
            View graphs
          </AccordionTrigger>
        </div>
        <AccordionContent className="grid gap-3 border-t p-3 lg:grid-cols-2">
          {overview.trends.map((series) => (
            <FailureTrendChart key={series.metricId} series={series} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
