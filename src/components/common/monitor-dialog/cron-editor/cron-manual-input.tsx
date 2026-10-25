'use client';

import { useWatch } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { changeCronExpression } from '../_utils/schedule/schedule-transitions';
import { MonitorFieldText } from '../form/monitor-field-text';

export function CronManualInput() {
  const form = useMonitorFormContext();
  const cronExpression = useWatch({
    control: form.control,
    name: 'cronExpression',
  });

  return (
    <div className="flex flex-col gap-1.5">
      <Input
        value={cronExpression}
        onChange={(event) => changeCronExpression(form, event.target.value)}
        placeholder="Enter cron expression (e.g. */5 * * * *)"
        aria-label="Enter cron expression (e.g. */5 * * * *)"
        className="bg-background font-mono"
      />
      <MonitorFieldText>
        Format: minute hour day-of-month month day-of-week
      </MonitorFieldText>
    </div>
  );
}
