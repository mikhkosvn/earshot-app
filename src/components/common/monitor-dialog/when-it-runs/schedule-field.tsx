'use client';

import { Controller } from 'react-hook-form';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { ScheduleMode, ScheduleModeLabel } from '../_constants/schedule-mode';
import { useMonitorAgents } from '../_hooks/use-monitor-agents';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { changeScheduleMode } from '../_utils/schedule/schedule-transitions';
import { MonitorField } from '../form/monitor-field';
import { RequiredMark } from '../form/required-mark';

const MODES = Object.values(ScheduleMode);

const isScheduleMode = (value: string | undefined): value is ScheduleMode =>
  MODES.some((mode) => mode === value);

export function ScheduleField() {
  const form = useMonitorFormContext();
  const agents = useMonitorAgents();

  return (
    <Controller
      name="scheduleMode"
      control={form.control}
      render={({ field, fieldState }) => (
        <MonitorField
          label={
            <>
              Schedule
              <RequiredMark />
            </>
          }
          error={fieldState.error}
        >
          <ToggleGroup
            aria-label="Schedule"
            variant="outline"
            size="sm"
            spacing={1}
            className="flex-wrap"
            value={[field.value]}
            onValueChange={(values) => {
              const [mode] = values;
              if (!isScheduleMode(mode)) return;
              changeScheduleMode(form, mode, agents);
            }}
          >
            {MODES.map((mode) => (
              <ToggleGroupItem
                key={mode}
                value={mode}
                className="bg-background px-2.5 font-normal data-pressed:bg-muted data-pressed:font-medium"
              >
                {ScheduleModeLabel[mode]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </MonitorField>
      )}
    />
  );
}
