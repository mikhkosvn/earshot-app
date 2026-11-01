'use client';

import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { AgentConfigValues } from '@/server/agents/types';

import { InboundField } from './inbound-field';
import { PhoneNumberField } from './phone-number-field';

const TELEPHONY_ITEM_VALUE = 'telephony';

const openItemsOf = (open: boolean) => {
  if (open) return [TELEPHONY_ITEM_VALUE];
  return [];
};

export function TelephonySettings() {
  const { control, setValue } = useFormContext<AgentConfigValues>();
  const enabled = useWatch({ control, name: 'telephonyEnabled' });
  const [open, setOpen] = useState(true);
  if (!enabled) return null;

  return (
    <Accordion
      value={openItemsOf(open)}
      onValueChange={(values) => setOpen(values.includes(TELEPHONY_ITEM_VALUE))}
      className="rounded-lg border bg-background"
    >
      <AccordionItem value={TELEPHONY_ITEM_VALUE}>
        <div className="grid grid-cols-[1fr_auto] items-center gap-1 rounded-t-lg bg-muted/50 px-3 py-2">
          <AccordionTrigger className="items-center py-0 text-xs font-semibold hover:no-underline">
            Telephony Settings
          </AccordionTrigger>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Remove Telephony"
            onClick={() =>
              setValue('telephonyEnabled', false, { shouldDirty: true })
            }
          >
            <XIcon />
          </Button>
        </div>
        <AccordionContent className="flex flex-col gap-4 border-t p-3 [&_p:not(:last-child)]:mb-0">
          <PhoneNumberField />
          <InboundField />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
