'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import type { AgentConfigValues } from '@/server/agents/types';

const FIELD_ID = 'agent-inbound';

export function InboundField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <Controller
      name="inbound"
      control={control}
      render={({ field }) => (
        <Field
          orientation="horizontal"
          className="items-center gap-4 border-t pt-3"
        >
          <FieldContent>
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Inbound
            </FieldLabel>
            <FieldDescription className="text-xs">
              If true, our agent will call you on above number.
            </FieldDescription>
          </FieldContent>
          <Switch
            id={FIELD_ID}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  );
}
