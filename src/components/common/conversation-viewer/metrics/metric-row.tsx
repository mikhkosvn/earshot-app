'use client';

import { ArrowRightIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { ConversationMetricItem } from '@/server/conversations/types';

import type { ConversationQueryArgs } from '../_service';
import { isExpectedOutcomeMetric } from '../_utils/metric-display';
import { CorrectMetricButton } from './correction/correct-metric-button';
import { MetricRowDetail } from './metric-row-detail';
import { MetricValue } from './value/metric-value';

interface MetricRowProps {
  metric: ConversationMetricItem;
  query: ConversationQueryArgs;
  readOnly: boolean;
}

export function MetricRow({ metric, query, readOnly }: MetricRowProps) {
  const fullWidth = isExpectedOutcomeMetric(metric);

  return (
    <Collapsible
      data-full={fullWidth}
      className="self-start rounded-md border bg-muted/20 data-[full=true]:md:col-span-2"
    >
      <div className="flex min-h-10 items-center gap-2 px-3 py-1.5">
        <CollapsibleTrigger className="group flex min-w-0 flex-1 items-center gap-1 text-left text-sm outline-none focus-visible:underline">
          <span className="truncate">{metric.name}</span>
          <ArrowRightIcon className="size-3.5 shrink-0 transition-transform group-data-panel-open:rotate-90" />
        </CollapsibleTrigger>
        <MetricValue metric={metric} />
        <CorrectMetricButton
          metric={metric}
          query={query}
          readOnly={readOnly}
        />
      </div>
      <CollapsibleContent>
        <MetricRowDetail metric={metric} query={query} />
      </CollapsibleContent>
    </Collapsible>
  );
}
