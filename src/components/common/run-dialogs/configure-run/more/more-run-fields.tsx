'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CALLS_PER_SECOND_MAX,
  CALLS_PER_SECOND_MIN,
  CONCURRENCY_LIMIT_MIN,
} from '@/server/runs/constants/run-limits';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { moreFieldsText } from '../../_utils/run-dialog-text';
import { RunNumberField } from '../fields/run-number-field';
import { RunAgentTestProfiles } from './run-agent-test-profiles';
import { RunPersonalitiesField } from './run-personalities-field';
import { RunRandomizeField } from './run-randomize-field';

type MoreRunFieldsProps = {
  control: RunSettingsForm['control'];
};

export function MoreRunFields({ control }: MoreRunFieldsProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen} className="border-t">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            className="group flex w-full items-center justify-between bg-muted/50 px-3 py-2.5 text-sm font-medium"
          />
        }
      >
        {moreFieldsText(isOpen)}
        <ChevronDownIcon className="size-4 transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4 p-3">
          <RunRandomizeField control={control} />
          <Suspense fallback={<Skeleton className="h-14 w-full" />}>
            <RunPersonalitiesField control={control} />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-14 w-full" />}>
            <RunAgentTestProfiles control={control} />
          </Suspense>
          <RunNumberField
            control={control}
            name="concurrencyLimit"
            label="Concurrent Runs Limit"
            description="Limit how many tests run at the same time."
            placeholder="Default value is Organization limit"
            min={CONCURRENCY_LIMIT_MIN}
          />
          <RunNumberField
            control={control}
            name="callsPerSecond"
            label="Calls Per Second"
            description="How many calls start each second, from 0.1 to 4 (e.g. 0.5 starts one call every 2 seconds). Leave empty for no limit."
            placeholder="No limit"
            min={CALLS_PER_SECOND_MIN}
            max={CALLS_PER_SECOND_MAX}
            step={0.1}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
