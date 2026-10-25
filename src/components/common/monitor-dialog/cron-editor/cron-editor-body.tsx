import { CronBuilder } from './builder/cron-builder';
import { CronManualInput } from './cron-manual-input';

type CronEditorBodyProps = {
  isManual: boolean;
};

export function CronEditorBody({ isManual }: CronEditorBodyProps) {
  if (isManual) return <CronManualInput />;

  return <CronBuilder />;
}
