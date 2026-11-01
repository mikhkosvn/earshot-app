'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ConversationMetricItem } from '@/server/conversations/types';

import type { ConversationQueryArgs } from '../_service';
import { isExpectedOutcomeMetric } from '../_utils/metric-display';
import { CorrectMetricButton } from './correction/correct-metric-button';
import { MetricRowDetail } from './metric-row-detail';
import { MetricValue } from './value/metric-value';

const METRIC_ITEM_VALUE = 'metric';

interface MetricRowProps {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
  readOnly: boolean;
}

export function MetricRow({ metric, query, readOnly }: MetricRowProps) {
  const fullWidth = isExpectedOutcomeMetric(metric);

  return (
    <Accordion
      data-full={fullWidth}
      className="self-start rounded-md border bg-muted/20 data-[full=true]:md:col-span-2"
    >
      <AccordionItem value={METRIC_ITEM_VALUE}>
        <div className="flex min-h-10 items-center gap-2 px-3 py-1.5 [&>h3]:min-w-0 [&>h3]:flex-1">
          <AccordionTrigger className="min-w-0 items-center gap-1 py-0 font-normal hover:no-underline focus-visible:underline">
            <span className="truncate">{metric.name}</span>
          </AccordionTrigger>
          <MetricValue metric={metric} />
          <CorrectMetricButton
            metric={metric}
            query={query}
            readOnly={readOnly}
          />
        </div>
        <AccordionContent className="pb-0">
          <MetricRowDetail metric={metric} query={query} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
