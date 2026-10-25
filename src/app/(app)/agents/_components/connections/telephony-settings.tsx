'use client';

import { ChevronDownIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { AgentConfigValues } from '@/server/agents/types';

import { InboundField } from './inbound-field';
import { PhoneNumberField } from './phone-number-field';

export function TelephonySettings() {
  const { control, setValue } = useFormContext<AgentConfigValues>();
  const enabled = useWatch({ control, name: 'telephonyEnabled' });
  const [open, setOpen] = useState(true);
  if (!enabled) return null;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="rounded-lg border bg-background"
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <h4 className="text-xs font-semibold">Telephony Settings</h4>
        <div className="flex items-center gap-1">
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
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Toggle Telephony Settings"
                className="data-panel-open:rotate-180"
              />
            }
          >
            <ChevronDownIcon />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="flex flex-col gap-4 p-3">
        <PhoneNumberField />
        <InboundField />
      </CollapsibleContent>
    </Collapsible>
  );
}
