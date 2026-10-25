'use client';

import { SettingsCard } from '@/app/(app)/settings/_components/settings-card';

import { AddScheduleButton } from './form/add-schedule-button';
import { ScheduleList } from './schedule-list';

export function AutoOptimiseMetricsCard() {
  return (
    <SettingsCard aria-label="Auto-optimise Metrics">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold">Auto-optimise Metrics</h2>
          <p className="text-sm text-muted-foreground">
            Schedule the Metric Lab optimiser to run on a recurring cron.
            Newly-annotated test sets feed back into your metric prompts
            automatically.
          </p>
        </div>
        <AddScheduleButton />
      </div>
      <ScheduleList />
    </SettingsCard>
  );
}
