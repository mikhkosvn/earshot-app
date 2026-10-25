'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { AgentConfigValues } from '@/server/agents/types';

import { RequiredMark } from './required-mark';

const FIELD_ID = 'agent-description';

export function AgentDescriptionField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex-1 gap-1.5">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="gap-0 text-xs">
              Description of your AI Agent
              <RequiredMark required />
            </FieldLabel>
            <FieldDescription className="text-xs">
              Add your AI Agent&apos;s (Main Agent&apos;s) prompt or a detailed
              description. By clearly articulating your agent&apos;s
              description, you enable us to generate more accurate test
              scenarios.
            </FieldDescription>
          </div>
          <Textarea
            {...field}
            id={FIELD_ID}
            aria-invalid={fieldState.invalid}
            className="field-sizing-fixed h-96 flex-1 bg-background text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
