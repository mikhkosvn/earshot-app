'use client';

import { useWatch } from 'react-hook-form';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';

export function CronExpressionCode() {
  const { control } = useMonitorFormContext();
  const cronExpression = useWatch({ control, name: 'cronExpression' });

  return (
    <span className="flex items-center gap-2 text-sm">
      Cron Expression:
      <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-xs">
        {cronExpression}
      </code>
    </span>
  );
}
