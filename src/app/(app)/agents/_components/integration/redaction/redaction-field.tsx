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

import { RedactionFieldOptions } from './redaction-field-options';

const FIELD_ID = 'integration-redaction';

export function RedactionField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <div className="flex flex-col gap-3 p-3">
      <Controller
        name="redactionEnabled"
        control={control}
        render={({ field }) => (
          <Field orientation="horizontal" className="items-center gap-4">
            <FieldContent>
              <FieldLabel htmlFor={FIELD_ID} className="text-xs">
                Redact Sensitive Data
              </FieldLabel>
              <FieldDescription className="text-xs">
                Strip selected details from transcripts and recordings.
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
      <RedactionFieldOptions />
    </div>
  );
}
