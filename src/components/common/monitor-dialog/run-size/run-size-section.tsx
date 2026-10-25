import { MonitorFormSection } from '../form/monitor-form-section';
import { CallsPerSecondField } from './calls-per-second-field';
import { ConcurrencyField } from './concurrency-field';
import { NotificationNote } from './notification-note';
import { RepeatField } from './repeat-field';

export function RunSizeSection() {
  return (
    <MonitorFormSection title="Run size & limits">
      <RepeatField />
      <ConcurrencyField />
      <CallsPerSecondField />
      <NotificationNote />
    </MonitorFormSection>
  );
}
