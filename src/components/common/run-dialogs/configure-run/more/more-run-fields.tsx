'use client';

import { Suspense, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

const MORE_FIELDS_ITEM_VALUE = 'more-fields';

const openItemsOf = (isOpen: boolean) => {
  if (isOpen) return [MORE_FIELDS_ITEM_VALUE];
  return [];
};

interface MoreRunFieldsProps {
  control: RunSettingsForm['control'];
}

export function MoreRunFields({ control }: MoreRunFieldsProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Accordion
      value={openItemsOf(isOpen)}
      onValueChange={(values) =>
        setOpen(values.includes(MORE_FIELDS_ITEM_VALUE))
      }
      className="border-t"
    >
      <AccordionItem value={MORE_FIELDS_ITEM_VALUE}>
        <AccordionTrigger className="items-center rounded-none bg-muted/50 px-3 py-2.5 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-current">
          {moreFieldsText(isOpen)}
        </AccordionTrigger>
        <AccordionContent className="pb-0 [&_p:not(:last-child)]:mb-0">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
