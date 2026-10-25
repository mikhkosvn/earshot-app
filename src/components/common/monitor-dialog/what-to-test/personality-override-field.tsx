'use client';

import { Controller } from 'react-hook-form';

import { PERSONALITY_OVERRIDE_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { PersonalityOverrideSelect } from './personality-override-select';

const FIELD_ID = 'monitor-personalities';

export function PersonalityOverrideField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="personalityIds"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label={
            <>
              Personality override
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </>
          }
          help={PERSONALITY_OVERRIDE_HELP}
          error={fieldState.error}
        >
          <PersonalityOverrideSelect
            id={FIELD_ID}
            value={field.value}
            onValueChange={field.onChange}
          />
        </MonitorField>
      )}
    />
  );
}
