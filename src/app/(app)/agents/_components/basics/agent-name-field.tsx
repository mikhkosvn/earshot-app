'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AgentConfigValues } from '@/server/agents/types';

import { RequiredMark } from './required-mark';

const FIELD_ID = 'agent-name';

export function AgentNameField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="gap-0 text-xs">
            Agent name
            <RequiredMark required />
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className="bg-background text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
