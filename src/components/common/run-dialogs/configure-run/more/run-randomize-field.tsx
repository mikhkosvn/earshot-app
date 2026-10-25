'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { FieldHelp } from '../../fields/field-help';

type RunRandomizeFieldProps = {
  control: RunSettingsForm['control'];
};

export function RunRandomizeField({ control }: RunRandomizeFieldProps) {
  return (
    <Controller
      control={control}
      name="randomize"
      render={({ field }) => (
        <Field orientation="horizontal" className="justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor="run-randomize">Randomize</FieldLabel>
            <FieldHelp>
              If true, we will make calls from different phone numbers.
            </FieldHelp>
          </div>
          <Switch
            id="run-randomize"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </Field>
      )}
    />
  );
}
