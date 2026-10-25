'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { CallerNumberMode } from '@/generated/prisma/enums';

import { RANDOMIZE_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorFieldText } from '../form/monitor-field-text';

const FIELD_ID = 'monitor-randomize';

const toCallerNumberMode = (checked: boolean) => {
  if (checked) return CallerNumberMode.different_numbers;
  return CallerNumberMode.same_number;
};

export function RandomizeField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="callerNumberMode"
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-start">
          <FieldContent>
            <FieldLabel htmlFor={FIELD_ID} className="text-xs font-medium">
              Randomize
            </FieldLabel>
            <MonitorFieldText>{RANDOMIZE_HELP}</MonitorFieldText>
          </FieldContent>
          <Switch
            id={FIELD_ID}
            checked={field.value === CallerNumberMode.different_numbers}
            onCheckedChange={(checked) =>
              field.onChange(toCallerNumberMode(checked))
            }
          />
        </Field>
      )}
    />
  );
}
