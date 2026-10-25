'use client';

import { Controller } from 'react-hook-form';

import {
  CALLS_PER_SECOND_MAX,
  CALLS_PER_SECOND_MIN,
} from '@/server/monitors/constants/monitor-limits';

import { CALLS_PER_SECOND_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { NullableNumberInput } from './nullable-number-input';

const FIELD_ID = 'monitor-calls-per-second';

export function CallsPerSecondField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="callsPerSecond"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label="Calls per second"
          help={CALLS_PER_SECOND_HELP}
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
            min={CALLS_PER_SECOND_MIN}
            max={CALLS_PER_SECOND_MAX}
            step={0.1}
          />
        </MonitorField>
      )}
    />
  );
}
