'use client';

import { Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { changeMonitorName } from '../_utils/form/monitor-name';
import { MonitorField } from '../form/monitor-field';
import { RequiredMark } from '../form/required-mark';
import { AutoNameBadge } from './auto-name-badge';
import { AutoNameHelp } from './auto-name-help';

const FIELD_ID = 'monitor-name';

export function MonitorNameField() {
  const form = useMonitorFormContext();

  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label={
            <>
              Monitor name
              <RequiredMark />
              <AutoNameBadge />
            </>
          }
          error={fieldState.error}
        >
          <Input
            id={FIELD_ID}
            ref={field.ref}
            value={field.value}
            onBlur={field.onBlur}
            onChange={(event) => changeMonitorName(form, event.target.value)}
            placeholder="Enter a name for your monitor"
            aria-label="Enter a name for your monitor"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
          <AutoNameHelp />
        </MonitorField>
      )}
    />
  );
}
