'use client';

import { Controller } from 'react-hook-form';

import { CONCURRENCY_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { NullableNumberInput } from './nullable-number-input';

const FIELD_ID = 'monitor-concurrency';

export function ConcurrencyField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="concurrencyLimit"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label="Concurrency limit"
          help={CONCURRENCY_HELP}
          error={fieldState.error}
        >
          <NullableNumberInput
            id={FIELD_ID}
            ref={field.ref}
            value={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            placeholder="No limit"
            invalid={fieldState.invalid}
            min={1}
            step={1}
          />
        </MonitorField>
      )}
    />
  );
}
