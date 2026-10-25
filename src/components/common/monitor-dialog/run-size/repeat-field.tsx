'use client';

import { Controller } from 'react-hook-form';

import {
  FREQUENCY_MAX,
  FREQUENCY_MIN,
} from '@/server/monitors/constants/monitor-limits';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { CallsPerRunHelp } from './calls-per-run-help';
import { NullableNumberInput } from './nullable-number-input';

const FIELD_ID = 'monitor-frequency';

export function RepeatField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="frequency"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label="Repeat each scenario"
          error={fieldState.error}
        >
          <NullableNumberInput
            id={FIELD_ID}
            ref={field.ref}
            value={field.value}
            onValueChange={(value) => field.onChange(value ?? Number.NaN)}
            onBlur={field.onBlur}
            invalid={fieldState.invalid}
            min={FREQUENCY_MIN}
            max={FREQUENCY_MAX}
            step={1}
          />
          <CallsPerRunHelp />
        </MonitorField>
      )}
    />
  );
}
