'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import { Timezone } from '@/generated/prisma/enums';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';

const FIELD_ID = 'monitor-timezone';

const TIMEZONES = Object.values(Timezone);

export function TimezoneField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="timezone"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField id={FIELD_ID} label="Timezone" error={fieldState.error}>
          <Combobox<Timezone>
            items={TIMEZONES}
            value={field.value}
            itemToStringLabel={(timezone) => TimezoneLabel[timezone]}
            onValueChange={(timezone) => {
              if (!timezone) return;
              field.onChange(timezone);
            }}
          >
            <ComboboxTrigger
              id={FIELD_ID}
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between bg-background font-normal"
                />
              }
            >
              <ComboboxValue />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput
                placeholder="Search timezones..."
                showTrigger={false}
              />
              <ComboboxEmpty>No timezone found.</ComboboxEmpty>
              <ComboboxList>
                {(timezone: Timezone) => (
                  <ComboboxItem key={timezone} value={timezone}>
                    {TimezoneLabel[timezone]}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </MonitorField>
      )}
    />
  );
}
