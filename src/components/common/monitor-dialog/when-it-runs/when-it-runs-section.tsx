import { CronEditor } from '../cron-editor/cron-editor';
import { MonitorFormSection } from '../form/monitor-form-section';
import { NextRunText } from './next-run-text';
import { ScheduleField } from './schedule-field';
import { TimezoneField } from './timezone-field';

export function WhenItRunsSection() {
  return (
    <MonitorFormSection title="When it runs">
      <div className="flex flex-col gap-1.5">
        <ScheduleField />
        <NextRunText />
      </div>
      <CronEditor />
      <TimezoneField />
    </MonitorFormSection>
  );
}
