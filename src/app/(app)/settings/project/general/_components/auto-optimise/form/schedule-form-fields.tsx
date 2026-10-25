'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useCurrentProject } from '@/app/(app)/_hooks/use-current-project';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { OptimizerScheduleFields } from '@/server/metric-optimizer/types';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

import { ScheduleCronDescription } from './schedule-cron-description';

const NAME_ID = 'optimizer-schedule-name';
const CRON_ID = 'optimizer-schedule-cron';
const ACTIVE_ID = 'optimizer-schedule-active';

export function ScheduleFormFields() {
  const { control } = useFormContext<OptimizerScheduleFields>();
  const project = useCurrentProject();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor={NAME_ID}>Name</FieldLabel>
            <Input
              {...field}
              id={NAME_ID}
              placeholder="Weekly metric tuning"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        name="cronExpression"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor={CRON_ID}>Cron expression</FieldLabel>
            <Input
              {...field}
              id={CRON_ID}
              placeholder="0 9 * * 1"
              className="font-mono"
              aria-invalid={fieldState.invalid}
            />
            <ScheduleCronDescription />
            <FieldDescription className="text-xs">
              Minute, hour, day of month, month, day of week. The schedule uses
              the project time zone ({TimezoneLabel[project.timezone]}).
            </FieldDescription>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between gap-4">
            <label htmlFor={ACTIVE_ID} className="text-sm font-medium">
              Active
            </label>
            <Switch
              id={ACTIVE_ID}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
        )}
      />
    </div>
  );
}
