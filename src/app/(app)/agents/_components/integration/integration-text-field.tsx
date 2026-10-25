'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { IntegrationField } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { integrationFieldName } from '../../_utils/integration-field-name';
import { IntegrationFieldLabel } from './integration-field-label';

type IntegrationTextFieldProps = {
  field: IntegrationField;
};

export function IntegrationTextField({ field }: IntegrationTextFieldProps) {
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
          <Input
            id={id}
            name={input.name}
            ref={input.ref}
            value={String(input.value ?? '')}
            placeholder={field.placeholder}
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className="bg-background text-xs md:text-xs"
            onBlur={input.onBlur}
            onChange={(event) => input.onChange(event.target.value)}
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
