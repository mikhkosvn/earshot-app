import { CheckIcon, PhoneIcon } from 'lucide-react';

import { Field, FieldLabel } from '@/components/ui/field';

import { FieldHelp } from '../../fields/field-help';

export function RunConnectionTiles() {
  return (
    <Field className="gap-1.5">
      <div className="flex flex-col gap-0.5">
        <FieldLabel>Connections</FieldLabel>
        <FieldHelp>
          Pick a configured connection to run with. Greyed out connections are
          not set up on this agent.
        </FieldHelp>
      </div>
      <h4 className="text-xs font-semibold tracking-wide uppercase">Voice</h4>
      <div role="group" aria-label="Voice connections" className="flex gap-2">
        <div
          aria-label="Telephony"
          aria-current="true"
          className="relative flex h-20 w-24 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-foreground text-xs font-medium"
        >
          <PhoneIcon className="size-5" />
          Telephony
          <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-foreground text-background">
            <CheckIcon className="size-3" />
          </span>
        </div>
      </div>
    </Field>
  );
}
