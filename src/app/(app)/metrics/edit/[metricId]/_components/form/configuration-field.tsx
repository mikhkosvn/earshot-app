'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { configurationLabel } from '@/components/common/metric-form/_utils/configuration-label';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { EditMetricFormInput } from '../../_schemas/edit-metric-form-schema';
import { numberInputValue } from '../../_utils/number-input-value';

type ConfigurationFieldProps = {
  configKey: string;
};

export function ConfigurationField({ configKey }: ConfigurationFieldProps) {
  const { control } = useFormContext<EditMetricFormInput>();
  const fieldId = `metric-configuration-${configKey}`;

  return (
    <Controller
      name={`configuration.${configKey}`}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={fieldId}>
            {configurationLabel(configKey)}
          </FieldLabel>
          <Input
            id={fieldId}
            type="number"
            name={field.name}
            ref={field.ref}
            value={numberInputValue(field.value)}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(event.target.valueAsNumber)}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
