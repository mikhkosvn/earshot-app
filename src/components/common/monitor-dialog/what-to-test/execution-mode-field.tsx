'use client';

import { Controller } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ExecutionMode,
  ExecutionModeLabel,
} from '@/server/monitors/constants/execution-mode';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorField } from '../form/monitor-field';
import { RequiredMark } from '../form/required-mark';

const FIELD_ID = 'monitor-execution-mode';

const ITEMS = Object.values(ExecutionMode).map((mode) => ({
  value: mode,
  label: ExecutionModeLabel[mode],
}));

export function ExecutionModeField() {
  const { control } = useMonitorFormContext();

  return (
    <Controller
      name="executionMode"
      control={control}
      render={({ field, fieldState }) => (
        <MonitorField
          id={FIELD_ID}
          label={
            <>
              Execution mode
              <RequiredMark />
            </>
          }
          error={fieldState.error}
        >
          <Select<ExecutionMode>
            items={ITEMS}
            value={field.value}
            onValueChange={(mode) => {
              if (!mode) return;
              field.onChange(mode);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </MonitorField>
      )}
    />
  );
}
