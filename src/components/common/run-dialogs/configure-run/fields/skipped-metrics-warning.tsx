'use client';

import { ChevronDownIcon, InfoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { useSelectedRunAgent } from '../../_hooks/use-selected-run-agent';
import { skippedMetricsText } from '../../_utils/run-dialog-text';
import { SkippedMetricItem } from './skipped-metric-item';

type SkippedMetricsWarningProps = {
  control: RunSettingsForm['control'];
  evaluatorIds: number[];
};

export function SkippedMetricsWarning({
  control,
  evaluatorIds,
}: SkippedMetricsWarningProps) {
  const agent = useSelectedRunAgent(control, evaluatorIds);
  if (!agent || agent.skippedMetrics.length === 0) return null;

  return (
    <Collapsible className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            className="group flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium"
          />
        }
      >
        <InfoIcon className="size-4" />
        <span className="flex-1">
          {skippedMetricsText(agent.skippedMetrics.length)}
        </span>
        <ChevronDownIcon className="size-4 transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="divide-y border-t border-amber-200 px-3 dark:border-amber-900">
          {agent.skippedMetrics.map((metric) => (
            <SkippedMetricItem key={metric.id} metric={metric} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
