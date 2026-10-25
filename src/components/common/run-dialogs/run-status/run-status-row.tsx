import { Badge } from '@/components/ui/badge';
import type { RunBatchStatusRun } from '@/server/runs/types';

import { runOutcomeText } from '../_utils/run-status-text';
import { RunErrorText } from './run-error-text';

type RunStatusRowProps = {
  run: RunBatchStatusRun;
};

export function RunStatusRow({ run }: RunStatusRowProps) {
  return (
    <li className="flex items-start justify-between gap-3 py-2">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-sm font-medium">
          {run.evaluatorName} ({run.id})
        </span>
        <span className="text-xs text-muted-foreground">
          {run.personalityName ?? 'Default caller'}
        </span>
        <RunErrorText message={run.errorMessage} />
      </div>
      <Badge variant="outline">{runOutcomeText(run)}</Badge>
    </li>
  );
}
