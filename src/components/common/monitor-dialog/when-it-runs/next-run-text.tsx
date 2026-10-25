'use client';

import { useCronDates } from '../_hooks/use-cron-dates';
import { MonitorFieldText } from '../form/monitor-field-text';

export function NextRunText() {
  const [nextRun] = useCronDates(1);
  if (!nextRun) return null;

  return <MonitorFieldText>Next run: {nextRun}</MonitorFieldText>;
}
