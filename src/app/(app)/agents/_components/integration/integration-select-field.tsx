'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { IntegrationField } from '@/server/agents/constants/provider-integrations';
import type { AgentConfigValues } from '@/server/agents/types';

import { integrationFieldName } from '../../_utils/integration-field-name';
import { IntegrationFieldLabel } from './integration-field-label';

interface IntegrationSelectFieldProps {
  field: IntegrationField;
}

export function IntegrationSelectField({ field }: IntegrationSelectFieldProps) {
  const { control } = useFormContext<AgentConfigValues>();
  const name = integrationFieldName(field);
  const id = `integration-${name}`;
  const options = field.options ?? [];
  const [firstOption] = options;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: input }) => (
        <Field className="gap-1.5 p-3">
          <IntegrationFieldLabel field={field} htmlFor={id} />
          <Select
            items={options}
            value={String(input.value || firstOption?.value || '')}
            onValueChange={(value) => {
              if (value === null) return;
              input.onChange(value);
            }}
          >
            <SelectTrigger id={id} className="w-full bg-background text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-xs"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
