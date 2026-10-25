'use client';

import {
  NEXT_TRIGGER_DATE_COUNT,
  TRIGGER_DATES_HELP,
} from '../_constants/monitor-dialog-text';
import { useCronDates } from '../_hooks/use-cron-dates';
import { MonitorFieldText } from '../form/monitor-field-text';
import { MonitorFormSection } from '../form/monitor-form-section';

export function NextTriggerDatesSection() {
  const dates = useCronDates(NEXT_TRIGGER_DATE_COUNT);

  return (
    <MonitorFormSection title="Next trigger date">
      <MonitorFieldText>{TRIGGER_DATES_HELP}</MonitorFieldText>
      <ol className="flex flex-col gap-1 text-xs tabular-nums">
        {dates.map((date) => (
          <li key={date} className="rounded-md bg-muted/50 px-2 py-1">
            {date}
          </li>
        ))}
      </ol>
    </MonitorFormSection>
  );
}
