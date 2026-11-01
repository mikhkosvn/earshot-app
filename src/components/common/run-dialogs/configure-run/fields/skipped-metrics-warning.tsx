'use client';

import { InfoIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { useSelectedRunAgent } from '../../_hooks/use-selected-run-agent';
import { skippedMetricsText } from '../../_utils/run-dialog-text';
import { SkippedMetricItem } from './skipped-metric-item';

const SKIPPED_METRICS_ITEM_VALUE = 'skipped-metrics';

interface SkippedMetricsWarningProps {
  control: RunSettingsForm['control'];
  evaluatorIds: number[];
}

export function SkippedMetricsWarning({
  control,
  evaluatorIds,
}: SkippedMetricsWarningProps) {
  const agent = useSelectedRunAgent(control, evaluatorIds);
  if (!agent || agent.skippedMetrics.length === 0) return null;

  return (
    <Accordion className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <AccordionItem value={SKIPPED_METRICS_ITEM_VALUE}>
        <AccordionTrigger className="items-center gap-2 px-3 py-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-current">
          <InfoIcon className="size-4" />
          <span className="flex-1">
            {skippedMetricsText(agent.skippedMetrics.length)}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <ul className="divide-y border-t border-amber-200 px-3 dark:border-amber-900">
            {agent.skippedMetrics.map((metric) => (
              <SkippedMetricItem key={metric.id} metric={metric} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
