'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import type { IntegrationField } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { integrationFieldName } from '../../../_utils/integration-field-name';
import { IntegrationFieldLabel } from '../integration-field-label';
import { PasswordInput } from './password-input';

interface IntegrationSecretInputProps {
  field: IntegrationField;
}

export function IntegrationSecretInput({ field }: IntegrationSecretInputProps) {
  const { control } = useFormContext<AgentConfigValues>();
  const name = integrationFieldName(field);
  const id = `integration-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: input, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5 p-3">
          <IntegrationFieldLabel field={field} htmlFor={id} />
          <PasswordInput
            id={id}
            name={input.name}
            value={String(input.value ?? '')}
            onBlur={input.onBlur}
            onChange={(value) => input.onChange(value)}
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
