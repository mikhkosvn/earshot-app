import { CronBuilder } from './builder/cron-builder';
import { CronManualInput } from './cron-manual-input';

interface CronEditorBodyProps {
  isManual: boolean;
}

export function CronEditorBody({ isManual }: CronEditorBodyProps) {
  if (isManual) return <CronManualInput />;

  return <CronBuilder />;
}
