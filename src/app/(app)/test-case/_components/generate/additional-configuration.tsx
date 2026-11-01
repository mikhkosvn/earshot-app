'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ManualConfigFields } from './manual-config-fields';

const ADDITIONAL_CONFIGURATION_ITEM_VALUE = 'additional-configuration';

const openItemsOf = (isOpen: boolean) => {
  if (isOpen) return [ADDITIONAL_CONFIGURATION_ITEM_VALUE];
  return [];
};

interface AdditionalConfigurationProps {
  isManual: boolean;
  onManualChange: (isManual: boolean) => void;
}

export function AdditionalConfiguration({
  isManual,
  onManualChange,
}: AdditionalConfigurationProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Accordion
      value={openItemsOf(isOpen)}
      onValueChange={(values) =>
        setOpen(values.includes(ADDITIONAL_CONFIGURATION_ITEM_VALUE))
      }
    >
      <AccordionItem value={ADDITIONAL_CONFIGURATION_ITEM_VALUE}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium">Additional Configuration</span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={isManual}
              className={cn(isManual && 'bg-muted')}
              onClick={() => {
                onManualChange(!isManual);
                setOpen(true);
              }}
            >
              Enter Manually
            </Button>
            <AccordionTrigger
              aria-label="Show additional configuration"
              className="size-7 items-center justify-center p-0 hover:bg-muted hover:no-underline **:data-[slot=accordion-trigger-icon]:ml-0 **:data-[slot=accordion-trigger-icon]:text-current"
            />
          </div>
        </div>
        <AccordionContent className="pt-3 pb-0 [&_p:not(:last-child)]:mb-0">
          <fieldset
            disabled={!isManual}
            className="flex flex-col gap-4 disabled:opacity-60"
          >
            <ManualConfigFields />
          </fieldset>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
