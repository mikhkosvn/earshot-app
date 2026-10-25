'use client';

import { InfoIcon } from 'lucide-react';
import { useWatch } from 'react-hook-form';

import { useMonitorFormContext } from '../../_hooks/use-monitor-form-context';
import { describeCron } from '../../_utils/schedule/describe-cron';

export function CronDescription() {
  const { control } = useMonitorFormContext();
  const cronExpression = useWatch({ control, name: 'cronExpression' });
  const description = describeCron(cronExpression);
  if (!description) return null;

  return (
    <p className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
      <InfoIcon className="size-3.5 shrink-0" />
      {description}
    </p>
  );
}
