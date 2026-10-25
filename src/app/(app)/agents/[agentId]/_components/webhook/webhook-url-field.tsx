'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AgentSettingsValues } from '@/server/agents/types';

const FIELD_ID = 'agent-webhook-url';

export function WebhookUrlField() {
  const { control } = useFormContext<AgentSettingsValues>();

  return (
    <Controller
      name="webhookUrl"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Webhook URL
            </FieldLabel>
            <FieldDescription className="text-xs">
              Overrides the project webhook URL for events from this agent
            </FieldDescription>
          </div>
          <Input
            {...field}
            id={FIELD_ID}
            type="url"
            placeholder="https://yourserver.com/agent-hook"
            aria-invalid={fieldState.invalid}
            className="bg-background text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
