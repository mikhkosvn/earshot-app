'use client';

import { Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { AGENT_NUMBER_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';

const FIELD_ID = 'monitor-agent-number';

export function AgentNumberField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="agentNumber"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label="Phone Number"
          description={AGENT_NUMBER_HELP}
          error={fieldState.error}
        >
          <Input
            id={FIELD_ID}
            ref={field.ref}
            type="tel"
            value={field.value ?? ''}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(event.target.value)}
            placeholder="+1 555 010 0000"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
        </MonitorField>
      )}
    />
  );
}
