'use client';

import { Controller } from 'react-hook-form';

import { SCENARIOS_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { RequiredMark } from '../form/required-mark';
import { ScenarioPicker } from '../scenario-picker/scenario-picker';

const FIELD_ID = 'monitor-scenarios';

export function ScenariosField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="evaluatorIds"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label={
            <>
              Scenarios
              <RequiredMark />
            </>
          }
          description={SCENARIOS_HELP}
          error={fieldState.error}
        >
          <ScenarioPicker
            id={FIELD_ID}
            value={field.value}
            onValueChange={field.onChange}
            invalid={fieldState.invalid}
          />
        </MonitorField>
      )}
    />
  );
}
