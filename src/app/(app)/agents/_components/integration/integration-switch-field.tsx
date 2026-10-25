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

type SwitchName =
  'autoImportCalls' | 'autoSyncPrompt' | 'sendPostConversationMetadata';

interface IntegrationSwitchFieldProps {
  name: SwitchName;
  label: string;
  description?: string;
}

export function IntegrationSwitchField({
  name,
  label,
  description,
}: IntegrationSwitchFieldProps) {
  const { control } = useFormContext<AgentConfigValues>();
  if (!description) return null;
  const id = `integration-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-center gap-4 p-3">
          <FieldContent>
            <FieldLabel htmlFor={id} className="text-xs">
              {label}
            </FieldLabel>
            <FieldDescription className="text-xs">
              {description}
            </FieldDescription>
          </FieldContent>
          <Switch
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  );
}
